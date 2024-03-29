import * as tipos from "../types/Tipos";
import * as backEndUtils from "./BackEnd";

export const criarApontamento = async (dadosApontamento : any) : Promise<Response> => {
    const usuarioLogado = localStorage.getItem("usuarioLogado")

    const requisicao = {
        ID: 0,
        DATA_HORA_INICIAL: new Date(),
        DATA_HORA_FINAL: new Date(),
        DESCRICAO: dadosApontamento.DESCRICAO,
        USUARIO: {
            ID_USUARIO: parseInt(atob(usuarioLogado || "")),
            USUARIO: "",
            SENHA: ""
        },
        TAREFA: {
            ID_TAREFA: 0,
            ID_TAREFA_CHAMADO: parseInt(dadosApontamento.ID_TAREFA_CHAMADO),
            CLIENTE_TAREFA: dadosApontamento.CLIENTE_TAREFA,
            LOGIN: {
                ID_USUARIO: parseInt(atob(usuarioLogado || ""))
            }
        }
    }

    return backEndUtils.chamarBackEnd("POST", "/apontamento", requisicao).then((response)=>{
        return response;
    })
}

export const buscaUltimoApontamento = async () : Promise<Response> =>  {
    
    const usuarioLogado = localStorage.getItem("usuarioLogado")
    const caminhoRequisicao = "/apontamento/" + atob(usuarioLogado || "");
    
    return backEndUtils.chamarBackEnd("GET", caminhoRequisicao, "").then((response) =>{
        return response;
    })
}

export const encerrarApontamento = async (idApontamento: number) : Promise<Response>  =>{
    
    const caminhoRequisicao = "/apontamento/" + idApontamento;

    return backEndUtils.chamarBackEnd("PUT", caminhoRequisicao, "").then((response)=>{
        return response;
    })
}

export const editarTarefaApontamento = async (idApontamento: number, tarefa : tipos.Tarefa) : Promise<Response>  =>{
        
    const requisicao = {
        ID_TAREFA: tarefa.ID_TAREFA,
        ID_TAREFA_CHAMADO: tarefa.ID_TAREFA_CHAMADO,
        CLIENTE_TAREFA : tarefa.CLIENTE_TAREFA
    }

    const caminhoRequisicao = "/apontamento/" + idApontamento + "/" + tarefa.ID_TAREFA_CHAMADO;

    return backEndUtils.chamarBackEnd("PUT", caminhoRequisicao, requisicao).then((response)=>{
        return response;
    })
}

export const excluirApontamento = async (idApontamento: number) : Promise<any>  =>{

    const caminhoRequisicao = "/apontamento/" + idApontamento;

    return backEndUtils.chamarBackEnd("DELETE", caminhoRequisicao, "")
        .then((response)=> response.json().then((data) => data))
}

export const buscarApontamentosPorTarefa = async (idTarefa: number, quantidadePagina: number, paginaAtual: number) : Promise<any>  =>{

    const caminhoRequisicao = "/apontamento/tarefa";

    const requisicao = {
        idTarefa,
        quantidadePagina,
        paginaAtual
    }

    return backEndUtils.chamarBackEnd("POST", caminhoRequisicao, requisicao)
        .then((response)=> response.json().then((data) => data))
}