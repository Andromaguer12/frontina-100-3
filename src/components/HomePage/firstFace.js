import { Fab, Hidden, Typography } from '@material-ui/core'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import NewsDots from './NewsDots'
import { autoPlay } from 'react-swipeable-views-utils'
import '../../Styles/Posts.css'
import { getDateFromTimestamp } from '../../functions/utils'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function FirstFace({data}) {
    const [NavigationIndex, setNavigationIndex] = useState(0)
    return (
        <div style={{ width: "100%", height: "85vh", display: 'flex', flexFlow: "column", alignItems: "center", justifyContent: "space-around"}}>
            <div style={{ width: "100%", height: "85vh", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "space-around"}}>
                <Hidden xsDown>
                    <Fab onClick={() => setNavigationIndex(NavigationIndex == 0 ? 0 : NavigationIndex-1)}>
                        <ArrowBackIosOutlined color="secondary" />
                    </Fab>
                </Hidden>
                <Hidden smDown>
                    <AutoPlaySwipeableViews index={NavigationIndex} onChangeIndex={(index) => setNavigationIndex(index)} enableMouseEvents style={{ width: "80%", height: "100%"}}>
                        {
                            data.map((card) => {
                                return <div key={card.id} style={{ width: "100%", padding: "10px 0", display: 'flex', flexFlow: "column", alignItems: "center", justifyContent: "center"}}>
                                        <div className="FFcard" style={{ backgroundImage: `url(${card.postImg})`}}>
                                            <div className="FFdata">
                                                <div className="postHeader">
                                                    <img src={card.creator.img} className="userPostImg" style={{ width: "20%"}} />
                                                    <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                                                        <Typography style={{ fontSize: "14px", fontWeight: "bold", color: "#e7e7e7" }} >{card.creator.name} | {card.creator.email}</Typography>
                                                        <div style={{ display: "flex", flexFlow: "row", alignItems: "flex-start" }}>
                                                            {card.creator.skills.map(skill => <Typography style={{ fontSize: "12.5px", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{skill}</Typography>)}
                                                        </div>
                                                        <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(card.timestamp).date}|{getDateFromTimestamp(card.timestamp).hour}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="NewsTag">
                                                <Typography variant="h3" color="secondary">{card.title}</Typography>
                                                <Typography variant="h6" style={{ color: "#ffffff" }}>{card.text}</Typography>
                                                <Typography style={{ fontSize: "12.5px", width: "fit-content", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{card.contentType}</Typography>
                                            </div>
                                    </div>
                                </div>
                            })
                        }
                    </AutoPlaySwipeableViews>
                </Hidden>
                <Hidden smUp>
                    <AutoPlaySwipeableViews index={NavigationIndex} onChangeIndex={(index) => setNavigationIndex(index)} enableMouseEvents style={{ width: "90%", alignItems: "center"}}>
                        {
                            data.map((card) => {
                                return <div key={card.id} style={{ width: "100%", display: 'flex', flexFlow: "column", alignItems: "center", justifyContent: "center"}}>
                                            <div className="FFcardResponsive">
                                                <div className="FFdata">
                                                    <div className="postHeader">
                                                        <img src={card.creator.img} className="userPostImg" />
                                                        <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                                                            <Typography style={{ fontSize: "14px", fontWeight: "bold", color: "#e7e7e7" }} >{card.creator.name} | {card.creator.email}</Typography>
                                                            <div style={{ display: "flex", flexFlow: "row", alignItems: "flex-start" }}>
                                                                {card.creator.skills.map(skill => <Typography style={{ fontSize: "12.5px", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{skill}</Typography>)}
                                                            </div>
                                                            <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(card.timestamp).date}|{getDateFromTimestamp(card.timestamp).hour}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img src={card.postImg} className="responsiveFFImage" />
                                                <div className="NewsTag">
                                                    <Typography variant="h6" color="secondary">{card.title}</Typography>
                                                    <Typography color="primary">{card.text}</Typography>
                                                    <Typography style={{ fontSize: "12.5px", width: "fit-content", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{card.contentType}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                })
                        }
                    </AutoPlaySwipeableViews>
                </Hidden>
                <Hidden xsDown>
                    <Fab onClick={() => setNavigationIndex(NavigationIndex == data.length-1 ? data.length-1 : NavigationIndex+1)}>
                        <ArrowForwardIosOutlined color="secondary" />
                    </Fab>
                </Hidden>
            </div>
            <NewsDots length={data} index={NavigationIndex} />
        </div>
    )
}
