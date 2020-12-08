import dayjs from "dayjs";

export let formatadoDiplay = "00:00";
let idTempoReal = 0;
let horas = 0;
let minutos = 0;

export const IniciarTempoReal = () =>{
    clearInterval(idTempoReal);
    formatadoDiplay = (horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos)
    idTempoReal = setInterval(()=>{
    minutos += 1;
        if(minutos == 60){
            minutos = 0;
            horas += 1;
        }
        formatadoDiplay =(horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos)
    },1000) as any

}

export const AtualizarTimer = (dataHoraInicial: Date) : any => {
    
    const horaInicial = dayjs(dataHoraInicial).hour();
    const minutosInicial = dayjs(dataHoraInicial).minute();

    const dataHoraAtual = dayjs();
    horas = dataHoraAtual.hour() - horaInicial
    if(minutosInicial>dataHoraAtual.minute()){
        minutos = ((dataHoraAtual.minute() * -1) + 60) - minutosInicial
    }else{
        minutos = dataHoraAtual.minute() - minutosInicial
    }

    IniciarTempoReal()
}