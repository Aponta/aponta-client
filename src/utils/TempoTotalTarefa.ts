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

export const listarTempoTotalTarefaPorTermo = (termoFiltro: string, quantidadePagina: number, paginaAtual: number) => {

    const caminhoRequisicao = "/tempototaltarefa/termo" 

    const requisicao = {
        termoFiltro,
        quantidadePagina,
        paginaAtual
    }
    
    return backEndUtils.chamarBackEnd("POST", caminhoRequisicao, requisicao).then((response) =>{
        return response;
    })
}