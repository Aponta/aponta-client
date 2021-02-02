import React, { useState, useEffect } from 'react'
import "./ResultadoBusca.css";

function ResultadoBusca(props : any) : JSX.Element  {

    const [linhasDisplay, setLinhasDisplay] = useState(<></>)

    useEffect(() => {
        setLinhasDisplay(props.registros.map((registro: { campo1: React.ReactNode; campo2: React.ReactNode; })=>(
            <div className="form-row">
                <div className="col-5 text-center">{registro.campo1}</div>
                <div className="col text-center">{registro.campo2}</div>
            </div>
        )))
    }, [props.registros])

    return (
        <div className="form-group">
            <div className="form-row">
                <div className="col-5 text-center">ID</div>
                <div className="col text-center">Cliente</div>
            </div>
            {linhasDisplay}
        </div>
    )
}

export default ResultadoBusca
