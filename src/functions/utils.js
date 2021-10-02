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

export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
        date: `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`,
        hour: `${date.getHours() > 12 ? date.getHours()-12 : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`
    }
}