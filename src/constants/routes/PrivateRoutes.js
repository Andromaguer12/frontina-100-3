import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router'
import { setAdminUser } from '../../services/reduxToolkit/adminUserLogin/actions';
import { setCurrentUser } from '../../services/reduxToolkit/userWithGoogle/actions';
import { AllRoutes } from './AllRoutes';
    
//Admin Restrictions
const isPageAdmin = (auth, secondary) => auth === "admin" && secondary === "user";

//Public Restrictions
const isPublic = (auth, secondary) => auth === "user" && secondary === "any";

export default function PrivateRoutes({route, template, auth, altAuth, component, redirect, userData, ...props}) {
    const dispatch = useDispatch();
    const Layout = template;

    if(userData[1].blocked) {
        dispatch(setAdminUser([null, {
            blocked: true,
            email: null,
            auth: "user",
            secondaryAuth: "any"
        }, false]))
        dispatch(setCurrentUser([null, {
            blocked: true,
            email: null,
            auth: "user",
            secondaryAuth: "any"
        }, false]))
        return <Redirect to={AllRoutes.blocked} />
    }
    else{
        if(isPageAdmin(auth, altAuth) && isPageAdmin(userData[1].auth, userData[1].secondaryAuth) && !userData[1].blocked) 
            return <Layout Component={component} {...props} />

        if(isPublic(auth, altAuth) && isPublic(userData[1].auth, userData[1].secondaryAuth) && !userData[1].blocked) 
            return <Layout Component={component} {...props} />
    }

    


    return <Redirect to={redirect} />
}
