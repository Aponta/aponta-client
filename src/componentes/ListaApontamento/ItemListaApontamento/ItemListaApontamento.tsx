/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import "./ItemListaApontamento.css";
import dayjs from 'dayjs';
import { connect } from "react-redux";
import * as apontamentoUtils from "../../../utils/Apontamento";
import * as apontamentoActions from "../../../stores/actions/ApontamentoAction"; 
import ModalConfirmarApontamento from "../../ModalConfirmarApontamento/ModalConfirmarApontamento";
import ModalApontamento from "../../ModalApontamento/ModalApontamento";
import { showToast } from "../../ToastControl/ToastControl";
import Dropdown from "../../Dropdown/Dropdown";
import { Tarefa } from '../../../types/Tipos';
import ModalConfirm from '../../ModalConfirm';

function ItemListaApontamento(props : any) : JSX.Element {

    const [showModalConfirmarApontamento, setShowModalConfirmarApontamento] = useState(false)
    const [showModalApontamento, setShowModalApontamento] = useState(false)
    const [showModalConfirmarExclusão, setShowModalConfirmarExclusão] = useState(false)
    const [dados, setDados] = useState({
        ID: 0,
        DATA_HORA_INICIAL: "",
        DATA_HORA_FINAL: "",
        DESCRICAO: "",
        LOGIN:{},
        TAREFA:{
            ID_TAREFA: 0,
            ID_TAREFA_CHAMADO: 0,
            CLIENTE_TAREFA: "",
        }
    })

    const formatoData = "DD/MM/YYYY HH:mm"

    useEffect(() => {

        const dataInicial = dayjs(props.DATA_HORA_INICIAL).format(formatoData);
        const dataFinal = dayjs(props.DATA_HORA_FINAL).format(formatoData);

        setDados({
            ID: props.ID,
            DATA_HORA_INICIAL: dataInicial,
            DATA_HORA_FINAL: dataFinal,
            DESCRICAO: props.DESCRICAO,
            LOGIN: props.USUARIO,
            TAREFA: props.TAREFA
        })
    }, [props.DATA_HORA_FINAL, props.DATA_HORA_INICIAL, props.DESCRICAO, props.ID, props.TAREFA, props.USUARIO])

    const criarApontamento = (descricao: string) => {
        
        const dadosApontamento = {
            ID_TAREFA: dados.ID,
            ID_TAREFA_CHAMADO: dados.TAREFA.ID_TAREFA_CHAMADO,
            CLIENTE_TAREFA: dados.TAREFA.CLIENTE_TAREFA,
            DESCRICAO: descricao
        }

        apontamentoUtils.criarApontamento(dadosApontamento).then((response)=>{
            if(response.status == 200){
                response.json().then((data)=>{
                    if(!data.message){
                        apontamentoUtils.buscaUltimoApontamento().then((response) =>{
                            if(response.status == 200){
                                response.json().then((data)=>{
                                    if(!data.message){
                                        setShowModalConfirmarApontamento(false);
                                        showToast("sucesso", "Apontando na tarefa " + dados.TAREFA.ID_TAREFA_CHAMADO)
                                        props.setApontamentoAtual(data.apontamento);
                                    }else{
                                        showToast("erro", data.message);
                                    }
                                })
                            }
                        })
                    }else{
                        showToast("erro", data.message);
                    }
                })
            }
        })
    }

    const editarTarefaApontamento = (tarefa : Tarefa) => {
        apontamentoUtils.editarTarefaApontamento(dados.ID, tarefa).then((response)=>{
            if(response.ok){
                showToast("sucesso", "Apontamento editado com sucesso");
            }else{
                showToast("erro", "Erro ao editar apontamento");
            }
        })
    }

    const excluirApontamento = (idApontamento: number) => {
        apontamentoUtils.excluirApontamento(idApontamento).then((data) => {
            if(data.success){
                props.getApontamentoPaginado(props.quantidadePagina, props.paginaAtual)
                showToast('sucesso', data.message);
            }
            else
                showToast('erro', data.message);
        })
    }

    const montarObj = () =>{
        return {
            ID_TAREFA_CHAMADO: dados.TAREFA.ID_TAREFA_CHAMADO,
            CLIENTE_TAREFA: dados.TAREFA.CLIENTE_TAREFA,
            DESCRICAO: dados.DESCRICAO
        }
    }

    return (
        <div className="container-item-lista-apontamento">
            <div className="item-lista-apontamento-titulo ">
                <h4 className="item-apontamento-titulo cortar-texto-1 alinhamento-texto-item-apontamento">
                    {dados.TAREFA.ID_TAREFA_CHAMADO + " - " + dados.TAREFA.CLIENTE_TAREFA}
                </h4>
            </div>
            <div className="item-lista-apontamento-hora">
                <div className="row alinhamento-texto-item-apontamento">
                    <div className="col-auto cortar-texto-1 w-100">
                        {dados.DATA_HORA_INICIAL}
                        &nbsp;
                        Até
                        &nbsp;
                        {dados.DATA_HORA_FINAL}
                    </div>
                </div>
            </div>
            <div className="item-lista-apontamento-acao">
            <Dropdown titulo="Executar" cor={"dropdown-tertiary"}>
                <>
                    <button 
                        type="button"
                        className="btn-aponta btn-secondary w-100"
                        onClick={() => setShowModalConfirmarApontamento(true)}
                    >
                        Apontar
                    </button>
                    <button 
                        type="button"
                        className="btn-aponta btn-tertiary w-100"
                        onClick={() => setShowModalApontamento(true)}
                    >
                        Editar
                    </button>
                    <button 
                        type="button"
                        className="btn-aponta btn-secondary w-100"
                        onClick={() => setShowModalConfirmarExclusão(true)}
                    >
                        Exluir
                    </button>       
                </>
            </Dropdown>
                
            </div>
            <ModalApontamento
            show={showModalApontamento}
            apontamento={dados}
            permiteEditar={false}
            onHide={() => setShowModalApontamento(false)}
            editarTarefaApontamento={(tarefa : Tarefa)=>editarTarefaApontamento(tarefa)}
            />
            <ModalConfirmarApontamento 
            show={showModalConfirmarApontamento}
            onHide={() => setShowModalConfirmarApontamento(false)}
            apontamento={montarObj()}
            criarApontamento={(descricao : string) => criarApontamento(descricao)}
            tituloModalConfirm={
              "Deseja confirmar o apontamento ?"
              }
            />
            <ModalConfirm 
            show={showModalConfirmarExclusão}
            onHide={() => setShowModalConfirmarExclusão(false)}
            acaoConfirmada={() => excluirApontamento(dados.ID)}
            tituloModalConfirm={"Confirmar exclusão?"}
            />
        </div>
    )
}

const mapStateToProps = (state : any) => ({
    quantidadePagina: state.ApontamentoReducer.quantidadePagina,
    paginaAtual: state.ApontamentoReducer.paginaAtual,
});

const mapDispatchToProps = (dispatch : any) => ({
    setApontamentoAtual : (apontamentoAtual : any) => 
        dispatch(apontamentoActions.setApontamentoAtual(apontamentoAtual)),
    getApontamentoPaginado : (quantidadePagina : number, paginaAtual : number) => 
        dispatch(apontamentoActions.getApontamentoPaginado(quantidadePagina, paginaAtual)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemListaApontamento);
