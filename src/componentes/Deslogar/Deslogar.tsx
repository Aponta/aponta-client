/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import "./Deslogar.css";
import { useHistory } from 'react-router-dom';
import * as loginUtils from "../../utils/Login"
import ModalConfirm from "../ModalConfirm/ModalConfirm"

export default function Deslogar() : JSX.Element {

    const [showModalConfirm, setShowModalConfirm] = useState(false);

    return (
        <>
        <div id="constainer-deslogar">
            <button 
            type="button"
            className="btn-aponta btn-primario w-100"
            onClick={()=> setShowModalConfirm(true)}>
                Deslogar
            </button>
        </div>
        <ModalConfirm 
        show={showModalConfirm}
        onHide={() => setShowModalConfirm(false)}
        acaoConfirmada={() => loginUtils.deslogar()}
        tituloModalConfirm={
          "Deseja deslogar?"
          }
        />
        </>
    )
}
