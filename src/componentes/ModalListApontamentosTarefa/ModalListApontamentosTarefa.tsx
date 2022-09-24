import React, { useState, useEffect } from 'react'
import "./ModalListApontamentosTarefa.css"
import ModalControl from "../ModalControl/ModalControl";
import Carregando from '../Carregando';
import { buscarApontamentosPorTarefa } from '../../utils/Apontamento';
import Paginacao from '../Paginacao';
import ItemListaApontamento from '../ListaApontamento/ItemListaApontamento';
import dayjs from 'dayjs';

function ModalListApontamentosTarefa(props : any) : JSX.Element {

    const quantidadePagina = 2;
    const formatoData = "DD/MM/YYYY HH:mm";

    const [carregando, setCarregando] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [listaApontamento, setListaApontamento] = useState([]);
    const [apontamentosDisplay, setApontamentosDisplay] = useState(<></>)
    const [paginacaoDisplay, setPaginacaoDisplay] = useState(<></>)

    useEffect(() => {
        if(props.show && props.idTarefa){
          setCarregando(true)
          buscarApontamentosPorTarefa(props.idTarefa, quantidadePagina, paginaAtual).then((data) => {
                if(data){
                  setTotalRegistros(data.total);
                  setListaApontamento(data.listaApontamento);
                }
          })
        }
    }, [props.show, props.idTarefa, paginaAtual])

    useEffect(() => {
      montarPaginacao(totalRegistros);
      montarItensApontamento(listaApontamento)
      setCarregando(false)
    }, [totalRegistros, listaApontamento])

    const montarItensApontamento = (listaApontamento : any) =>{
      if(listaApontamento){
          setApontamentosDisplay(listaApontamento.map((apontamento : any) => (
              <div>
                <div>
                  <textarea
                  value={apontamento.DESCRICAO}
                  disabled={true}
                  rows={2}
                  />
                </div>
                <div>
                  {dayjs(apontamento.DATA_HORA_INICIAL).format(formatoData)}
                  &nbsp;
                  Até
                  &nbsp;
                  {dayjs(apontamento.DATA_HORA_FINAL).format(formatoData)}
                </div>
              </div>
          )))
      }
  }

    const montarPaginacao = (totalRegistros : number) => {
        
      if(totalRegistros){
          if(totalRegistros <= quantidadePagina){
              setPaginacaoDisplay(<></>)
          }else{
              setPaginacaoDisplay(
                  <Paginacao 
                  cor={"white"}
                  quantidadePagina={quantidadePagina} 
                  totalRegistros={totalRegistros} 
                  paginaAtual={(paginaSelecionada : number) => setPaginaAtual(paginaSelecionada)}
                  setCarregando={(bool : boolean) => setCarregando(bool)}
                  />)
          }
      }
  }

    return (
        <ModalControl
        {...props}
        tamanhoModal="md"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal={"Apontamentos (" + props.idTarefaChamado + ")"}
        conteudoBody={
          <div id='container-modal-list-apontamentos-tarefa'>
            <div className='itens-apontamento'>
              {carregando && <Carregando cor1={"white"} cor2={"white"} />}
              {!carregando && apontamentosDisplay}
            </div>
            <div className='paginacao-apontamento'>
              {paginacaoDisplay}
            </div>
          </div>
        }
      />
    )
}

export default ModalListApontamentosTarefa;