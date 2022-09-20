import { showToast } from "../componentes/ToastControl/ToastControl";
import * as loginUtils from "./Login";

export const linkBackEnd = process.env.REACT_APP_ENVIRONMENT ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;

export const chamarBackEnd = async (
    metodo : string, 
    caminho : string, 
    corpo : any) : Promise<Response> => {
 
    let tokenAutenticacao = localStorage.getItem("tokenAutenticacao")

    if(tokenAutenticacao){
        tokenAutenticacao = atob(tokenAutenticacao)
    }

    if(corpo){
        return await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenAutenticacao
                },
            body: JSON.stringify(corpo),
            })
            .then(resposta =>  resolverResposta(resposta))
            .catch(error => resolverResposta(error));
    }else{
        return await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenAutenticacao
                },
            })
            .then(resposta => resolverResposta(resposta))
            .catch(error => resolverResposta(error))
        }
  };

  const resolverResposta = (resposta: Response) : Response => {
    if(resposta.status == 401){
        loginUtils.deslogar();
        showToast("sucesso", "Sua sessão expirou");
    }

    return resposta
  }