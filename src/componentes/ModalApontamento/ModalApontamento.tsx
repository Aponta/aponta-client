/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import * as tarefaUtils from "../../utils/Tarefa";
import "./ModalApontamento.css";
import ModalControl from "../ModalControl/ModalControl";
import ResultadoBusca from "../ResultadoBusca/ResultadoBusca";
import { showToast } from '../ToastControl/ToastControl';
import * as tipos from "../../types/Tipos";
import ReactDOM from 'react-dom';
import Carregando from '../Carregando';

function ModalApontamento(props : any) : JSX.Element {

    const [dados, setDados] = useState({
        idApontamento: 0,
        idTarefa: 0,
        idTarefaChamado: "",
        clienteTarefa: "",
        descricaoTarefa: "",
    });
    const [showResultado, setShowResultado] = useState(false);
    const [resultadoDisplay, setResultadoDisplay] = useState(<></>)
    const [permiteEditar, setPermiteEditar] = useState(true);
    const [carregando, setCarregando] = useState(false);
    const [carregandoCriar, setCarregandoCriar] = useState(false);

    useEffect(() => {
      if(props.apontamento){
        setDados({
            idApontamento: props.apontamento.ID,
            idTarefa: props.apontamento.ID_TAREFA,
            idTarefaChamado: props.apontamento.TAREFA.ID_TAREFA_CHAMADO,
            clienteTarefa: props.apontamento.TAREFA.CLIENTE_TAREFA,
            descricaoTarefa: props.apontamento.DESCRICAO,
        })
      }

      if(props.permiteEditar == false){
        setPermiteEditar(false);
      }

      if(!props.show){
        setDados({
          idApontamento: 0,
          idTarefa: 0,
          idTarefaChamado: "",
          clienteTarefa: "",
          descricaoTarefa: "",
        })
      }
  }, [props.show])

  useEffect(() => {
    if (showResultado) {
      window.addEventListener("click", listenerClick);
    } else {
      window.removeEventListener("click", listenerClick);
    }
  }, [showResultado])

    const montarObjTarefa = () => {
        return {
            ID_TAREFA: dados.idTarefa || 0,
            ID_TAREFA_CHAMADO: dados.idTarefaChamado,
            CLIENTE_TAREFA: dados.clienteTarefa,
            DESCRICAO: dados.descricaoTarefa
        }
    }

    const listenerClick = () => {
      desmontarResultadoBusca()
    };

    const montarResultadoBusca = (registros : any) =>{
      setShowResultado(true);
      const elementoPai = document.getElementById("montarBusca");
      setResultadoDisplay(ReactDOM.createPortal(
      <ResultadoBusca 
      nomeCol1={"ID"} 
      nomeCol2={"Cliente"} 
      retornaSelecionado={(tarefa : any) => preencheTarefa(tarefa)}
      registros={registros}/>, elementoPai as Element));
    }

    const desmontarResultadoBusca = () =>{
      if(document.getElementById("montarBusca")){
        const elementoPai = document.getElementById("montarBusca");
        setResultadoDisplay(ReactDOM.createPortal(<></>, elementoPai as Element));
        setShowResultado(false);
      }
    }

    const listarTarefas = (idTarefaChamado : string) =>{
      if(idTarefaChamado && idTarefaChamado.toString().match(/[a-z]|[A-Z]|["'!@#$%¨&*()_+=`´^~{}/?;:]/)){
        showToast("erro", "Dados inválidos");
        return;
      }
        setCarregando(true);
        tarefaUtils.listarTarefas(idTarefaChamado ?? 0).then((response)=>{
          response.json().then((data) =>{
            if(data.message){
              desmontarResultadoBusca();
              showToast("erro", data.message);
            }else{
              const registros = data.map((registro : tipos.Tarefa)=>{
                const obj = {
                   campo1: registro.ID_TAREFA_CHAMADO,
                   campo2: registro.CLIENTE_TAREFA,
                   objCompleto: registro
                 }
                return obj
             })
              montarResultadoBusca(registros);
            }
          })
          setCarregando(false);
        })
    }

    const preencheTarefa = (tarefa : any) => {
      setDados({
        idApontamento: dados.idApontamento,
        idTarefa: tarefa.ID_TAREFA,
        idTarefaChamado: tarefa.ID_TAREFA_CHAMADO,
        clienteTarefa: tarefa.CLIENTE_TAREFA,
        descricaoTarefa: dados.descricaoTarefa,
      })
    }

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setDados({
          ...dados,
          [event.currentTarget.name]: event.currentTarget.value,
        });
      };

    return (
        <ModalControl
          {...props}
          tamanhoModal="md"
          estiloModalHeader="backgroundModal tituloModal"
          estiloModalBody="backgroundModal"
          estiloModalFooter="backgroundModal"
          tituloModal="Apontamento"
          conteudoBody={
              <div className="form">
                <div id="topo-modal-apontamento" className="form-group">
                    <div className="form-row">
                        <div className="col-4">
                            <div className="row">
                              <div className="col buscar-tarefas-modal">
                                <input
                                type="text"
                                id="campo-idTarefaChamado"
                                name="idTarefaChamado"
                                className="form-control"
                                placeholder='Tarefa'
                                value={dados.idTarefaChamado}
                                onChange={(event)=> handleInputChange(event)}
                                />
                              </div>
                              <div className="col-3 buscar-tarefas-modal">
                                <button 
                                className="btn btn-terciario buscar-tarefas-modal"
                                onClick={()=> listarTarefas(dados.idTarefaChamado as unknown as string)}
                                >
                                  {carregando && 
                                  <Carregando 
                                  cor1={"white"} 
                                  cor2={"white"}
                                  tamanho={30} />}
                                  {!carregando && <i className="fa fa-search"/>}
                                  
                                </button>
                              </div>
                            </div>
                        </div>
                        <div className="col">
                            <input
                            type="text"
                            id="campo-clienteTarefa"
                            name="clienteTarefa"
                            placeholder='Cliente'
                            className="form-control campo-modal-apontamento"
                            disabled={!permiteEditar}
                            value={dados.clienteTarefa}
                            onChange={(event)=> handleInputChange(event)}
                            />
                        </div>
                    </div>
                    <div id="montarBusca">
                      {resultadoDisplay}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <textarea
                            rows={5}
                            id="campo-descricaoTarefa"
                            placeholder='Descrição'
                            name="descricaoTarefa"
                            className="form-control campo-modal-apontamento"
                            disabled={!permiteEditar}
                            value={dados.descricaoTarefa}
                            onChange={(event : any)=> handleInputChange(event)}
                            />
                        </div>
                    </div>
                </div>
              </div>
          }
          conteudoFooter =
          {
            <>
              {permiteEditar == false && 
                (
                  <div>
                    <button
                      type="button"
                      className="btn-aponta btn-terciario w-100-px"
                      onClick={() => props.editarTarefaApontamento(montarObjTarefa(), () => setCarregandoCriar(prevState => !prevState))}
                    >
                     {carregandoCriar && <Carregando cor1={"white"} cor2={"white"} tamanho={30} />}
                      {!carregandoCriar && "Editar"}
                    </button>
                  </div>
                )
              }
              {permiteEditar &&
                (
                  <div>
                    <button
                      type="button"
                      className="btn-aponta btn-terciario w-100-px"
                      onClick={() => props.criarApontamento(montarObjTarefa(), () => setCarregandoCriar(prevState => !prevState))}
                    >
                      {carregandoCriar && <Carregando cor1={"white"} cor2={"white"} tamanho={30}/>}
                      {!carregandoCriar && "Criar"}
                    </button>
                  </div>
                )
              }
            </>
          }
        />
    )
}

export default ModalApontamento