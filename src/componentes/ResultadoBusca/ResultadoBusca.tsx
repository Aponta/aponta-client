/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import "./ResultadoBusca.css";

function ResultadoBusca(props : any) : JSX.Element  {

    const [linhasDisplay, setLinhasDisplay] = useState(<></>)

    useEffect(() => {
        setLinhasDisplay(props.registros.map((registro: { campo1: React.ReactNode; campo2: React.ReactNode; objCompleto: React.ReactNode; })=>(
            <div className="row linha-resultado-busca" onClick={()=> props.retornaSelecionado(registro.objCompleto)}>
                <div className="col-5 text-center pointer">{registro.campo1}</div>
                <div className="col text-center">{registro.campo2}</div>
            </div>
        )))
    }, [props.registros])

    return (
        <div id="container-resultado-busca" className="form-group">
            {linhasDisplay}
        </div>
    )
}

export default ResultadoBusca
