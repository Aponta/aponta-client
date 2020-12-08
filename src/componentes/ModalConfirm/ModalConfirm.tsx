import React from "react";
import "./ModalConfirm.css";
import ModalControl from "../ModalControl/ModalControl";

export default function ModalConfirm(props : any) : JSX.Element {
  return (
    <div>
      <>
        <ModalControl
          {...props}
          tamanhoModal="sm"
          estiloModalHeader="backgroundModal tituloModal"
          estiloModalBody="backgroundModal"
          estiloModalFooter="backgroundModal"
          tituloModal={props.tituloModalConfirm}
          conteudoBody={
            <div className="row centralizar">
              <div className="col">
                <button
                  className="btn-aponta btn-vermelho w-100"
                  onClick={() => props.onHide()}
                >
                  Cancelar
                </button>
              </div>
              <div className="col">
                <button
                  className="btn-aponta btn-verde w-100"
                  onClick={() => props.acaoConfirmada(props.onHide())}
                >
                  Confirmar
                </button>
              </div>
            </div>
          }
        />
      </>
    </div>
  );
}
