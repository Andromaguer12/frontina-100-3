import { CircularProgress } from '@material-ui/core'
import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoutes from './constants/routes/PrivateRoutes'
import { RoutesTemplate } from './constants/routes/RoutesTemplate'
import NotFound from './pages/NotFound'
import { useAdminUser } from './services/reduxToolkit/adminUserLogin/selectors';
import { useSelector } from 'react-redux';
import { rdb } from "./services/firebase"
import AudioComponent from './components/Audio/AudioComponent';

export default function AppIndex() {
  const user = useSelector(useAdminUser);
  const [StreamID, setStreamID] = useState({});
    const streamRef = rdb.ref().child('/streamID');
    
    useEffect(() => {
        streamRef.on("value", (id) => {
            setStreamID(id.val())
        })
    }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ width: "100%", height: "100vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}><CircularProgress color="secondary" /></div>}>
        <Switch>
            {
              RoutesTemplate.map(({routes, template, auth, secondaryAuth}) => {
                return routes.map((route) => (
                  <Route 
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                    render={(routedata) => {
                      return <PrivateRoutes 
                        route={routedata}
                        path={route.path}
                        template={template}
                        auth={auth}
                        altAuth={secondaryAuth}
                        component={route.component}
                        redirect={route.to}
                        userData={user}
                      />
                    }}
                  />
                ))
              })
            }
            <Route path="/" component={NotFound} />
        </Switch>
      </Suspense>
      <AudioComponent StreamID={StreamID} />
    </BrowserRouter>
  )
}

