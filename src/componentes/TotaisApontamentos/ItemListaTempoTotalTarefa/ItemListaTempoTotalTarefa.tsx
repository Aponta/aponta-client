import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import "./ItemListaTempoTotalTarefa.css";

function ItemListaTempoTotalTarefa(props: any) {

    const [tempoTotalFormatadoDisplay, setTempoTotalFormatadoDisplay] = useState("");

    useEffect(() => {
        let seconds = Math.floor(props.TEMPO_TOTAL / 1000);
        let minutes = Math.floor(seconds / 60) || 1;
        let hours = Math.floor(minutes / 60);

        setTempoTotalFormatadoDisplay(`${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds > 59 ? 59 : seconds)}`)
    }, [])

    function padTo2Digits(numero: number) {
        return numero.toString().padStart(2, '0');
    }

  return (
    <div className='container-item-lista-tempo-total-tarefa'>
        <div className='item-lista-tempo-total-tarefa-titulo'>
            <div>
                {`${props.TAREFA.ID_TAREFA_CHAMADO} - ${props.TAREFA.CLIENTE_TAREFA}`}
            </div>
            <div>
                <i className="fa fa-clock-o"></i>
                <div>
                    {`${tempoTotalFormatadoDisplay}`}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemListaTempoTotalTarefa