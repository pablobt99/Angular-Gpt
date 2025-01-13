import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component'
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component'
import { TypingLoaderComponent} from '@components/typingLoader/typingLoader.component'
import { TextMessageBoxComponent} from '@components/text-boxes/textMessageBox/textMessageBox.component'
import { signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { inject } from '@angular/core';
import { OpenAiService } from 'app/presentation/services/openia.service';
@Component({
  selector: 'app-pros-cons-page',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent { 

  public messages = signal<Message[]>([])
  public isLoading = signal(false)
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string){
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.prosConsDiscusser(prompt)
    .subscribe(resp => {
      this.isLoading.set(false);
      this.messages.update(prev =>[
        ...prev,
        {
          isGpt: true,
          text: resp.content
        }
      ])
    })
  }

}
