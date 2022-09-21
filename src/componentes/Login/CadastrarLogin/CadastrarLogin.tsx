/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import "../Login.css";
import { showToast } from "../../ToastControl/ToastControl";
import * as backEndUtils from "../../../utils/BackEnd"
import { useHistory } from 'react-router-dom';
import Carregando from '../../Carregando';

export default function CadastrarLogin() : JSX.Element {

  const [carregando, setCarregando] = useState(false);
  const [dados, setDados] = useState({
    usuario: "",
    senha: "",
    repetirSenha: "",
  })

  const historico = useHistory();

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDados({
      ...dados,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const cadastrarLogin = (usuario:string, senha: string, repetirSenha: string ) : unknown => {

    if(!usuario.match(/[a-zA-Z]/)){
      showToast("erro", "Preencha o usuário")
      return
    }

    if(!senha.match(/[a-zA-Z0-9]/)){
      showToast("erro", "Preencha a senha")
      return
    }

    if(senha !== repetirSenha){
      showToast("erro", "As senhas são diferentes")
      return
    }

    const requisicao = {
      usuario: usuario,
      senha: senha
    }

    setCarregando(true);

    backEndUtils.chamarBackEnd("POST", "/login/cadastrar", requisicao).then((resposta)=>{
      if(resposta.status == 200){
        resposta.json().then((data)=>{
          if(data.message){
            showToast("erro", data.message);
          }else{
            historico.push("/login");
            showToast("sucesso" ,"Cadastro efetuado com sucesso");
          }
          setCarregando(false);
        })
      }
    })
  }

    return (
      <>
        <div id="container-login">
          <div id="login-titulo">
            <p className="titulo-aponta">
              APONTA
            </p>
          </div>
          <div id="login-corpo">
            <div className="container-corpo-login">
              <div className="form-row pb-2">
                <div className="col">
                  <input 
                  type="text" 
                  name="usuario"
                  placeholder="Email" 
                  className="form-control text-center" 
                  onChange={(event) => handleInputChange(event)} />
                </div>
              </div>
              <div className="form-row pb-2">
                <div className="col">
                <input 
                type="password" 
                name="senha"
                placeholder="Nova senha" 
                className="form-control text-center" 
                onChange={(event) => handleInputChange(event)} />
                </div>
              </div>
              <div className="form-row pb-2">
                <div className="col">
                <input 
                type="password"
                name="repetirSenha" 
                placeholder="Repita a senha" 
                className="form-control text-center" 
                onChange={(event) => handleInputChange(event)} />
                </div>
              </div>
              <div className="form-row pb-4">
                <div className="col">
                  <button 
                  type="button" 
                  className="btn-aponta btn-primario w-100"
                  onClick={()=> cadastrarLogin(dados.usuario, dados.senha, dados.repetirSenha)}>
                    {carregando && <Carregando cor1={"white"} cor2={"white"} />}
                    {!carregando && "Cadastrar"}
                  </button>
                  <button 
                  type="button" 
                  className="btn-aponta btn-alternative-primary w-100 mt-2"
                  onClick={()=> historico.push("/login")}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
