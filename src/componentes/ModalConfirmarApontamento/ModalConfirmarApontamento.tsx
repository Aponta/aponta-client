/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import "./ModalConfirmarApontamento.css"
import ModalControl from "../ModalControl/ModalControl";

function ModalConfirmarApontamento(props : any) : JSX.Element {

    const [dados, setDados] = useState({
        idTarefa: 0,
        clienteTarefa: "",
        descricaoTarefa: "",
    })

    useEffect(() => {
        if(props.show){
            setDados({
                idTarefa: props.apontamento.ID_TAREFA_CHAMADO,
                clienteTarefa: props.apontamento.CLIENTE_TAREFA,
                descricaoTarefa: props.apontamento.DESCRICAO,
            })
        }
    }, [props.show])
    
    const montarObj = () => {
        return  dados.descricaoTarefa
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
                      <div className="col">
                          <label className="label-modal">{dados.idTarefa}</label>
                         </div>
                      <div className="col">
                          <label className="label-modal">{dados.clienteTarefa}</label>
                      </div>
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

export default ModalConfirmarApontamento;