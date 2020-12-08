import React, { useState, useEffect } from 'react'
import "./Deslogar.css";
import { useHistory } from 'react-router-dom';
import * as loginUtils from "../../utils/Login"
import ModalConfirm from "../ModalConfirm/ModalConfirm"

export default function Deslogar() : JSX.Element {

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const historico = useHistory();

    useEffect(() => {
        loginUtils.usuarioLogado(true).then((response)=>{
            if(!response){
                deslogar();
            }
        });
    }, [])

    const deslogar = () =>{
        localStorage.removeItem("tokenAutenticacao");
        localStorage.removeItem("usuarioLogado");
        historico.push("/login");
      }

    return (
        <>
        <div id="constainer-deslogar">
            <button 
            type="button"
            className="btn-aponta btn-vermelho w-100"
            onClick={()=> setShowModalConfirm(true)}>
                Deslogar-se
            </button>
        </div>
        <ModalConfirm 
        show={showModalConfirm}
        onHide={() => setShowModalConfirm(false)}
        acaoConfirmada={() => deslogar()}
        tituloModalConfirm={
          "Deseja deslogar-se?"
          }
        />
        </>
    )
}
