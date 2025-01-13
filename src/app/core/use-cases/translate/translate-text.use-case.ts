import { OrthographyResponse } from "@interfaces/orthography.response.interface";
import { TranslateResponse } from "@interfaces/translate.response.interface";
import { environment } from "environments/environment.development"

export const translateTextUseCase = async (prompt: string, lang: string) => {
    try{
        const resp = await fetch(`${environment.backendApi}/translate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({prompt, lang})
            }
        );
        if( !resp.ok) throw new Error('No se pudo realizar la traduccion');

        const {message} = await resp.json() as TranslateResponse;

        return {
            ok: true,
            message: message

        }
    }catch (error){
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo realizar la traduccion'
        }
    }
}