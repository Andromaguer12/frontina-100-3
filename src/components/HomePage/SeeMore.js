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
                    <a href={links.facebook} target="blank">
                        <IconButton  color="primary" size="small" style={{ margin: "5px"}}>
                            <Facebook />
                        </IconButton>
                    </a>
                    <a href={links.instagram} target="blank">
                        <IconButton color="primary" size="small" style={{ margin: "5px"}}>
                            <Instagram />
                        </IconButton>
                    </a>
                    <a href={links.twitter} target="blank">
                        <IconButton color="primary" size="small" style={{ margin: "5px"}}>
                            <Twitter />
                        </IconButton>
                    </a>
                    <a href={links.telegram} target="blank">
                        <IconButton color="primary" size="small" style={{ margin: "5px"}}>
                            <Telegram />
                        </IconButton>
                    </a>
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
