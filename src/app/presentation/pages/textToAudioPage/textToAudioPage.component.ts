import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { inject } from '@angular/core';
import { OpenAiService } from 'app/presentation/services/openia.service';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxSelectComponent
],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent { 
  public messages = signal<Message[]>([])
    public isLoading = signal(false)
    public openAiService = inject(OpenAiService);
  
    public voices = signal([
      { id: "nova", text: "Nova" },
      { id: "alloy", text: "Alloy" },
      { id: "echo", text: "Echo" },
      { id: "fable", text: "Fable" },
      { id: "onyx", text: "Onyx" },
      { id: "shimmer", text: "Shimmer" },
    ]);

    handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
      const message = `${ selectedOption} - ${ prompt }`;
      this.messages.update(prev => [...prev, {text: message, isGpt: false}])
      this.isLoading.set(true);
      this.openAiService.textoToAudio(prompt, selectedOption)
        .subscribe( ({message, audioUrl}) => {
          this.isLoading.set(false);
          this.messages.update( prev => [
            ...prev,
            {
              isGpt: true,
              text: message,
              audioUrl: audioUrl
            }
          ])
        })
    }
}
