import React from 'react';
import "./Carregando.css";

function Carregando (props: any) : JSX.Element {

return(
    <div className="container">
    <div 
    style={{
        "--cor-1": props.cor1 ?? "var(--cor-primaria)",
        "--cor-2": props.cor2 ?? "var(--cor-terciaria)",
        "--tamanho-carregando": props.tamanho ? `${props.tamanho}px` : "50px" 
    } as React.CSSProperties}
    className="carregando"></div>
    </div>
)
 
}
export default Carregando
