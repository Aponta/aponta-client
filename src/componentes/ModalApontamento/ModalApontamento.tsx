/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import * as tarefaUtils from "../../utils/Tarefa";
import "./ModalApontamento.css";
import ModalControl from "../ModalControl/ModalControl";
import ResultadoBusca from "../ResultadoBusca/ResultadoBusca";
import { showToast } from '../ToastControl/ToastControl';
import * as tipos from "../../Tipos/Tipos";
import ReactDOM from 'react-dom';

function ModalApontamento(props : any) : JSX.Element {

    const [dados, setDados] = useState({
        idTarefa: 0,
        clienteTarefa: "",
        descricaoTarefa: "",
    });
    const [showResultado, setShowResultado] = useState(false);
    const [resultadoDisplay, setResultadoDisplay] = useState(<></>)

    useEffect(() => {
      if(props.apontamento){
        setDados({
            idTarefa: props.apontamento.ID_TAREFA_CHAMADO,
            clienteTarefa: props.apontamento.CLIENTE_TAREFA,
            descricaoTarefa: props.apontamento.DESCRICAO,
        })
      }
  }, [])

  useEffect(() => {
    if (showResultado) {
      window.addEventListener("click", listenerClick);
    } else {
      window.removeEventListener("click", listenerClick);
    }
  }, [showResultado])

    const montarObj = () => {
        return {
            ID_TAREFA_CHAMADO: dados.idTarefa,
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
        <div className="col">
          <ResultadoBusca registros={registros}/>
        </div>, elementoPai as Element));
    }

    const desmontarResultadoBusca = () =>{
      const elementoPai = document.getElementById("montarBusca");
      setResultadoDisplay(ReactDOM.createPortal(<></>, elementoPai as Element));
    }

    const listarTarefas = (idTarefa : string) =>{
      if(idTarefa.match(/[a-z]|[A-Z]|["'!@#$%¨&*()_+=`´^~{}/?;:]/)){
        showToast("erro", "Dados inválidos");
        return;
      }
        tarefaUtils.listarTarefas(idTarefa ?? 0).then((response)=>{
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
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-4">
                            <label className="label-modal label-modal-titulo">ID Tarefa</label>
                            <input
                            type="text"
                            id="campo-idTarefa"
                            name="idTarefa"
                            className="form-control"
                            onDoubleClick={()=> listarTarefas(dados.idTarefa as unknown as string)}
                            value={dados.idTarefa == 0 ? "" : dados.idTarefa}
                            onChange={(event)=> handleInputChange(event)}
                            />
                        </div>
                        <div className="col">
                            <label className="label-modal label-modal-titulo">Cliente</label>
                            <input
                            type="text"
                            id="campo-clienteTarefa"
                            name="clienteTarefa"
                            className="form-control"
                            value={dados.clienteTarefa}
                            onChange={(event)=> handleInputChange(event)}
                            />
                        </div>
                    </div>
                    <div className="row" id="montarBusca">
                      {resultadoDisplay}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label className="label-modal label-modal-titulo">Descrição</label>
                            <input
                            type="text"
                            id="campo-descricaoTarefa"
                            name="descricaoTarefa"
                            className="form-control"
                            value={dados.descricaoTarefa}
                            onChange={(event)=> handleInputChange(event)}
                            />
                        </div>
                    </div>
                </div>
              </div>
          }
          conteudoFooter={
                <>
                  <div>
                    <button
                      type="button"
                      className="btn-aponta btn-verde w-100-px"
                      onClick={() => props.criarApontamento(montarObj())}
                    >
                      Criar
                    </button>
                  </div>
                </>
              }
        />
    )
}

export default ModalApontamento