import { CircularProgress, IconButton, Typography } from '@material-ui/core'
import { AddCircleOutline, Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import PostCard from './postCard'

export default function AdminFirstFace({pRef, add, edit, del}) {
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
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "column", marginBottom: "20px" }}>
            <Typography variant="h5" color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Publicaciones de Primera plana
                <div>
                    <IconButton color="secondary" onClick={() => add()}>
                        <AddCircleOutline />
                    </IconButton>
                </div>
            </Typography>
            <div className="postfirstfacecontainer">
                {Posts.length > 0 ? 
                    Posts.map((post, i) => {
                        return <PostCard 
                            key={post.id}
                            id={post.id}
                            image={post.postImg}
                            text={post.text}
                            title={post.title}
                            creator={post.creator}
                            contentType={post.contentType}
                            index={PostSelected}
                            del={(key) => del(key)}
                            edit={(key) => {edit(key); console.log(key)}}
                            i={i}
                            select={(index) => setPostSelected(index)}
                        />
                    }) :  <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress color="secondary" />
                    </div>
                }
            </div>
            <Typography style={{ width: "100%", marginTop: "10px", display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Shift y rueda del raton para desplazar!
            </Typography>
        </div>
    )
}
