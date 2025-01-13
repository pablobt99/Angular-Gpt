import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons';
import { from } from 'rxjs';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream';
import { translateTextUseCase } from '@use-cases/translate/translate-text.use-case';
import { textoToAudioUseCase } from '@use-cases/audios/text-to-audio.use-case';
import { audioToTextUseCase } from '@use-cases/audios/audio-to-text.use-case';
@Injectable({providedIn: 'root'})

export class OpenAiService {

    checkOrthography(prompt: string){
        return from(orthographyUseCase(prompt));
    }

    prosConsDiscusser( prompt: string){
        return from( prosConsUseCase(prompt));
    }

    prosConsStreamDiscusser( prompt: string, abortSignal: AbortSignal){
        return prosConsStreamUseCase(prompt, abortSignal);
    }

    translateText(prompt: string, lang:string){
        return from( translateTextUseCase(prompt, lang))
    }
    
    textoToAudio(prompt: string, voice:string){
        return from( textoToAudioUseCase(prompt, voice))
    }

    audioToText(file: File, prompt?:string){
        return from( audioToTextUseCase(file, prompt))
    }

}