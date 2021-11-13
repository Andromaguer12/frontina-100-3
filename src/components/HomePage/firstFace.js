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
                    <AutoPlaySwipeableViews interval={7500} index={NavigationIndex} onChangeIndex={(index) => setNavigationIndex(index)} enableMouseEvents style={{ width: "80%", height: "100%"}}>
                        {
                            data.map((card) => {
                                return <div key={card.id} style={{ width: "100%", padding: "10px 0", display: 'flex', flexFlow: "column", alignItems: "center", justifyContent: "center"}}>
                                        <div className="FFcard" style={{ backgroundImage: `url(${card.postImg})`, width: `${card.postImg.naturalWidth, () => console.log(card.postImg.naturalWidth)}`, height: `${card.postImg.naturalHeight}`}}>
                                            <div className="NewsTag">
                                                <Typography variant="h3" color="secondary">
                                                    {card.title}
                                                    <Typography color="primary" style={{ fontSize: "12.5px" }} >
                                                        {getDateFromTimestamp(card.timestamp).date}|{getDateFromTimestamp(card.timestamp).hour}
                                                    </Typography>
                                                </Typography>
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
                    <AutoPlaySwipeableViews interval={7500} index={NavigationIndex} onChangeIndex={(index) => setNavigationIndex(index)} enableMouseEvents style={{ width: "90%", boxSizing: "border-box", alignItems: "center"}}>
                        {
                            data.sort((prev, next) => {
                                return parseInt(prev.position) - parseInt(next.position)
                            }).map((card) => {
                                return <div key={card.id} style={{ width: "100%", display: 'flex', flexFlow: "column", alignItems: "center", justifyContent: "center"}}>
                                            <div className="FFcardResponsive">
                                                <img src={card.postImg} className="responsiveFFImage" style={{ borderRadius: "10px 10px 0 0"}} />
                                                <div className="NewsTag NTR">
                                                    <Typography variant="h6" color="secondary">
                                                        {card.title}
                                                        <Typography color="primary" style={{ fontSize: "12.5px" }} >
                                                            {getDateFromTimestamp(card.timestamp).date}|{getDateFromTimestamp(card.timestamp).hour}
                                                        </Typography>
                                                    </Typography>
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
