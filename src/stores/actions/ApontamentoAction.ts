/* eslint-disable eqeqeq */
import * as backEndUtils from "../../utils/BackEnd";

export function setApontamentoAtual(apontamentoAtual : any) {
    return {
      type: "SET_APONTAMENTO_ATUAL",
      apontamentoAtual,
    };
  }

  export function setPaginaAtual(paginaAtual : number) {
    return {
      type: "SET_PAGINA_ATUAL",
      paginaAtual,
    };
  }

  export function getApontamentoPaginado (quantidadePagina: number, paginaAtual : number){

    const usuarioLogado = localStorage.getItem("usuarioLogado")

    const requisicao = {
        id : parseInt(atob(usuarioLogado || "")),
        quantidadePagina : quantidadePagina,
        paginaAtual: paginaAtual
    }
    return (dispatch : any) => {
      backEndUtils.chamarBackEnd("POST", "/apontamento/paginado", requisicao).then((response) =>{
          if(response.status == 200){
              response.json().then((data)=>{
                dispatch({
                  type: "GET_APONTAMENTO_PAGINADO",
                  apontamentoPaginado: data,
                });
              })
          }
      })
    }
}