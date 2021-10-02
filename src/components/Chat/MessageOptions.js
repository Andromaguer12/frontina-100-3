import React, { useEffect } from 'react'
import { Typography, Popper, List, ListItem, ListItemText, ListItemIcon, makeStyles } from '@material-ui/core'
import { ReplyRounded } from '@material-ui/icons'
import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'
import { selectMsg } from '../../services/reduxToolkit/chatStates/actions'

const OptionsStyle = makeStyles({
    root: {
        background: "#ffffff",
        borderRadius: "5px",
        boxShadow: "2px 2px 5px #cccccc"
    }
})

export default function MessageOptions({toggleLayout, msgId}) {
    const styledOptions = OptionsStyle();
    const dispatch = useDispatch();
    const handleSelectMsg = () => {
        dispatch(selectMsg(msgId));
        toggleLayout();
    }

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={350}
            classNames="Message-Opt"
            unmountOnExit
        >
            <List classes={{ root: styledOptions.root }}>
                <ListItem button style={{ width: "100%", color: "#7a7a7a"}} onClick={handleSelectMsg}>
                    <ListItemText>Responder</ListItemText>
                    <ListItemIcon><ReplyRounded /></ListItemIcon>
                </ListItem>
            </List>
        </CSSTransition>
    )
}
