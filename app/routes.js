import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './containers/main/index';
import About from './components/About';

export default (
	<Switch>
		<Route exact path="/" component={Main} />
		<Route path="/about" component={About} />
	</Switch>
);
