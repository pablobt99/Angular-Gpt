import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component'
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component'
import { TypingLoaderComponent} from '@components/typingLoader/typingLoader.component'
import { TextMessageBoxComponent} from '@components/text-boxes/textMessageBox/textMessageBox.component'
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component'
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openia.service';
import { GptMessageOrthographyComponent } from '@components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component';
@Component({
  selector: 'app-orthography-page',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent { 

  public messages = signal<Message[]>([])
  public isLoading = signal(false)
  public openAiService = inject(OpenAiService);
  handleMessageWithFile( {prompt, file}: TextMessageEvent){
    console.log({prompt, file});

  }

  handleMessageWithSelect(event: TextMessageBoxEvent ){
    console.log(event);
  }

  handleMessage(prompt: string){
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography(prompt)
    .subscribe( resp => {
      this.isLoading.set(false);
      this.messages.update(prev =>[ 
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp,
        }
      ])
    })

  }

}
