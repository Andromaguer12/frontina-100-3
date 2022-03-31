import { CircularProgress, IconButton, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import { AddCircleOutline, ErrorOutline } from '@material-ui/icons'
import React, { Suspense, useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { removeAllAccents } from '../../functions/utils'
import { categories } from '../../pages/HomePage'
import Feed from '../HomePage/Feed'
import PostCard from './postCard'

export default function GlobalPosts({pRef, seeReviews, add, del, edit}) {
    const [Posts, setPosts] = useState([])
    const [PostSelected, setPostSelected] = useState(null)
    const [Timeout, setTimeoutCount] = useState(0)
    const [SearchingState, setSearchingState] = useState(null)
    const [tabsValue, setTabsValue] = useState(0)

    useEffect(() => {
        pRef.onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setPosts(docs)
        })
    }, [])
    useEffect(() => {
        if(Posts.length == 0 && Timeout < 10){
            setTimeout(() => {
                setTimeoutCount(Timeout+1);
            }, 1000);
        }
    }, [Timeout])

    const searchingFunction = (e) => {
        const searching = Posts.filter((post) => removeAllAccents(post.text).toLowerCase().includes(removeAllAccents(e.target.value).toLowerCase()))
        if(e.target.value === ""){
            setSearchingState(null)
        }
        else{
            setSearchingState(searching)
        }
    }

    return (
        <div style={{ background: "#e7e7e7", borderRadius: "20px", padding: "20px", boxSizing: "border-box", width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "column", marginBottom: "20px" }}>
            <Typography variant="h5" color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Publicaciones Globales
                <div>
                    <IconButton color="secondary" onClick={() => add()}>
                        <AddCircleOutline />
                    </IconButton>
                </div>
            </Typography>
            <div style={{ width: "100%", padding: "10px 0" }}>
                <Typography>
                    Puede buscar copiando la descripcion completa de la publicacion, o colocando palabras clave 
                </Typography>
                <Typography style={{ marginBottom: "20px"}}>
                    por cierto, recuerde siempre buscar entre todas las categorias.
                </Typography>
                <TextField style={{ width: "70%" }} onChange={(e) => searchingFunction(e)} variant="outlined" size='small'  color="secondary" label="Buscar" />                
            </div>
            <Tabs style={{ width: "100%", boxSizing: "border-box", marginBottom: "30px" }} variant="scrollable" value={tabsValue} onChange={(e, newValue) => setTabsValue(newValue)} textColor="secondary" indicatorColor="secondary" scrollButtons="auto" >
                {
                    categories.map((c, index) => (
                        <Tab label={c} value={index} />
                    ))
                }
            </Tabs>
            <div style={{ padding: "20px", boxSizing: "border-box", width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-around", flexFlow: "row wrap", marginBottom: "20px" }}>
                <SwipeableViews index={tabsValue} enableMouseEvents onChangeIndex={(value) => setTabsValue(value)}>
                    {
                        categories.map((cate, index) => {
                            return (
                                <Feed style={{ width: "100%", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-around" }} choosedContent={true} value={tabsValue} index={index}>
                                    {Posts.filter((post) => post.contentType === cate).length >= 1 ?
                                        
                                        
                                        <React.Fragment>
                                            {!SearchingState ? <React.Fragment>
                                                {Posts.filter((post) => post.contentType === cate).sort((p, n) => {
                                                    return p.timestamp - n.timestamp
                                                }).reverse().map((post, i) => {
                                                    return (
                                                            <Suspense fallback={<div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                                                <CircularProgress color="secondary" />
                                                            </div>}>
                                                                <PostCard 
                                                                    likes={post.likedBy}
                                                                    comments={post.comments}
                                                                    key={post.id}
                                                                    id={post.id}
                                                                    image={post.postImg}
                                                                    text={post.text}
                                                                    title={post.title}
                                                                    creator={post.creator}
                                                                    gpost={true}
                                                                    position={post.position}
                                                                    contentType={post.contentType}
                                                                    index={PostSelected}
                                                                    del={(key) => del(key)}
                                                                    edit={(key) => {edit(key)}}
                                                                    seeData={(data) => seeReviews(data)}
                                                                    i={i}
                                                                    select={(index) => setPostSelected(index)}
                                                                />
                                                            </Suspense>
                                                    )
                                                })}
                                            </React.Fragment> : 
                                            <React.Fragment>
                                                {SearchingState.filter((post) => post.contentType === cate).sort((p, n) => {
                                                    return p.timestamp - n.timestamp
                                                }).reverse().map((post, i) => {
                                                    return (
                                                            <Suspense fallback={<div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                                                <CircularProgress color="secondary" />
                                                            </div>}>
                                                                <PostCard 
                                                                    likes={post.likedBy}
                                                                    comments={post.comments}
                                                                    key={post.id}
                                                                    id={post.id}
                                                                    image={post.postImg}
                                                                    text={post.text}
                                                                    title={post.title}
                                                                    creator={post.creator}
                                                                    gpost={true}
                                                                    position={post.position}
                                                                    contentType={post.contentType}
                                                                    index={PostSelected}
                                                                    del={(key) => del(key)}
                                                                    edit={(key) => {edit(key)}}
                                                                    seeData={(data) => seeReviews(data)}
                                                                    i={i}
                                                                    select={(index) => setPostSelected(index)}
                                                                />
                                                            </Suspense>
                                                    )
                                                })}
                                            </React.Fragment>
                                            
                                            }
                                        </React.Fragment>
                                        
                                        
                                        : <React.Fragment>
                                            {Posts.length == 0 && Timeout < 10 && <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                                <CircularProgress color="secondary" />
                                            </div>}
                                            {Timeout == 10 && Posts.length == 0 && <div style={{ color: "#7a7a7a", fontSize: "14px", width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }} align="right">
                                                <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                                                <Typography variant="h4" style={{ color: "#7a7a7a" }}> Sin Publicaciones! </Typography>
                                            </div>}
                                        </React.Fragment>
                                    }
                                </Feed>
                            )
                        })
                    }
                </SwipeableViews>
            </div>
        </div>
    )
}
