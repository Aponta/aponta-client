import * as backEndUtils from "./BackEnd";

export const listarTarefas = async (idTarefa : string) : Promise<Response> => {
    
    const caminhoRequisicao = "/tarefa/"+idTarefa

    return backEndUtils.chamarBackEnd("GET", caminhoRequisicao, "").then((response)=>{
        return response;
    })
}