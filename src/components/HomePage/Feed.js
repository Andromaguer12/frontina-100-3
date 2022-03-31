import React from 'react'

export default function Feed({children, choosedContent, value, index, style}) {
    if(choosedContent){
        return <div style={style ? style : null}>
            {value === index && <React.Fragment>{children}</React.Fragment>}
        </div> 
    }
    return (
        <div className="FeedContainer">
            {children}
        </div>
    )
}
