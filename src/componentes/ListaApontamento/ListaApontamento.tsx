/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import "./ListaApontamento.css";
import ItemListaApontamento from "./ItemListaApontamento/ItemListaApontamento";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando"
import * as apontamentoActions from "../../stores/actions/ApontamentoAction";


function ListaApontamento(props : any) : JSX.Element{
    
    const [carregando, setCarregando] = useState(true);
    const [paginacaoDisplay, setPaginacaoDisplay] = useState(<></>);
    const [itemApontamentoDisplay, seItemApontamentoDisplay] = useState([]);
 
    useEffect(() => {
        props.getApontamentoPaginado(props.quantidadePagina, props.paginaAtual)
    }, [])

    useEffect(() => {
        props.getApontamentoPaginado(props.quantidadePagina, props.paginaAtual)
    }, [props.paginaAtual])

    useEffect(() => {
        props.getApontamentoPaginado(props.quantidadePagina, props.paginaAtual, props)
    }, [props.apontamentoAtual])

    useEffect(() => {
        montarPaginacao(props.apontamentoPaginado.total);
        montarItensApontamento(props.apontamentoPaginado.listaApontamento);
        setCarregando(false);
    }, [props.apontamentoPaginado])

    useEffect(() => {
        setCarregando(props.carregando)
    }, [props.carregando])

    const montarPaginacao = (totalRegistros : number) => {
        
        if(totalRegistros){
            if(totalRegistros <= props.quantidadePagina){
                setPaginacaoDisplay(<></>)
            }else{
                setPaginacaoDisplay(
                    <Paginacao 
                    quantidadePagina={props.quantidadePagina} 
                    totalRegistros={totalRegistros} 
                    paginaAtual={(paginaSelecionada : number) => paginaAtual(paginaSelecionada)}
                    setCarregando={(bool : boolean) => setCarregando(bool)}
                    />)
            }
        }
    }

    const montarItensApontamento = (listaApontamento : any) =>{
        if(listaApontamento){
            seItemApontamentoDisplay(listaApontamento.map((apontamento : any) => (
                <ItemListaApontamento key={apontamento.ID} {...apontamento}/>
            )))
        }
    }

    const paginaAtual = (paginaSelecionada : number) => {
        props.setPaginaAtual(paginaSelecionada);
    }

    return (
        <div id="container-lista-apontamento">
            {carregando && 
                <>
                    <Carregando />
                </>
            }
            {!carregando && (
                <>
                    <div id="itens-apontamento">
                        {itemApontamentoDisplay}
                    </div>
                </>
            )}
            <div id="paginacao-apontamento">
                {paginacaoDisplay}
            </div>
        </div>
    )
}

const mapStateToProps = (state : any) => ({
    apontamentoAtual: state.ApontamentoReducer.apontamentoAtual,
    apontamentoPaginado: state.ApontamentoReducer.apontamentoPaginado,
    quantidadePagina: state.ApontamentoReducer.quantidadePagina,
    paginaAtual: state.ApontamentoReducer.paginaAtual,
    carregando: state.ApontamentoReducer.carregando
});

const mapDispatchToProps = (dispatch : any) => ({
    getApontamentoPaginado : (quantidadePagina : number, paginaAtual : number) => 
        dispatch(apontamentoActions.getApontamentoPaginado(quantidadePagina, paginaAtual)),
        setPaginaAtual : (paginaAtual : number) => 
        dispatch(apontamentoActions.setPaginaAtual(paginaAtual))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaApontamento);
