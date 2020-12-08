import React from 'react';
import './App.css';
import "./EstiloPadrao.css"
import Logar from "./componentes/Login/Logar/Logar";
import CadastrarLogin from "./componentes/Login/CadastrarLogin/CadastrarLogin";
import ToastControl from "./componentes/ToastControl/ToastControl";
import TempoReal from "./componentes/TempoReal/TempoReal";
import Deslogar from "./componentes/Deslogar/Deslogar"
import ListaApontamento from "./componentes/ListaApontamento/ListaApontamento";
import Rota from "./componentes/Rotas/Rota"

function App () : JSX.Element {

  return (
    <div className="App">
      <div id="espaco-esq">
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
        <Rota 
        caminho="/home" 
        exigeAutenticacao={true}
        componente={()=> <Deslogar /> } 
        /> 
        <ToastControl />
      </div>
    </div>
  );
}

export default App;
