import React from 'react';
import { Switch, Route } from "react-router-dom";
import Orders from '../views/Orders';
import Products from '../views/Products';
import Sales from '../views/Sales';

// import Store from "../views/Store";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/sales" exact component={Sales} />
        </Switch>
    );
}

export default Routes;