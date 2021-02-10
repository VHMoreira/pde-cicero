import React from 'react';
import { Switch, Route } from "react-router-dom";
import Orders from '../views/Orders';
import Products from '../views/Products';

// import Store from "../views/Store";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/orders" exact component={Orders} />
        </Switch>
    );
}

export default Routes;