import React from 'react'

export default function NewsDots({length, index}) {
    return (
        <div className="dots">
            {
                length.map((obj, id) => {
                    return <div style={{ width: "20px", height: "20px", margin: "0 5px", borderRadius: "50%", background: `${index === id ? "#C93832" : "#7a7a7a" }`}}> 
                    </div>
                })
            }
        </div>
    )
}
