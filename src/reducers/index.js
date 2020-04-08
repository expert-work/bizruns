import { combineReducers } from "redux";
import auth from '../features/authentication/reducers';
import invoices from '../features/invoices/reducers';
import estimates from '../features/estimates/reducers';
import customers from '../features/customers/reducers';
import payments from '../features/payments/reducers';
import more from '../features/more/reducers';
import settings from '../features/settings/reducers';
import expenses from '../features/expenses/reducers';
import dictionaries from '../features/dictionaries/reducers';
import obd2s from '../features/obd2s/reducers';
import recall_lookups from '../features/recall_lookups/reducers';
import recall_lookup_makes from '../features/recall_lookup_makes/reducers';
import recall_lookup_models from '../features/recall_lookup_models/reducers';
import recall_lookup_components from '../features/recall_lookup_components/reducers';


import global from './global';
import navigationData from "../navigation/reducers";
import { reducer as formReducer } from 'redux-form';
import Navigator from "../navigation/navigators";
import { createNavigationReducer } from 'react-navigation-redux-helpers';


export default combineReducers({
    auth,
    invoices,
    estimates,
    customers,
    more,
    dictionaries,
    obd2s,
    recall_lookups,
    recall_lookup_makes,
    recall_lookup_models,
    recall_lookup_components,
    expenses,
    payments,
    navigationData,
    form: formReducer,
    global,
    settings,
    nav: createNavigationReducer(Navigator),
});
