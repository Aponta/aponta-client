import React, { useState } from 'react'
import "./ModalApontamento.css";
import ModalControl from "../ModalControl/ModalControl";

function ModalApontamento(props : any) : JSX.Element {

    const [dados, setDados] = useState({
        idTarefa: 0,
        clienteTarefa: "",
        descricaoTarefa: "",
    })

    const montarObj = () => {
        return {
            ID_TAREFA_CHAMADO: dados.idTarefa,
            CLIENTE_TAREFA: dados.clienteTarefa,
            DESCRICAO: dados.descricaoTarefa
        }
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
          tamanhoModal="lg"
          estiloModalHeader="backgroundModal tituloModal"
          estiloModalBody="backgroundModal"
          estiloModalFooter="backgroundModal"
          tituloModal="Apontamento"
          conteudoBody={
              <div className="form">
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-4">
                            <label className="label-modal-apontamento">ID Tarefa</label>
                            <input
                            type="text"
                            id="campo-idTarefa"
                            name="idTarefa"
                            className="form-control"
                            value={dados.idTarefa == 0 ? "" : dados.idTarefa}
                            onChange={(event)=> handleInputChange(event)}
                            />
                        </div>
                        <div className="col">
                            <label className="label-modal-apontamento">Cliente</label>
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
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label className="label-modal-apontamento">Descrição</label>
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