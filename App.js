import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import PlacesReducer from './store/places-reducer';

const rootReducer = combineReducers({
    places: PlacesReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
};

export default App;
