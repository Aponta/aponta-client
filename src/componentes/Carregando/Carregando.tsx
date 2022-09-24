import React from 'react';
import "./Carregando.css";

function Carregando (props: any) : JSX.Element {

return(
    <section className="container">
        <span 
        style={{
            "--cor-1": props.cor1 ?? "var(--cor-primaria)",
            "--cor-2": props.cor2 ?? "var(--cor-terciaria)",
            "--tamanho-carregando": props.tamanho ? `${props.tamanho}px` : "50px" 
        } as React.CSSProperties}
        className="carregando"></span>
    </section>
)
 
}
export default Carregando
