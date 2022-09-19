/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import "./ModalConfirmarApontamento.css"
import ModalControl from "../ModalControl/ModalControl";
import Carregando from '../Carregando';

function ModalConfirmarApontamento(props : any) : JSX.Element {

    const [carregandoCriar, setCarregandoCriar] = useState(false);
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
        tituloModal={"Apontamento (" + dados.idTarefa + ")"}
        conteudoBody={
            <div className="form">
              <div className="form-group">
                  <div className="form-row">
                      <div className="col">
                          <textarea
                            rows={5}
                            id="campo-descricaoTarefa"
                            placeholder='Descrição'
                            name="descricaoTarefa"
                            className="form-control campo-modal-apontamento"
                            value={dados.descricaoTarefa}
                            onChange={(event : any)=> handleInputChange(event)}
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
                    className="btn-aponta btn-tertiary w-100-px"
                    onClick={() => props.criarApontamento(montarObj(), () => setCarregandoCriar(prevState => !prevState))}
                  >
                    {carregandoCriar && <Carregando corPrincipal={"white"} corSecundaria={"white"} tamanho={40} />}
                    {!carregandoCriar && "Criar"}
                  </button>
                </div>
              </>
            }
      />
    )
}

export default ModalConfirmarApontamento;