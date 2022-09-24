import * as backEndUtils from "./BackEnd";

export const listarTempoTotalTarefa = (quantidadePagina: number, paginaAtual: number) => {
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

    const usuarioLogado = localStorage.getItem("usuarioLogado")
    const caminhoRequisicao = "/tempototaltarefa/termo" 

    const requisicao = {
        idUsuario: atob(usuarioLogado || ""),
        termoFiltro,
        quantidadePagina,
        paginaAtual
    }
    
    return backEndUtils.chamarBackEnd("POST", caminhoRequisicao, requisicao).then((response) =>{
        return response;
    })
}