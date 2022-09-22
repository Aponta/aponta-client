import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { formatarHora } from '../../../utils/TempoReal';
import "./ItemListaTempoTotalTarefa.css";

function ItemListaTempoTotalTarefa(props: any) {

    const [tempoTotalFormatadoDisplay, setTempoTotalFormatadoDisplay] = useState("");

    
    useEffect(() => {
        setTempoTotalFormatadoDisplay(formatarHora(props.TEMPO_TOTAL))
    }, [])

  return (
    <div className='container-item-lista-tempo-total-tarefa'>
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
  )
}

export default ItemListaTempoTotalTarefa