import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

/**
 * Import all page components here
 */
import Carousel from './App.js';
import Home from './Home.js';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={Carousel}>
    <BrowserRouter component={Carousel} />
    <Route path="/Home" component={Home} />
  </Route>
);