import { IconButton, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import { Clear, WhatsApp, Twitter, Facebook, Telegram, FileCopy, Email } from '@material-ui/icons';

export default function ShareDiv({close, url, subject, postview}) {
    const [Copied, setCopied] = useState(false)
    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="Content-load"
        >
            <div className="ShareDiv" style={{ background: "#fff", boxShadow: "0px 0px 10px #0000007a", padding: "10px", borderRadius: "10px"}}>
                <Typography color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                    Compartir en...
                    {Copied && <p style={{ color: "green" }}>Copiado.</p>}
                    <IconButton onClick={close}>
                        <Clear />
                    </IconButton>
                </Typography>
                <div style={{ width: "100%", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton onClick={() => navigator.clipboard.writeText(`${window.location.origin}/post/${url}`).then(() => {
                        setCopied(true)
                        setTimeout(() => {
                            setCopied(false)
                        }, 3000);
                    })}>
                        <FileCopy />
                    </IconButton>
                    <WhatsappShareButton url={`${window.location.origin}/post/${url}`} title={`Publicacion de Frontina FM | ${subject.substring(50, 0)}`} onClick={close}>
                        <IconButton>
                            <WhatsApp />
                        </IconButton>
                    </WhatsappShareButton>
                    <TwitterShareButton url={`${window.location.origin}/post/${url}`} hashtags={["frontinafm"]} title={`Publicacion de Frontina FM | ${subject.substring(50, 0)}`} onClick={close}>
                        <IconButton>
                            <Twitter />
                        </IconButton>
                    </TwitterShareButton>
                    <FacebookShareButton url={`${window.location.origin}/post/${url}`} hashtag="frontinafm" onClick={close}>
                        <IconButton>
                            <Facebook />
                        </IconButton>
                    </FacebookShareButton>
                    <EmailShareButton url={`${window.location.origin}/post/${url}`} subject={`Publicacion de Frontina FM | ${subject.substring(50, 0)}`} body="Noticia compartida desde el sitio oficial de frontina FM 100.3" onClick={close}>
                        <IconButton>
                            <Email />
                        </IconButton>
                    </EmailShareButton>
                    <TelegramShareButton url={`${window.location.origin}/post/${url}`} title={`Publicacion de Frontina FM | ${subject.substring(50, 0)}`} onClick={close}>
                        <IconButton>
                            <Telegram />
                        </IconButton>
                    </TelegramShareButton>
                </div>
            </div>
        </CSSTransition>
    )
}
