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
    var weekDay = ""
    switch (new Date().getDay()) {
        case 0:
            weekDay = "domingo"
            break;
        case 1:
            weekDay = "lunes"
            break;
        case 2:
            weekDay = "martes"
            break;
        case 3:
            weekDay = "miercoles"
            break;
        case 4:
            weekDay = "jueves"
            break;
        case 5:
            weekDay = "viernes"
            break;
        case 6:
            weekDay = "sabado"
            break;
        default:
            break;
    }
    if(weekday === weekDay){
        return true
    }
    else if(weekday === "lunes a viernes" || weekday === "fines de semana"){
        if(weekday === "lunes a viernes" && new Date().getDay() < 6 && new Date().getDay() > 0){
            return true
        }
        else{
            return false
        }
        if(weekday === "fines de semana" && new Date().getDay() == 6 || new Date().getDay() == 0){
            return true
        }
        else{
            return false
        }
    }
}

export const findDateValue = (time) => {
    const state = {
        hour: time.substring(0, 2),
        minutes: parseInt(time.substring(3, 5))
    }
    var currentValue = 0;
    switch (state.hour) {
        case "06":
            currentValue += 600;
            break;
        case "07":
            currentValue += 700;
            break;
        case "08":
            currentValue += 800;
            break;
        case "09":
            currentValue += 900;
            break;
        case "10":
            currentValue += 1000;
            break;
        case "11":
            currentValue += 1100;
            break;
        case "12":
            currentValue += 1200;
            break;
        case "01":
            currentValue += 1300;
            break;
        case "02":
            currentValue += 1400;
            break;
        case "03":
            currentValue += 1500;
            break;
        case "04":
            currentValue += 1600;
            break;
        case "05":
            currentValue += 1700;
            break;
        case "06":
            currentValue += 1800;
            break;
        case "07":
            currentValue += 1900;
            break;
        case "08":
            currentValue += 2000;
            break;
        case "09":
            currentValue += 2100;
            break;
        case "10":
            currentValue += 2200;
            break;
        case "11":
            currentValue += 2300;
            break;
        case "12":
            currentValue += 2400;
            break;
        default:
            break;
    }
    currentValue+=state.minutes;
    return currentValue
}

export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
        date: `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`,
        hour: `${date.getHours() > 12 ? date.getHours()-12 : `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`
    }
}