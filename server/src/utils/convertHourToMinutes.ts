//Conversao de horas em minutos

export default function convertHourToMinutes(time: string){
    //formato de hora -> 8:00 8- hora 00 -minutos
    //split - divide o objeto em uma array
    //Pega tanto a hora como o minuto e transforma no tipo numerico, pois ele é uma string
    //posicao[0] - 8 / posicao[1] = 0
    //No caso hour= 8 e minutes=0
    //map(number) - transformando string em numero
    const [hour, minutes] = time.split(':').map(Number);
    //8*60= 480 minutos + 0 = 480minutos
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}