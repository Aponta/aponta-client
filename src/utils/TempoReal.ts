export const formatarHora = (tempoTotal: number) : string => {

    let seconds = Math.floor(tempoTotal / 1000);
    let minutes = Math.floor(seconds / 60) || 1;
    let hours = Math.floor(minutes / 60);

    seconds = seconds > minutes * 60 ? seconds - (minutes * 60)  : seconds
    minutes = minutes > hours * 60 ? minutes - (hours * 60)  : minutes

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}

const padTo2Digits = (numero: number): string =>  {
    return numero.toString().padStart(2, '0');
}