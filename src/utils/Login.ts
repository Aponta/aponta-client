/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const deslogar = () =>{
    localStorage.removeItem("tokenAutenticacao");
    localStorage.removeItem("usuarioLogado");
    window.location.pathname = "/login";
  }