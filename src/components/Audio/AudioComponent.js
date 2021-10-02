import { CircularProgress, Fab, IconButton, Popper, Typography } from '@material-ui/core'
import { PlayArrow, Clear, PauseOutlined, Radio, VolumeUp } from '@material-ui/icons'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { rdb } from '../../services/firebase';
import VolumeComponent from './VolumeComponent';

function AudioComponent({StreamID}) {
    const [Loading, setLoading] = useState(true);
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

    useEffect(() => {
        if(!Loading){
            audio.volume = Volume/100;
        }
    }, [Volume])

    return (
        <div className="audioContainer">
            <audio hidden="hidden" id="audioplayer"src={StreamID.id} type="audio/mpeg" onPlaying={() => {setPlaying(true); setError(false)}} onLoadedData={() => setLoading(false)} />
            <Fab onClick={() => {
                // streamRef.update({
                //     listeners: StreamID.listeners + 1
                // })
                if(!Pause) {
                    audio.play();
                    setPause(true)
                }
                else{
                    audio.pause();
                    setPause(false)
                }
            }} disabled={Loading ? true : false}>
                {!Pause ? <PlayArrow color="secondary" /> : <PauseOutlined color="secondary" />}
            </Fab>
            {!Loading && <div className="Tags">
                <div>
                    <Typography color="primary" style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {Pause ? `${Playing && !Error ? "Reproduciendo ahora..." : "Buscando Señal..."}` : "Listo para reproducir."}
                    </Typography>
                    {Playing && <Typography color="primary" style={{ fontSize: "12px"  }}>
                        Nombre cancion
                    </Typography>}
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
            </div>}
            {Loading && Timer < 40 && <Typography variant="h6" color="primary" style={{ width: "80%", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "space-around" }}>
                {Loading && <Radio color="primary" />}
                Cargando
                <CircularProgress size={20} style={{ margin: "5px"}} />
            </Typography>}
            {Timer >= 40 && <Typography color="primary" style={{ width: "80%", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "space-around" }}>
                {/* {Loading && <Radio color="primary" />} */}
                Error ID Transmision invalido.
                <Clear color="primary" />
            </Typography>}
            
        </div>
    )
}

export default React.memo(AudioComponent)