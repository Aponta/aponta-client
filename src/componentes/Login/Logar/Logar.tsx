/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React,{ useState, useEffect } from 'react'
import "../Login.css";
import { connect } from "react-redux";
import * as loginActions from "../../../stores/actions/LoginAction";
import * as backEndUtils from "../../../utils/BackEnd"
import { showToast } from "../../ToastControl/ToastControl";
import { Link, useHistory } from "react-router-dom";

function Logar() : JSX.Element {

  const historico = useHistory();
  const [dados, setDados] = useState({
    usuario: "",
    senha: ""
  })

  useEffect(() => {
    if(localStorage.getItem("tokenAutenticacao")){
      historico.push("/home");
    }
  }, [])

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDados({
      ...dados,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const logar = (usuario:string, senha: string ) : void => {

    const requisicao = {
      usuario: usuario,
      senha: senha
    }

    backEndUtils.chamarBackEnd("POST", "/login/logar", requisicao).then((resposta)=>{
      if(resposta.status == 200){
        resposta.json().then((data)=>{
          if(data.message){
            showToast("erro", data.message);
          }else{
            localStorage.tokenAutenticacao = btoa(data.token);
            localStorage.usuarioLogado = btoa(data.usuario.ID_USUARIO);
            showToast("sucesso", "Login efetuado com sucesso");
            historico.push("/home")
          }
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
                  placeholder="Usuário" 
                  className="form-control text-center" 
                  onChange={(event) => handleInputChange(event)} />
                </div>
              </div>
              <div className="form-row pb-2">
                <div className="col">
                <input 
                type="password" 
                name="senha"
                placeholder="Senha" 
                className="form-control text-center" 
                onChange={(event) => handleInputChange(event)} />
                </div>
              </div>
              <div className="form-row pb-4">
                <div className="col">
                <button 
                type="button" 
                className="btn btn-aponta btn-azul w-100"
                onClick={()=>logar(dados.usuario, dados.senha)}>
                    Login
                  </button>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <p>Não é cadastrado? 
                    <Link to="/novo-login">
                      <a href="#"> Cadastre-se</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

const mapStateToProps = (state : any) => ({});

const mapDispatchToProps = (dispatch : any) => ({
  SetUsuarioLogado: (usuarioLogado : any) => 
    dispatch(loginActions.SetUsuarioLogado(usuarioLogado))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logar);