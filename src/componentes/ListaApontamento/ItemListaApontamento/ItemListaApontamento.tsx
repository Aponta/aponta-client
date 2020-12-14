/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import "./ItemListaApontamento.css"
import dayjs from 'dayjs';
import { connect } from "react-redux";
import * as apontamentoUtils from "../../../utils/Apontamento"
import * as apontamentoActions from "../../../stores/actions/ApontamentoAction"; 
import ModalConfirm from "../../ModalConfirm/ModalConfirm"
import { showToast } from "../../ToastControl/ToastControl"

function ItemListaApontamento(props : any) : JSX.Element {

    const [showModalConfirm, setShowModalConfirm] = useState(false)
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

    const criarApontamento = () => {
        
        const dadosApontamento = {
            ID_TAREFA: dados.ID,
            ID_TAREFA_CHAMADO: dados.TAREFA.ID_TAREFA_CHAMADO,
            CLIENTE_TAREFA: dados.TAREFA.CLIENTE_TAREFA,
            DESCRICAO: dados.DESCRICAO
        }

        apontamentoUtils.criarApontamento(dadosApontamento).then((response)=>{
            if(response.status == 200){
                response.json().then((data)=>{
                    if(!data.message){
                        apontamentoUtils.buscaUltimoApontamento().then((response) =>{
                            if(response.status == 200){
                                response.json().then((data)=>{
                                    if(!data.message){
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

    return (
        <div id="container-item-lista-apontamento">
            <div id="item-lista-apontamento-titulo">
                <span className="item-apontamento-titulo">
                    {dados.TAREFA.ID_TAREFA_CHAMADO}
                </span>
            </div>
            <div id="item-lista-apontamento-cliente">
                <div className="row">
                    <div className="col-7">
                        {dados.TAREFA.CLIENTE_TAREFA}
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-3">Inicio</div>
                            <div className="col">{dados.DATA_HORA_INICIAL}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="item-lista-apontamento-descricao">
                <div className="row">
                    <div className="col-7">
                        {dados.DESCRICAO}
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-3">Final</div>
                            <div className="col">{dados.DATA_HORA_FINAL}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="item-lista-apontamento-acao">
                <button 
                type="button"
                className="btn-aponta btn-laranja w-100"
                onClick={() => setShowModalConfirm(true)}
                >
                    Apontar
                </button>
            </div>
            <ModalConfirm 
            show={showModalConfirm}
            onHide={() => setShowModalConfirm(false)}
            acaoConfirmada={() => criarApontamento()}
            tituloModalConfirm={
              "Deseja confirmar o apontamento ?"
              }
            />
        </div>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch : any) => ({
    
        setApontamentoAtual : (apontamentoAtual : any) => 
        dispatch(apontamentoActions.setApontamentoAtual(apontamentoAtual))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemListaApontamento);
