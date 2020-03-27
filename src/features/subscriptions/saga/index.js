import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '../../../api/request';
import {
    GET_SUBSCRIPTIONS,
    GET_CREATE_SUBSCRIPTION,
    CREATE_SUBSCRIPTION,
    GET_UNPAID_INVOICES,
    GET_EDIT_SUBSCRIPTION,
    EDIT_SUBSCRIPTION,
    REMOVE_SUBSCRIPTION,
    GET_SUBSCRIPTIONS_URL,
    // Endpoint Api URL
    GET_CREATE_SUBSCRIPTIONS_URL,
    CREATE_SUBSCRIPTION_URL,
    GET_UNPAID_INVOICES_URL,
    GET_EDIT_SUBSCRIPTION_URL,
    EDIT_SUBSCRIPTION_URL,
    REMOVE_SUBSCRIPTION_URL
} from '../constants';

import {
    subscriptionTriggerSpinner,
    setSubscriptions,
    setFilterSubscriptions,
} from '../actions';
import { ROUTES } from '../../../navigation/routes';



function* getSubscriptions(payloadData) {

    const {
        payload: {
            onResult = null,
            onMeta = null,
            fresh = true,
            params = null,
            filter = false,
            pagination: { page = 1, limit = 10 } = {},
        } = {},
    } = payloadData;

    yield put(subscriptionTriggerSpinner({ subscriptionsLoading: true }));

    try {

        let param = {
            ...params,
            page,
            limit
        }
        const options = {
            path: GET_SUBSCRIPTIONS_URL(param),
        };

        const response = yield call([Request, 'get'], options);

        if (!filter)
            yield put(setSubscriptions({ subscriptions: response.subscriptions.data, fresh }));
        else
            yield put(setFilterSubscriptions({ subscriptions: response.subscriptions.data, fresh }));

        onMeta && onMeta(response.subscriptions);

        onResult && onResult(true);
    } catch (error) {
        onResult && onResult(false);
    } finally {
        yield put(subscriptionTriggerSpinner({ subscriptionsLoading: false }));
    }
}

function* getCreateSubscription(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(subscriptionTriggerSpinner({ initSubscriptionLoading: true }));

    try {

        const options = {
            path: GET_CREATE_SUBSCRIPTIONS_URL(),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(subscriptionTriggerSpinner({ initSubscriptionLoading: false }));
    }
}


function* createSubscription(payloadData) {
    const {
        payload: { params, navigation, onResult, hasRecordSubscription },
    } = payloadData;
    yield put(subscriptionTriggerSpinner({ subscriptionLoading: true }));

    try {

        const options = {
            path: CREATE_SUBSCRIPTION_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {

            navigation.navigate(ROUTES.MAIN_SUBSCRIPTIONS)

            yield call(getSubscriptions, payload = {});
        } else {
            onResult && onResult(response.error)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(subscriptionTriggerSpinner({ subscriptionLoading: false }));
    }
}

function* getUnpaidInvoices(payloadData) {
    const {
        payload: { onResult, id },
    } = payloadData;

    yield put(subscriptionTriggerSpinner({ getUnpaidInvoicesLoading: true }));

    try {

        const options = {
            path: GET_UNPAID_INVOICES_URL(id),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.invoices);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(subscriptionTriggerSpinner({ getUnpaidInvoicesLoading: false }));
    }
}

function* getEditSubscription(payloadData) {
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(subscriptionTriggerSpinner({ initSubscriptionLoading: true }));

    try {

        const options = {
            path: GET_EDIT_SUBSCRIPTION_URL(id),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(subscriptionTriggerSpinner({ initSubscriptionLoading: false }));
    }
}


function* editSubscription(payloadData) {
    const {
        payload: { id, params, navigation },
    } = payloadData;


    yield put(subscriptionTriggerSpinner({ subscriptionLoading: true }));

    try {

        const options = {
            path: EDIT_SUBSCRIPTION_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        navigation.navigate(ROUTES.MAIN_SUBSCRIPTIONS)
        yield call(getSubscriptions, payload = {});

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(subscriptionTriggerSpinner({ subscriptionLoading: false }));
    }
}

function* removeSubscription(payloadData) {
    const {
        payload: { id, navigation },
    } = payloadData;

    yield put(subscriptionTriggerSpinner({ subscriptionLoading: true }));

    try {

        const options = {
            path: REMOVE_SUBSCRIPTION_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.MAIN_SUBSCRIPTIONS)
            yield call(getSubscriptions, payload = {});
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(subscriptionTriggerSpinner({ subscriptionLoading: false }));
    }
}

export default function* subscriptionsSaga() {
    yield takeEvery(GET_SUBSCRIPTIONS, getSubscriptions);
    yield takeEvery(GET_CREATE_SUBSCRIPTION, getCreateSubscription);
    yield takeEvery(CREATE_SUBSCRIPTION, createSubscription);
    yield takeEvery(GET_UNPAID_INVOICES, getUnpaidInvoices);
    yield takeEvery(GET_EDIT_SUBSCRIPTION, getEditSubscription);
    yield takeEvery(EDIT_SUBSCRIPTION, editSubscription);
    yield takeEvery(REMOVE_SUBSCRIPTION, removeSubscription);
}
