import * as React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

interface PrivateRouteProps<P={}>{
    component: React.FC<RouteComponentProps<P>>;
    [key: string]: any;

}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem("token") ? <Component {...props}/> : <Redirect to="/"/>
            }
        />
    );
};
export default PrivateRoute;