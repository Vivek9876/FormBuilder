import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Forms from './features/forms/container/forms';
import Form from './features/form/container/form';
import { APP_URL } from './shared/utitlity/utility';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Suspense fallback={<div>Loading.....</div>}>
					<Switch>
						<Route exact path={APP_URL.home} component={Forms} />
						<Route exact path={`${APP_URL.form}/:id`} component={Form} />
						<Redirect exact from={APP_URL.root} to={APP_URL.home} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
