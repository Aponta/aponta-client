import React, { useState, useEffect } from 'react'
import "./ListaApontamento.css";
import ItemListaApontamento from "./ItemListaApontamento/ItemListaApontamento";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando"
import * as backEndUtils from "../../utils/BackEnd";

function ListaApontamento() : JSX.Element{
    
    const [carregando, setCarregando] = useState(true);
    const [paginacaoDisplay, setPaginacaoDisplay] = useState(<></>);
    const [itemApontamentoDisplay, seItemApontamentoDisplay] = useState([]);
    const [dados, setDados] = useState({
        quantidadePagina: 5,
        paginaAtual: 0,
    })

    
    useEffect(() => {
        window.setTimeout(() => buscarApontamentoPaginado(dados.quantidadePagina, 0), 1000)
    }, [])

    useEffect(() => {
        buscarApontamentoPaginado(dados.quantidadePagina, dados.paginaAtual);
    }, [dados.paginaAtual])

    const buscarApontamentoPaginado = (quantidadePagina: number, paginaAtual : number) => {

        const usuarioLogado = localStorage.getItem("usuarioLogado")

        const requisicao = {
            id : parseInt(atob(usuarioLogado || "")),
            quantidadePagina : quantidadePagina,
            paginaAtual: paginaAtual
        }

        backEndUtils.chamarBackEnd("POST", "/apontamento/paginado", requisicao).then((response) =>{
            if(response.status == 200){
                response.json().then((data)=>{
                    montarPaginacao(data.total);
                    montarItensApontamento(data.listaApontamento);
                    setCarregando(false);
                })
            }
        })
    }

    const montarPaginacao = (totalRegistros : number) => {
        setPaginacaoDisplay(<Paginacao 
            quantidadePagina={dados.quantidadePagina} 
            totalRegistros={totalRegistros} 
            paginaAtual={(paginaSelecionada : number) => paginaAtual(paginaSelecionada)}
            />)
    }

    const montarItensApontamento = (listaApontamento : any) =>{
        seItemApontamentoDisplay(listaApontamento.map((apontamento : any) => (
            <ItemListaApontamento key={apontamento.ID} {...apontamento}/>
        )))
    }

    const paginaAtual = (paginaSelecionada : number) => {
        setDados({
            ...dados,
            paginaAtual: paginaSelecionada
        })
    }

    return (
        <div id="container-lista-apontamento">
            {carregando && <Carregando />}
            {!carregando && (
                <>
                    <div id="itens-apontamento">
                        {itemApontamentoDisplay}
                    </div>
                    <div id="paginacao-apontamento">
                        {paginacaoDisplay}
                    </div>
                </>
            )}
            
        </div>
    )
}

export default ListaApontamento;