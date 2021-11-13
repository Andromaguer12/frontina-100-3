import { CircularProgress, Fab, IconButton, Popper, Typography } from '@material-ui/core'
import { PlayArrow, Clear, PauseOutlined, Radio, VolumeUp } from '@material-ui/icons'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import db, { rdb } from '../../services/firebase';
import VolumeComponent from './VolumeComponent';
import {findDateValue, getDateFromTimestamp, WeekDay} from "../../functions/utils" 

function AudioComponent({StreamID}) {
    const [Loading, setLoading] = useState(false)
    const [Programming, setProgramming] = useState([])
    const [Pause, setPause] = useState(false);
    const [Playing, setPlaying] = useState(false);
    const [Error, setError] = useState(false);
    const [canUp, setcanUp] = useState(true);
    const [Volume, setVolume] = useState(50)
    var Timer = 0;
    const [anchorEl, setanchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const streamRef = rdb.ref().child('/streamID');
    const audio = document.querySelector("#audioplayer");
    const [Program, setProgram] = useState(null)

    useEffect(() => {
        if(audio){
            audio.volume = Volume/100;
        }
    }, [Volume])

    // useEffect(() => {
    //     db.collection("Programacion").get().then((state) => {
    //         const docs = [];
    //         state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
    //         setProgramming(docs)
    //     })
    // }, [])

    useEffect(() => {
        if(Timer < 40) {
            setTimeout(() => {
                Timer++;
            }, 1000);
        }
    }, [Timer]) 

    useEffect(() => {
        if(!Pause) {
            const currentTime = new Date().getTime();
            const timestamp = getDateFromTimestamp(currentTime);
            if(timestamp.hour.length > 0) {
                const timeValue = findDateValue(timestamp.hour);
                const currentProgram = Programming.filter((doc) => {
                    return timeValue >= doc.time.from.value && timeValue < doc.time.once.value && WeekDay(doc.streamDay)
                 })
                setProgram(currentProgram[0]?.programName)
            }
        }
    })

    return (
        <div className="audioContainer">
            <audio hidden="hidden" id="audioplayer" src={StreamID.id} type="audio/mpeg" onPlaying={(e) => {setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => setError(!Error)} onLoad={() => setLoading(true)} onLoadedData={() => setLoading(false)} />
            <Fab onClick={() => {
                if(!Pause) {
                    audio.play();
                    setPause(true)
                }
                else{
                    audio.pause();
                    setPause(false)
                }
            }}>
                {!Pause ? <PlayArrow color="secondary" /> : <PauseOutlined color="secondary" />}
            </Fab>
            <div className="Tags">
                <div>
                    {Pause ? <Typography color="primary" style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {Playing ? "Reproduciendo ahora..." : "Buscando señal..." }
                    </Typography> : <Typography color="primary" style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Listo para reproducir.
                    </Typography>}
                    <Typography color="primary" style={{ fontSize: "12px"  }}>
                        Audio En Vivo
                        {/* {Boolean(Program) ? Program.substring(0, 30) : "Programa no registrado" } */}
                    </Typography>
                    <Typography color="primary" style={{ fontSize: "12px"  }}>
                        Radio Frontina 100.3 FM
                    </Typography>                    
                </div>
                <Popper open={open} style={{ zIndex: "120"}} anchorEl={anchorEl} placement="top">
                    <VolumeComponent changeState={(value) => setVolume(value)} value={Volume} />
                </Popper>
                    <IconButton color="primary" size="small" onClick={(e) => setanchorEl(open ? null : e.target)}>
                        <VolumeUp color="primary" />
                    </IconButton>
                {Playing && <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>}
                {Pause && !Playing && <CircularProgress size={20} style={{ margin: "5px"}} />}
            </div>
            {Timer >= 40 && <Typography color="primary" style={{ width: "80%", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "space-around" }}>
                Error ID Transmision invalido.
                <Clear color="primary" />
            </Typography>}
            
        </div>
    )
}

export default React.memo(AudioComponent)