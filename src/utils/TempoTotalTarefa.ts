import * as backEndUtils from "./BackEnd";

export const listarTempoTotalTarefaPorUsuario = (quantidadePagina: number, paginaAtual: number) => {
    const usuarioLogado = localStorage.getItem("usuarioLogado")
    const caminhoRequisicao = "/tempototaltarefa/usuario" 

    const requisicao = {
        idUsuario: atob(usuarioLogado || ""),
        quantidadePagina,
        paginaAtual
    }
    
    return backEndUtils.chamarBackEnd("POST", caminhoRequisicao, requisicao).then((response) =>{
        return response;
    })
}

export const listarTempoTotalTarefaPorTarefa = (idTarefa: number, quantidadePagina: number, paginaAtual: number) => {

    const caminhoRequisicao = "/tempototaltarefa/usuario" 

    const requisicao = {
        idTarefa,
        quantidadePagina,
        paginaAtual
    }
    
    return backEndUtils.chamarBackEnd("POST", caminhoRequisicao, requisicao).then((response) =>{
        return response;
    })
}