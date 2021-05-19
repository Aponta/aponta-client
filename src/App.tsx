import React, { useEffect } from 'react';
import './App.css';
import "./EstiloPadrao.css"
import { Redirect, useHistory } from "react-router-dom";
import SideBar from "./componentes/SideBar";
import MenuOption from "./componentes/MenuOption";
import Logar from "./componentes/Login/Logar/Logar";
import CadastrarLogin from "./componentes/Login/CadastrarLogin/CadastrarLogin";
import ToastControl from "./componentes/ToastControl/ToastControl";
import TempoReal from "./componentes/TempoReal/TempoReal";
import Deslogar from "./componentes/Deslogar/Deslogar"
import ListaApontamento from "./componentes/ListaApontamento/ListaApontamento";
import Rota from "./componentes/Rotas/Rota"

function App () : JSX.Element {

  const historico = useHistory();

    useEffect(() => {
      if(historico){
        if(historico.location.pathname === "/"){
          <Redirect to={{ pathname:"/home" }} />
        }
      }
    }, [historico])

  return (
    <>
    <Redirect to={{ pathname:"/login" }} />
    <div id="container-app">
      <div id="espaco-esq">
        <div id="sideBar">
          <Rota 
          caminho="/home"
          exigeAutenticacao={true}
          componente={()=> 
            <> 
              <SideBar >
                <>
                  <Rota 
                  caminho="/home" 
                  exigeAutenticacao={true}
                  componente={()=> 
                      <MenuOption>
                        <Deslogar />
                      </MenuOption>
                    }
                  />
                </>
              </SideBar>
            </> 
            } 
          />
        </div>
      </div>
      <div id="espaco-cen">
          <div id="espaco-cen-cabecalho">
            <Rota 
            caminho="/home" 
            exigeAutenticacao={true}
            componente={()=><TempoReal />} />
          </div>
          <div id="espaco-cen-corpo">
              <Rota 
              caminho="/login" 
              exigeAutenticacao={false}
              componente={()=><Logar />}
              />
              <Rota 
              exact 
              caminho="/novo-login" 
              exigeAutenticacao={false}
              componente={() => <CadastrarLogin />} 
              />
              <Rota 
              exact
              caminho="/home" 
              exigeAutenticacao={true}
              componente={()=><ListaApontamento />}
              />
          </div>
          <div id="espaco-cen-rodape"></div>
      </div>
      <div id="espaco-dir">
        <ToastControl />
      </div>
    </div>
    </>
  );
}

export default App;
