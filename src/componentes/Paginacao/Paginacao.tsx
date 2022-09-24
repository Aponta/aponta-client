import React, { useState, useEffect} from 'react'
import "./Paginacao.css";
import ReactPaginate from "react-paginate";

function Paginacao(props : any) : JSX.Element {

    const [totalDePaginas, setTotalDePaginas] = useState(0);

    useEffect(() => {
        setTotalDePaginas(totalPaginas(props.quantidadePagina, props.totalRegistros));
    }, [props.quantidadePagina, props.totalRegistros])

    const totalPaginas = (quantidadePagina : number, totalRegistros : number) : number =>{
        return totalRegistros / quantidadePagina;
    }

    const mudarPagina = (data : any) => {
        const paginaSelecionada = data.selected;
        props.paginaAtual(paginaSelecionada);
        props.setCarregando(true);
    }

    return (
        <div className="container-paginacao"
        style={{
            "--corPaginacao" : props.cor ?? "var(--cor-primaria)",
            "--corPaginacaoSelecionado": props.cor ? "var(--cor-primaria)" : "white" 
        } as React.CSSProperties}
        >
            <ReactPaginate
            previousLabel={'<'}
            previousClassName={"item-pagina"}
            previousLinkClassName={"link-item-pagina"}
            nextLabel={'>'}
            nextClassName={"item-pagina"}
            nextLinkClassName={"link-item-pagina"}
            breakLabel={"..."}
            breakClassName={"item-pagina"}
            breakLinkClassName={"link-item-pagina"}
            pageClassName={"item-pagina"}
            pageLinkClassName={"link-item-pagina"}
            pageCount={totalDePaginas}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={mudarPagina}
            containerClassName={'pagination'}
            activeClassName={'pagina-atual'}
            />
        </div>
    )
}

export default Paginacao;
