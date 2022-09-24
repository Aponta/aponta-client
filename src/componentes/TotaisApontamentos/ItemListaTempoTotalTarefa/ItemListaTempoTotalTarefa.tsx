import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { formatarHora } from '../../../utils/TempoReal';
import ModalListApontamentosTarefa from '../../ModalListApontamentosTarefa/ModalListApontamentosTarefa';
import "./ItemListaTempoTotalTarefa.css";

function ItemListaTempoTotalTarefa(props: any) {

    const [tempoTotalFormatadoDisplay, setTempoTotalFormatadoDisplay] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setTempoTotalFormatadoDisplay(formatarHora(props.TEMPO_TOTAL))
    }, [])

  return (
    <>
        <div className='container-item-lista-tempo-total-tarefa' onClick={() => setShowModal(true)}>
            <div className='cortar-texto-1'>
                {`${props.TAREFA.ID_TAREFA_CHAMADO} - ${props.TAREFA.CLIENTE_TAREFA}`}
            </div>
            <div>
                <i className="fa fa-clock-o"></i>
                <div>
                    {`${tempoTotalFormatadoDisplay}`}
                </div>
            </div>
        </div>
        <ModalListApontamentosTarefa
        idTarefaChamado={props.TAREFA.ID_TAREFA_CHAMADO}
        idTarefa={props.TAREFA.ID_TAREFA}
        show={showModal}
        onHide={() => setShowModal(false)}
        />
    </>
  )
}

export default ItemListaTempoTotalTarefa