export const linkBackEnd = "https://localhost:5001/aponta";

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
            }).then((resposta) =>  {
            return resposta
        })
    }else{
        return await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenAutenticacao
                },
            }).then((resposta) =>  {
            return resposta
        })
    }
  };