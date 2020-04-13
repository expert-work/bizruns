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
import estimate_searchs from '../features/estimate_searchs/reducers';
import estimate_search_makes from '../features/estimate_search_makes/reducers';
import estimate_search_models from '../features/estimate_search_models/reducers';
import estimate_search_repairs from '../features/estimate_search_repairs/reducers';


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
    estimate_searchs,
    expenses,
    payments,
    estimate_search_makes,
    estimate_search_models,
    estimate_search_repairs,
    navigationData,
    form: formReducer,
    global,
    settings,
    nav: createNavigationReducer(Navigator),
});
