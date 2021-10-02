import { Button, IconButton, Typography } from '@material-ui/core'
import { Delete, Edit, RateReviewOutlined, ThumbUpOutlined } from '@material-ui/icons'
import React from 'react'

export default function PostCard({id, seeData, likes, comments, creator, image, text, title, contentType, index, i, select, edit, del}) {
    const handleSeeReviews = () => {
        seeData({
            in: true,
            likes: likes,
            comments: comments,
            postID: id
        })
    }
    return (
        <div className="postCard" onClick={() => select(i)} style={{ backgroundImage: `url(${image})`, backgroundBlendMode: `${index === i ? 'luminosity' : ""}`}}>
            {index === i && <div className="postData" style={{ flexFlow: "row"}}>
                <IconButton size="medium" color="primary" onClick={() => del({ id: id, image: image })}>
                    <Delete />
                </IconButton>
                <IconButton size="medium" color="primary" onClick={() => edit(id)}>
                    <Edit />
                </IconButton>
            </div>}
            {index === i && <div className="postData">
                {!comments && <Typography className="postTags" >Titulo: {title}</Typography>}
                <Typography className="postTags">Texto: {text}</Typography>
                <Typography className="postTags">Creador: {creator.name}</Typography>
                <Typography>Categoria: {contentType}</Typography>
                {comments && <div style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row"}}>
                    <ThumbUpOutlined />: <Typography>{likes.length}</Typography>
                    <RateReviewOutlined style={{ marginLeft: "10px"}} />: <Typography>{comments.length}</Typography>
                    <Button color="primary" variant="outlined" onClick={handleSeeReviews}>Ver Puntuaciones</Button>
                </div>}
            </div>}
            {index !== i && !comments && <div className="postData">
                <Typography className="postTags" >Titulo: {title}</Typography>
            </div>}
            {index !== i && comments && <div className="postData">
                <Typography className="postTags" >Descripcion: {text}</Typography>
                <div style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row"}}>
                    <ThumbUpOutlined />: <Typography>{likes.length}</Typography>
                </div>
            </div>}
        </div>
    )
}
