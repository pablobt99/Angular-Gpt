import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { inject } from '@angular/core';
import { OpenAiService } from 'app/presentation/services/openia.service';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { AudioToTextResponse } from '@interfaces/audio-text.response';
@Component({
  selector: 'app-audio-to-text-page',
  imports: [
      CommonModule,
      ChatMessageComponent,
      MyMessageComponent,
      TypingLoaderComponent,
      TextMessageBoxComponent,
      TextMessageBoxFileComponent
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent { 

  public messages = signal<Message[]>([])
  public isLoading = signal(false)
  public openAiService = inject(OpenAiService);


  handleMessageWithFile({ prompt, file}: TextMessageEvent){
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, { isGpt: false, text: text}]);

    this.openAiService.audioToText(file, text)
    .subscribe( resp =>  this.handleResponse(resp))
  }

  handleResponse(resp: AudioToTextResponse | null){
    this.isLoading.set(false);
    if( !resp) return;

    const text  = `## Transcripcion:
__Duracion:__ ${Math.round(resp.duration)} segundos
    
## El texto es: 
    
    ${
      resp.text
    }`;

    this.messages.update(prev => [...prev, { isGpt: true, text: text}]);

    for (const segment of resp.segments){
      const segmentMessage = `
__De ${Math.round(segment.start)} a ${ Math.round(segment.end)} segudos.__
${ segment.text}
      `;

    this.messages.update(prev => [...prev, { isGpt: true, text: segmentMessage}]);  
    }

  }

}
