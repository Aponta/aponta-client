import * as backEndUtils from "./BackEnd";

export const listarTarefas = async (idTarefa : string) : Promise<Response> => {

    const usuarioLogado = localStorage.getItem("usuarioLogado")
    
    const caminhoRequisicao = "/tarefa/"+idTarefa+"/"+parseInt(atob(usuarioLogado || ""))

    return backEndUtils.chamarBackEnd("GET", caminhoRequisicao, "").then((response)=>{
        return response;
    })
}