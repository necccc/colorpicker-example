import './style';
import { Provider } from 'preact-redux';
import App from './components/app';

import { createStore } from 'redux';

import app from './reducers'

let store = createStore(app)

export default () => (
    <div id="outer">
        <Provider store={store}>
            <App />
        </Provider>
    </div>
);
