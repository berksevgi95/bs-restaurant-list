import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import RestaurantList from './views/RestaurantList/RestaurantList';
import RestaurantDetail from './views/RestaurantDetail/RestaurantDetail';

import './styles.css'

const App = () => {

    console.log(process.env.NODE_ENV)

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/restaurants" />
                </Route>
                <Route exact path="/restaurants">
                    <RestaurantList />
                </Route>
                <Route path="/restaurants/:id">
                    <RestaurantDetail />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
