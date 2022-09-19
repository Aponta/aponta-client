import React from 'react';
import "./Carregando.css";

function Carregando (props: any) : JSX.Element {

return(
    <div className="container">
    <div 
    style={{
        "--cor-principal": props.corPrincipal ?? "var(--primary-color)",
        "--cor-secundaria": props.corSecundaria ?? "var(--tertiary-color)",
        "--tamanho-carregando": props.tamanho ? `${props.tamanho}px` : "50px" 
    } as React.CSSProperties}
    className="carregando"></div>
    </div>
)
 
}
export default Carregando
