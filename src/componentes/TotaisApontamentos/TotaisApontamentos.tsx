import { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as utilsTotalTempoTarefa from "../../utils/TempoTotalTarefa";
import Carregando from "../Carregando";
import Paginacao from "../Paginacao";
import ItemListaTempoTotalTarefa from "./ItemListaTempoTotalTarefa/ItemListaTempoTotalTarefa";

import "./TotaisApontamentos.css";

function TotaisApontamentos(props: any) {

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [paginacaoDisplay, setPaginacaoDisplay] = useState(<></>)
    const [itensTempoTotalTarefaDisplay, seItensTempoTotalTarefaDisplay] = useState(<></>)
    const [itensTotalTempoTarefa, setItensTotalTempoTarefa] = useState([]);

    useEffect(() => {
        utilsTotalTempoTarefa.listarTempoTotalTarefaPorUsuario(props.quantidadePagina, paginaAtual)
            .then(response => {
                if(response.status == 200){
                    response.json().then(data => {
                        setItensTotalTempoTarefa(data.listaTempoTotalTarefa)
                        setTotalRegistros(data.total)
                    })
                }
            })
    }, [])
    
    useEffect(() => {
        montarPaginacao(totalRegistros);
        montarItensTempoTotalTarefa(itensTotalTempoTarefa);
        setCarregando(false);
    }, [itensTotalTempoTarefa])

    const montarPaginacao = (totalRegistros : number) => {
        
        if(totalRegistros){
            if(totalRegistros <= props.quantidadePagina){
                setPaginacaoDisplay(<></>)
            }else{
                setPaginacaoDisplay(
                    <Paginacao 
                    quantidadePagina={props.quantidadePagina} 
                    totalRegistros={totalRegistros} 
                    paginaAtual={(paginaSelecionada : number) => setPaginaAtual(paginaSelecionada)}
                    setCarregando={(bool : boolean) => setCarregando(bool)}
                    />)
            }
        }
    }

    const montarItensTempoTotalTarefa = (itensTotalTempoTarefa : any) =>{
        if(itensTotalTempoTarefa){
            seItensTempoTotalTarefaDisplay(itensTotalTempoTarefa.map((item : any) => (
                <ItemListaTempoTotalTarefa key={item.ID} {...item}/>
            )))
        }
    }

  return (
    <div id="container-totais-apontamentos">
        <div id="busca-totais-apontamentos"></div>
        <div id="itens-totais-apontamentos">
            {carregando && <Carregando />}
            {!carregando && itensTempoTotalTarefaDisplay}
        </div>
        <div id="paginacao-totais-apontamentos">
            {paginacaoDisplay}
        </div>
    </div>
  )
}

const mapStateToProps = (state : any) => ({
    quantidadePagina: state.ApontamentoReducer.quantidadePagina,
    paginaAtual: state.ApontamentoReducer.paginaAtual,
});

const mapDispatchToProps = (dispatch : any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotaisApontamentos);
