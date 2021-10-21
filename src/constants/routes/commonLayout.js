
import React, { useEffect, useState } from 'react'

export default function CommonLayout({Component, props}) {
    
    return (
        <div style={{ width: "100%", height: "100vh"}}>
            <Component {...props} />
        </div>
    )
}
