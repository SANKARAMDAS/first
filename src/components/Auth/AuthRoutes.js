import React from 'react';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Auth from './Auth';
import { Route, useRouteMatch } from 'react-router-dom';

const AuthRoutes = () => {

    let { path } = useRouteMatch()

    return (
        <>
            <Route path={path} exact>
                <Auth />
            </Route>
            <Route path={`${path}/forgot-password`} exact >
                <ForgotPassword />
            </Route>
            <Route path={`${path}/reset-password`} exact >
                <ResetPassword />
            </Route>
        </>
    );
}

export default AuthRoutes;