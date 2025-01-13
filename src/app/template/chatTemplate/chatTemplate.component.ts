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
@Component({
  selector: 'app-chat-template',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent { 

  public messages = signal<Message[]>([])
  public isLoading = signal(false)
  public openAiService = inject(OpenAiService);
  handleMessage(prompt: string){
    console.log({prompt})
  }
  
  handleMessageWithFile( {prompt, file}: TextMessageEvent){
    console.log({prompt, file});

  }

  handleMessageWithSelect(event: TextMessageBoxEvent ){
    console.log(event);
  }
}
