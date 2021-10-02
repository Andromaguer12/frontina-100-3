import { CircularProgress, IconButton, Typography } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import PostCard from './postCard'

export default function GlobalPosts({pRef, seeReviews, add, del, edit}) {
    const [Posts, setPosts] = useState([])
    const [PostSelected, setPostSelected] = useState(null)
    

    useEffect(() => {
        pRef.onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setPosts(docs)
        })
    }, [])
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
            <div style={{ padding: "20px", boxSizing: "border-box", width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "row wrap", marginBottom: "20px" }}>
                {Posts.length > 0 ?
                    Posts.map((post, i) => {
                        return <PostCard 
                            likes={post.likedBy}
                            comments={post.comments}
                            key={post.id}
                            id={post.id}
                            image={post.postImg}
                            text={post.text}
                            title={post.title}
                            creator={post.creator}
                            contentType={post.contentType}
                            index={PostSelected}
                            del={(key) => del(key)}
                            edit={(key) => {edit(key)}}
                            seeData={(data) => seeReviews(data)}
                            i={i}
                            select={(index) => setPostSelected(index)}
                        />
                    }) :  <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress color="secondary" />
                    </div>
                }
            </div>
        </div>
    )
}
