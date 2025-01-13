import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { inject } from '@angular/core';
import { OpenAiService } from 'app/presentation/services/openia.service';
@Component({
  selector: 'app-translate-page',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxSelectComponent
],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  public messages = signal<Message[]>([])
  public isLoading = signal(false)
  public openAiService = inject(OpenAiService);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);
  
  handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
    const message = `Traduce a ${ selectedOption}: ${prompt}`;
    this.isLoading.set(true);
    this.messages.update(prev => [...prev, {text: message, isGpt: false}]);
    this.openAiService.translateText(prompt, selectedOption)
    .subscribe( ({message}) => {
      this.isLoading.set(false);
      this.messages.update(prev => [...prev, {text: message, isGpt: true}]);

    }

    )
  }
}
