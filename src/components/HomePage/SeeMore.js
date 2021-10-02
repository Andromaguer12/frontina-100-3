import { IconButton } from '@material-ui/core'
import { Clear, Facebook, Instagram, Public, Telegram, Twitter } from '@material-ui/icons'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function SeeMore({links}) {
    const [open, setopen] = useState(false)
    return (
        <div className="seeMoreDiv">
            <CSSTransition
                in={open}
                timeout={1000}
                classNames="Chat-Load"
                unmountOnExit
            >
                    <div>
                    <IconButton href={links.facebook}  color="primary" size="small" style={{ margin: "5px"}}>
                        <Facebook />
                    </IconButton>
                    <IconButton href={links.instagram} color="primary" size="small" style={{ margin: "5px"}}>
                        <Instagram />
                    </IconButton>
                    <IconButton href={links.twitter} color="primary" size="small" style={{ margin: "5px"}}>
                        <Twitter />
                    </IconButton>
                    <IconButton href={links.telegram} color="primary" size="small" style={{ margin: "5px"}}>
                        <Telegram />
                    </IconButton>
                    <IconButton color="secondary" size="small" onClick={() => setopen(!open)} style={{ margin: "5px"}}>
                        <Clear />
                    </IconButton>
                    </div>
            </CSSTransition>
            <CSSTransition
                in={!open}
                timeout={1000}
                classNames="Chat-Load"
                unmountOnExit
            >
                <IconButton color="primary" size="small" onClick={() => setopen(!open)}>
                    <Public />    
                </IconButton>
            </CSSTransition>
        </div>
    )
}
