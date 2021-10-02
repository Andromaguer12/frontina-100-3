import React from 'react'

export default function commonLayout({Component, props}) {
    return (
        <div style={{ width: "100%", height: "100vh"}}>
            <Component {...props} />
        </div>
    )
}
