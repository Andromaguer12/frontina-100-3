import { days } from "../components/Admin/AddProgrammingRow";

export const handleINPUTS = e => {
    var diasem = parseInt(document.getElementsByName('diasemana')[0].value);
    var diafec = parseInt(document.getElementsByName('diafecha')[0].value);
    var mesman = parseInt(document.getElementsByName('mes')[0].value);
    var formaño = document.getElementById("Selcaño").value;
    
    var semana = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"];
    var meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    //variables finales

    var diasemanafinal = semana[diasem];
    var mesfinal = meses[mesman];

    //VAR FECHA FINAL
    if(formaño != ""){
        

        var fechaActual = `${diasemanafinal}, ${diafec}/${mesfinal}/${formaño}`

       this.setState({
           fechamanual: fechaActual
       })
    }
}

export const WeekDay = (weekday) => {
    var validation = false;
    weekday.forEach((w) => {
        days.indexOf(w) == new Date().getDay() ? validation = true : validation = false  
    })
    if(validation){
        return true
    }
    else return false
}


export const removeAllAccents = (string) => {
    var lettersA = ['á', 'é', 'í', 'ó', 'ú']
    var letters = ['a', 'e', 'i', 'o', 'u']
    var newString = string
    letters.forEach((letter, index) => {
        newString = newString.replace(lettersA[index], letter)
    })
    return newString
}

export const findDateValue = (time) => {
    const state = {
        hour: time.substring(0, 2),
        minutes: parseInt(time.substring(3, 5))
    }
    const dayTime = time.substring(5, 7)
    var currentValue = 0;
    if (state.hour === "06" && dayTime == "am") currentValue += 600; 
    if (state.hour === "07" && dayTime == "am") currentValue += 700;
    if (state.hour === "08" && dayTime == "am") currentValue += 800;
    if (state.hour === "09" && dayTime == "am") currentValue += 900;
    if (state.hour === "10" && dayTime == "am") currentValue += 1000;
    if (state.hour === "11" && dayTime == "am") currentValue += 1100;
    if (state.hour === "12" && dayTime == "am") currentValue += 1200;
    if (state.hour === "01" && dayTime == "pm") currentValue += 1300;
    if (state.hour === "02" && dayTime == "pm") currentValue += 1400;
    if (state.hour === "03" && dayTime == "pm") currentValue += 1500;
    if (state.hour === "04" && dayTime == "pm") currentValue += 1600;
    if (state.hour === "05" && dayTime == "pm") currentValue += 1700;
    if (state.hour === "06" && dayTime == "pm") currentValue += 1800;
    if (state.hour === "07" && dayTime == "pm") currentValue += 1900;
    if (state.hour === "08" && dayTime == "pm") currentValue += 2000;
    if (state.hour === "09" && dayTime == "pm") currentValue += 2100;
    if (state.hour === "10" && dayTime == "pm") currentValue += 2200;
    if (state.hour === "11" && dayTime == "pm") currentValue += 2300;
    if (state.hour === "12" && dayTime == "pm") currentValue += 2400;
    currentValue+=state.minutes;
    return currentValue
}

export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
        date: `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`,
        hour: `${date.getHours() > 12 ? `0${date.getHours()-12}` : `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`
    }
}