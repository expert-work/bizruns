import { all, takeEvery, select, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/src/constants';
import { NavigationActions } from 'react-navigation';
import auth from '../features/authentication/saga';
import invoices from '../features/invoices/saga';
import estimates from '../features/estimates/saga';
import customers from '../features/customers/saga';
import expenses from '../features/expenses/saga';
import payments from '../features/payments/saga';
import settings from '../features/settings/saga';
import dictionaries from '../features/dictionaries/saga';
import obd2s from '../features/obd2s/saga';
import recall_lookups from '../features/recall_lookups/saga';
import recall_lookup_makes from '../features/recall_lookup_makes/saga';
import recall_lookup_models from '../features/recall_lookup_models/saga';
import recall_lookup_components from '../features/recall_lookup_components/saga';

import more from '../features/more/saga';
import { ROUTES } from '../navigation/routes';
import { store } from '../store';
import moment from 'moment';

export default function* rootSaga() {
    yield takeEvery(REHYDRATE, function* boot() {
        const { routes } = yield select((state) => state.nav);
        const currentRoteBlock = routes[routes.length - 1];
        const currentRouteBlockName = currentRoteBlock.routeName;

        const reduxStore = store.getState();

        if (currentRouteBlockName !== ROUTES.AUTH) {
            yield put(NavigationActions.navigate({ routeName: ROUTES.MAIN_INVOICES }));
        } else {
            const { endpointApi, endpointURL } = reduxStore.global

            // if (!endpointApi || !endpointURL) {
            //     yield put(NavigationActions.navigate({ routeName: ROUTES.ENDPOINTS }));
            // }

        }

        yield all([
            auth(),
            invoices(),
            estimates(),
            customers(),
            more(),
            expenses(),
            payments(),
            settings(),
            dictionaries(),
            obd2s(),
            recall_lookup_components(),
            recall_lookup_models(),
            recall_lookup_makes(),
            recall_lookups()
        ]);
    });
}
