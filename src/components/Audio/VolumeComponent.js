import { Slider } from '@material-ui/core'
import { VolumeDown, VolumeUp } from '@material-ui/icons'
import React from 'react'
import { CSSTransition } from 'react-transition-group'

export default function VolumeComponent({changeState, value}) {
    

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="Chat-load"
            unmountOnExit
        >
            <div className="volumecontrol">
                <Slider aria-label="Volume" orientation="vertical" value={value} onChange={(e, newValue) => changeState(newValue)} style={{ height: "20vh" }} color="secondary" />
                {value < 20 ? <VolumeDown color="secondary" style={{ marginTop: "5px "}} /> : <VolumeUp color="secondary" style={{ marginTop: "5px "}} />}
            </div>
        </CSSTransition>
    )
}
