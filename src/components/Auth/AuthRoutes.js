import React, { useState, useEffect } from 'react';
import ForgotPassword from './ForgotPassword';
import isAuthenticated from '../../assets/js/auth'
import ResetPassword from './ResetPassword';
import Auth from './Auth';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

const AuthRoutes = () => {

    let { path, url } = useRouteMatch()
    const history = useHistory()
    const [userAuth, setUserAuth] = useState({})

    useEffect(() => {
        const checkAuthentication = async () => {
            setUserAuth(await isAuthenticated())
        }
        checkAuthentication()
    }, []);

    const renderAuth = () => {
        console.log(userAuth)
        if (Object.keys(userAuth) === 0) {
            return <div><h4>Loading...</h4></div>
        }
        else if (userAuth.authenticated) {
            if (userAuth.role === "freelancer") {
                history.push("/contractor")
            } else {
                history.push("/business")
            }
        } else {
            return (
                <>
                    <Route path={path} exact>
                        <Auth url={url} />
                    </Route>
                    <Route path={`${path}/forgot-password`} exact >
                        <ForgotPassword />
                    </Route>
                    <Route path={`${path}/reset-password`} exact >
                        <ResetPassword />
                    </Route>
                </>
            )
        }
    }

    return (
        <>
            {renderAuth()}
        </>
    );
}

export default AuthRoutes;