import { IconButton, InputBase, Typography } from '@material-ui/core'
import { Chat, Clear, FilterListOutlined, Search } from '@material-ui/icons'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
// import ChatPopUp from '../Chat/ChatPopUp'
import AsideSearchPopper from './AsideSearchPopper'

export default function PostsAside({chatDinamic, postData, tabsF}) {
    const [InputSearch, setInputSearch] = useState("");
    const [SanchorEl, setSanchorEl] = useState(null)
    const openS = Boolean(SanchorEl);
    const handleSearch = (e) => {
        setInputSearch(e.target.value)
        if(e.target.value) setSanchorEl(e.target)
        else  setSanchorEl(null)
    }
    const handleCancelSearch = () => {
        document.getElementById("inputAside").value = "";
        setInputSearch("");
        setSanchorEl(null)
    }
    return (
        <div className="PostAside">
            <div className="SearchNew">
                <Typography variant="h4" style={{ width: "100%", padding: "5px 0", color: "#7a7a7a", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                    Busca algo!
                </Typography>
                <AsideSearchPopper cancel={handleCancelSearch} setTabs={(tab) => tabsF(tab)} open={openS} anchorEl={SanchorEl} search={InputSearch} data={postData} />
                <div className="inputSearch" style={{ background: "#e7e7e7", width: "100%", boxSizing: "border-box" }}>
                    <Search style={{ color: "#7a7a7a" }} />
                    <InputBase id="inputAside" placeholder="Noticias, Posts..." onChange={handleSearch} style={{ width: "100%", marginLeft: "10px", color: "#7a7a7a" }} />
                    {InputSearch.length > 0 && <IconButton size="small" onClick={handleCancelSearch}>
                        <Clear style={{ color: "#7a7a7a" }} />
                    </IconButton>}
                </div>
            </div>
            {/* <CSSTransition
                in={chatDinamic}
                timeout={1000}
                classNames="Chat-Load"
                unmountOnExit
            >
                <ChatPopUp fixed={chatDinamic} />
            </CSSTransition> */}
        </div>
    )
}
