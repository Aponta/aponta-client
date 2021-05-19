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
import { Tarefa } from '../../../tipos/Tipos';

function ItemListaApontamento(props : any) : JSX.Element {

    const [showModalConfirmarApontamento, setShowModalConfirmarApontamento] = useState(false)
    const [showModalApontamento, setShowModalApontamento] = useState(false)
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

    const montarObj = () =>{
        return {
            ID_TAREFA_CHAMADO: dados.TAREFA.ID_TAREFA_CHAMADO,
            CLIENTE_TAREFA: dados.TAREFA.CLIENTE_TAREFA,
            DESCRICAO: dados.DESCRICAO
        }
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
                    <div className="col col-lg-7 cortar-texto">
                        {dados.TAREFA.CLIENTE_TAREFA}
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col col-lg-3 d-none d-sm-block">Inicio</div>
                            <div className="col cortar-texto">
                                {dados.DATA_HORA_INICIAL}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="item-lista-apontamento-descricao">
                <div className="row">
                    <div className="col col-lg-7">
                        {dados.DESCRICAO}
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-lg-3 d-none d-sm-block">Final</div>
                            <div className="col">{dados.DATA_HORA_FINAL}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="item-lista-apontamento-acao">
            <Dropdown titulo="Executar" cor={"dropdown-laranja"}>
                <>
                    <button 
                        type="button"
                        className="btn-aponta btn-verde w-100"
                        onClick={() => setShowModalConfirmarApontamento(true)}
                    >
                        Apontar
                    </button>
                    <button 
                        type="button"
                        className="btn-aponta btn-amarelo w-100"
                        onClick={() => setShowModalApontamento(true)}
                    >
                        Editar
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
