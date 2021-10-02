import { IconButton, MenuItem, Popper, TextField, Typography } from '@material-ui/core'
import { ArrowDownward, Check, Clear } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'

const hours = [
    {
        hour: "06",
        value: 600
    },
    {
        hour: "07",
        value: 700
    },
    {
        hour: "08",
        value: 800
    },
    {
        hour: "09",
        value: 900
    },
    {
        hour: "10",
        value: 1000
    },
    {
        hour: "11",
        value: 1100
    },
    {
        hour: "12",
        value: 1200
    },
    {
        hour: "01",
        value: 1300
    },
    {
        hour: "02",
        value: 1400
    },
    {
        hour: "03",
        value: 1500
    },
    {
        hour: "04",
        value: 1600
    },
    {
        hour: "05",
        value: 1700
    },
    {
        hour: "06",
        value: 1800
    },
    {
        hour: "07",
        value: 1900
    },
    {
        hour: "08",
        value: 2000
    },
    {
        hour: "09",
        value: 2100
    },
    {
        hour: "10",
        value: 2200
    },
    {
        hour: "11",
        value: 2300
    },
    {
        hour: "12",
        value: 2400
    },
]
const hourst = [
    {
        hourt: "06",
        value: 600
    },
    {
        hourt: "07",
        value: 700
    },
    {
        hourt: "08",
        value: 800
    },
    {
        hourt: "09",
        value: 900
    },
    {
        hourt: "10",
        value: 1000
    },
    {
        hourt: "11",
        value: 1100
    },
    {
        hourt: "12",
        value: 1200
    },
    {
        hourt: "01",
        value: 1300
    },
    {
        hourt: "02",
        value: 1400
    },
    {
        hourt: "03",
        value: 1500
    },
    {
        hourt: "04",
        value: 1600
    },
    {
        hourt: "05",
        value: 1700
    },
    {
        hourt: "06",
        value: 1800
    },
    {
        hourt: "07",
        value: 1900
    },
    {
        hourt: "08",
        value: 2000
    },
    {
        hourt: "09",
        value: 2100
    },
    {
        hourt: "10",
        value: 2200
    },
    {
        hourt: "11",
        value: 2300
    },
    {
        hourt: "12",
        value: 2400
    },
]

const minutes = [
    {
        minute: "00",
        value: 0
    },
    {
        minute: "10",
        value: 10
    },
    {
        minute: "20",
        value: 20
    },
    {
        minute: "30",
        value: 30
    },
    {
        minute: "40",
        value: 40
    },
    {
        minute: "50",
        value: 50
    },
]
const minutest = [
    {
        minutet: "00",
        value: 0
    },
    {
        minutet: "10",
        value: 10
    },
    {
        minutet: "20",
        value: 20
    },
    {
        minutet: "30",
        value: 30
    },
    {
        minutet: "40",
        value: 40
    },
    {
        minutet: "50",
        value: 50
    },
]

export default function SelectFromOnce({open, anchorEl, close, handleChange}) {
    const [currentState, setcurrentState] = useState({
        time: "6:10am",
        value: 610
    })
    const [currentStatet, setcurrentStatet] = useState({
        time: "6:10am",
        value: 610
    })
    const [hour, sethour] = useState({
        hour: "06",
        value: 600
    })
    const [minute, setminutes] = useState({
        minute: "00",
        value: 0
    })
    const [hourt, sethourt] = useState({
        hourt: "06",
        value: 600
    })
    const [minutet, setminutest] = useState({
        minutet: "00",
        value: 0
    })
    useEffect(() => {
        const currentSelected = {
            time: `${hour.hour}:${minute.minute}${hour.value > 1200 ? "pm" : "am"}`,
            value: hour.value+minute.value
        }
        setcurrentState(currentSelected)
    }, [hour, minute])
    useEffect(() => {
        var currentSelected = {
            time: `${hourt.hour}:${minutet.minutet}${hourt.value > 1200 ? "pm" : "am"}`,
            value: hourt.value+minutet.value
        }
        setcurrentStatet(currentSelected)
    }, [hourt, minutet])


    const handleSave = () => {
        handleChange({
            target: {
                name: "time",
                value: {
                    from: currentState,
                    once: currentStatet
                }
            }
        })
        close();
    }
    return (
        <Popper open={open} anchorEl={anchorEl} placement="top" style={{ zIndex: "100"}}>
            <div className="selectTime">
                <div style={{ width: "100%", display: "flex", flexFlow: "row", alignItems: "center"}}>
                    <TextField style={{ width: "40%", margin: "0 10px"}} select name="hour" size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Hora" value={hour} onChange={(e) => sethour(e.target.value)} fullWidth>
                        {hours.map((hour) => <MenuItem value={hour}>{hour.hour}</MenuItem>)}
                    </TextField>
                    <TextField select name="minute" style={{ width: "40%", margin: "0 10px"}} size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Minutos" value={minute} onChange={(e) => setminutes(e.target.value)} fullWidth>
                        {minutes.map((minute) => <MenuItem value={minute}>{minute.minute}</MenuItem>)}
                    </TextField>
                    <Typography color="secondary" style={{ background: "#e7e7e7", borderRadius: '5px', padding: "5px"}}>{currentState.value > 1200 ? "pm" : "am"}</Typography>
                </div>
                <ArrowDownward color="secondary" style={{ margin: "10px"}} />
                <div style={{ width: "100%", display: "flex", flexFlow: "row", alignItems: "center"}}>
                    <TextField style={{ width: "40%", margin: "0 10px"}} select name="hour" size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Hora" value={hourt} onChange={(e) => sethourt(e.target.value)} fullWidth>
                        {hours.map((hour) => <MenuItem value={hour}>{hour.hour}</MenuItem>)}
                    </TextField>
                    <TextField select name="minute" style={{ width: "40%", margin: "0 10px"}} size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Minutos" value={minutet} onChange={(e) => setminutest(e.target.value)} fullWidth>
                        {minutest.map((minute) => <MenuItem value={minute}>{minute.minutet}</MenuItem>)}
                    </TextField>
                    <Typography color="secondary" style={{ background: "#e7e7e7", borderRadius: '5px', padding: "5px"}}>{currentStatet.value > 1200 ? "pm" : "am"}</Typography>
                </div>
                <div>
                    <IconButton color="secondary" onClick={close}> 
                        <Clear />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleSave}> 
                        <Check />
                    </IconButton>
                </div>
            </div>
        </Popper>
    )
}
