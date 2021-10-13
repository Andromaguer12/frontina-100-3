import React, { useEffect, useState } from 'react'

export default function LoadingLazySpinner({style}) {
    const [Opacity, setOpacity] = useState(1)
    useEffect(() => {
        setTimeout(() => {
            if(Opacity == 1){
                setOpacity(0.5)
            }
            else {
                setOpacity(1)
            }
        }, 1000);
    }, [Opacity])
    return (
        <div style={{opacity: Opacity, ...style, transition: "all 1000ms ease"}}>
        </div>
    )
}
