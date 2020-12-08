import React from 'react'
import "./Rota.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../stores/store";

import * as loginUtils from "../../utils/Login"

const RotaPrivada = ({...rest}) : JSX.Element => {
    return <Route {...rest} render={props =>(
        loginUtils.usuarioLogado(rest.exigeAutenticacao).then((response) => response) ?
        (<Provider store={store}><rest.componente {...props} /></Provider>) 
        :
        (<Redirect to={{ pathname:"/login" }} />)
    )}
    />
}

function Rota(props : any) : JSX.Element {
    return (
        <Switch>
            <RotaPrivada path={props.caminho} {...props} />
        </Switch>
    )
}

export default Rota
