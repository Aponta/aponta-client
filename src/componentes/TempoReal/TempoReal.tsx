/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import "./TempoReal.css"
import { connect } from "react-redux";
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear';
import * as apontamentoUtils from "../../utils/Apontamento";
import * as apontamentoActions from "../../stores/actions/ApontamentoAction";
import { showToast } from "../ToastControl/ToastControl"
import Carregando from "../Carregando/Carregando";
import ModalConfirm from "../ModalConfirm/ModalConfirm"
import ModalApontamento  from "../ModalApontamento/ModalApontamento";

function TempoReal(props : any) : JSX.Element {

    const [showModalApontamento, setShowModalApontamento] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [infoTarefa, setInfoTarefa] = useState(<></>)
    const [formatadoDiplay, setFormatadoDiplay] = useState("00:00");
    const [idTempoReal, setIdTempoReal] = useState(0)
    const [livre, setLivre] = useState(true);
    const [carregando, setCarregando] = useState(true);

    const [dados, setDados] = useState({
        ID: 0,
        DATA_HORA_INICIAL : null,
        DATA_HORA_FINAL : null,
        DESCRICAO: "",
        USUARIO: {},
        TAREFA: {
            ID_TAREFA_CHAMADO: 0,
        }
    })

    let horas = 0;
    let minutos = 0;

    useEffect(() => {
        montarDisplayBase()
    }, [livre])

    useEffect(() => {
        if(props.apontamentoAtual.DATA_HORA_FINAL == "0001-01-01T00:00:00"){
            setDados({
                ID: props.apontamentoAtual.ID,
                DATA_HORA_INICIAL: props.apontamentoAtual.DATA_HORA_INICIAL,
                DATA_HORA_FINAL: props.apontamentoAtual.DATA_HORA_FINAL,
                DESCRICAO:  props.apontamentoAtual.DESCRICAO,
                USUARIO: props.apontamentoAtual.USUARIO,
                TAREFA: props.apontamentoAtual.TAREFA
            })

            setLivre(false);
            atualizarTimer(props.apontamentoAtual.DATA_HORA_INICIAL);
            setInfoTarefa(
            <>
                <div id="container-tempo-real-info-tarefa-titulo">
                    <div 
                    id="titulo-tarefa-info-tempo-real" 
                    className="texto-info-tempo-real cortar-texto-2">
                        {props.apontamentoAtual.TAREFA.ID_TAREFA_CHAMADO + " - " + props.apontamentoAtual.TAREFA.CLIENTE_TAREFA}
                    </div>
                </div>
                <div id="container-tempo-real-info-tarefa-descricao">
                    <div 
                    id="cliente-tarefa-info-tempo-real" 
                    className="texto-info-tempo-real">
                        {props.apontamentoAtual.DESCRICAO}
                    </div>
                </div>
            </>
            )
        }
    }, [props.apontamentoAtual])

    useEffect(() => {
        buscaUltimoApontamento()
    }, [])

    const montarDisplayBase = () =>{
        if(livre){
            setInfoTarefa(
                <>
                    <div id="container-tempo-real-info-tarefa-titulo">
                        <div 
                            id="titulo-tarefa-info-tempo-real" 
                            className="texto-info-tempo-real">
                                <h4 id="titulo-tarefa">
                                    Livre
                                </h4>
                        </div>
                    </div>
                    <div id="container-tempo-real-info-tarefa-descricao">
                        <button 
                        type="button"
                        className="btn-aponta btn-primario w-100"
                        onClick={()=> setShowModalApontamento(true)}
                        >
                            Novo apontamento
                        </button>
                    </div>
                </>)
            }
    }

    const buscaUltimoApontamento = () => {
        setTimeout(()=>{
            apontamentoUtils.buscaUltimoApontamento().then((response) =>{
                if(response.status == 200){
                    response.json().then((data)=>{
                        setCarregando(false)
                        if(!data.message){
                            props.setApontamentoAtual(data.apontamento);
                        }
                    })
                }
            })
        }, 1000)    
    }

    const criarApontamento = (dadosApontamento : any,  carregandoApontamento: () => void) => {

        if(!dadosApontamento.ID_TAREFA_CHAMADO){
            showToast("erro", "Preencha a tarefa");
            return
        }

        if(dadosApontamento.ID_TAREFA_CHAMADO.toString().match(/[a-zA-Z]/)){
            showToast("erro", "A tarefa deve conter apenas números");
            return
        }

        if(!dadosApontamento.CLIENTE_TAREFA){
            showToast("erro", "Preencha o cliente");
            return
        }

        if(!dadosApontamento.DESCRICAO.match(/[a-zA-Z]/)){
            showToast("erro", "Preencha a descrição");
            return
        }

        carregandoApontamento();

        apontamentoUtils.criarApontamento(dadosApontamento).then((response)=>{
            if(response.status == 200){
                response.json().then((data)=>{
                    if(!data.message){
                        showToast("sucesso", "Apontamento criado")
                        setShowModalApontamento(false);
                        buscaUltimoApontamento();
                    }else{
                        showToast("erro", data.message);
                    }
                })
            }
            carregandoApontamento();
        })
    }

    const encerrarApontamento = (idApontamento: number) : void =>{
        setCarregando(true);
        apontamentoUtils.encerrarApontamento(idApontamento).then((response)=>{
            if(response.status == 200){
                setLivre(true);
                buscaUltimoApontamento();
                props.getApontamentoPaginado(props.quantidadePagina, props.paginaAtual);
                showToast("sucesso", "Apontatamento " + dados.TAREFA.ID_TAREFA_CHAMADO + " encerrado")
            }else{
                showToast("error", "Ocorreu um erro ao encerrar apontamento");
            }
        setCarregando(false);
        })
    }
    
    const iniciarTempoReal = () : void =>{
        clearInterval(idTempoReal);
        setFormatadoDiplay((horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos))
        setIdTempoReal(window.setInterval(()=>{
        minutos += 1;
            if(minutos == 60){
                minutos = 0;
                horas += 1;
            }
            setFormatadoDiplay((horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos))
        }, 60000))
    }

    const atualizarTimer = (dataHoraInicial: Date) : void => {
        
        dayjs.extend(dayOfYear);

        const diaInicial = dayjs(dataHoraInicial).dayOfYear();
        const horaInicial = dayjs(dataHoraInicial).hour();
        const minutosInicial = dayjs(dataHoraInicial).minute();

        const dataHoraAtual = dayjs();

        dataHoraAtual.diff(dayjs(dataHoraInicial), 'm', true)

        if(diaInicial !==  dataHoraAtual.dayOfYear()){
            horas = (dataHoraAtual.dayOfYear() - diaInicial) * 24
        }

        if(minutosInicial>dataHoraAtual.minute()){
            horas += (dataHoraAtual.hour() - horaInicial) - 1
            minutos = ((minutosInicial - 60) * -1) + dataHoraAtual.minute()
        }else{
            horas += (dataHoraAtual.hour() - horaInicial)
            minutos = dataHoraAtual.minute() - minutosInicial
        }

        iniciarTempoReal()
    }
    
    return (
        <div id="container-tempo-real">
            {carregando && <Carregando />}
            {!carregando && (
                <>
                    <div id={livre ? "container-tempo-real-livre" : "container-tempo-real-grid"}>
                        <div id="tempo-real-info-tarefa">
                            {infoTarefa}
                        </div>
                        {!livre &&
                        <>
                            <div id="tempo-real-timer">
                            <div id="tempo-real-timer-cronometro">
                                <div>
                                    <h4>
                                        <i className="fa fa-circle icone-cronometro"/>{formatadoDiplay}
                                    </h4>
                                </div>
                            </div>
                            <div id="tempo-real-timer-acoes">
                                <button 
                                type="button"
                                className="btn-aponta btn-primario w-100"
                                onClick={()=> setShowModalConfirm(true)}
                                >
                                    Encerrar
                                </button>
                            </div>
                        </div>
                        </>
                        }
                    </div>
                </>
            )}
            <ModalConfirm 
                show={showModalConfirm}
                onHide={() => setShowModalConfirm(false)}
                acaoConfirmada={() => encerrarApontamento(dados.ID)}
                tituloModalConfirm={
                "Deseja encerrar o apontamento?"
                }
            />
            <ModalApontamento 
                show={showModalApontamento}
                onHide={()=>setShowModalApontamento(false)}
                criarApontamento={(dadosApontamento : any, carregandoApontamento: () => void)=> criarApontamento(dadosApontamento, carregandoApontamento)}
            />
        </ div>
    )
}

const mapStateToProps = (state : any) => ({
    apontamentoAtual: state.ApontamentoReducer.apontamentoAtual,
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
)(TempoReal);
