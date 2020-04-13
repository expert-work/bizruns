import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_ESTIMATE_SEARCH_MAKES,
    GET_CREATE_ESTIMATE_SEARCH_MAKE,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_ESTIMATE_SEARCH_MAKE,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_ESTIMATE_SEARCH_MAKE,
    EDIT_ESTIMATE_SEARCH_MAKE,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH_MAKE,
    CHANGE_ESTIMATE_SEARCH_MAKE_STATUS,
    // Endpoint Api URL
    GET_ESTIMATE_SEARCH_MAKES_URL,
    GET_CREATE_ESTIMATE_SEARCH_MAKE_URL,
    GET_EDIT_ESTIMATE_SEARCH_MAKE_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_ESTIMATE_SEARCH_MAKE_URL,
    EDIT_ESTIMATE_SEARCH_MAKE_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_ESTIMATE_SEARCH_MAKE_URL,
    CHANGE_ESTIMATE_SEARCH_MAKE_STATUS_URL,
} from '../constants';
import {
    estimate_search_makeTriggerSpinner,
    setEstimate_search_makes,
    setItems,
    setEstimate_search_makeItems,
    removeEstimate_search_makeItem,
    removeEstimate_search_makeItems,
    setEstimate_search_make,
    removeFromEstimate_search_makes
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getEstimate_search_makes(payloadData) {
     const {
        payload: {
            onResult = null,
            fresh = true,
            type = '',
            onMeta = null,
            params = null,
            pagination: { page = 1, limit = 150 } = {},
        } = {},
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makesLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_ESTIMATE_SEARCH_MAKES_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setEstimate_search_makes({ estimate_search_makes: response.estimate_search_makes.data, fresh }));
         onMeta && onMeta(response.estimate_search_makes);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makesLoading: false }));
    }
}

function* getCreateEstimate_search_make(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ initEstimate_search_makeLoading: true }));

    try {


        const options = {
            path: GET_CREATE_ESTIMATE_SEARCH_MAKE_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search_make(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ initEstimate_search_makeLoading: false }));
    }
}

function* getEditEstimate_search_make(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ initEstimate_search_makeLoading: true }));

    try {

        const options = {
            path: GET_EDIT_ESTIMATE_SEARCH_MAKE_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search_make(response));

        yield put(removeEstimate_search_makeItems());

        yield put(setEstimate_search_makeItems({ estimate_search_makeItem: response.estimate_search_make.items }));

        onResult && onResult(response.estimate_search_make);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ initEstimate_search_makeLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ createEstimate_search_makeItemLoading: true }));

    try {

        const { price, name, description, taxes, unit } = item

        const options = {
            path: CREATE_ITEM_URL(),
            body: {
                name,
                description,
                price,
                taxes,
                unit,
            }
        };

        const response = yield call([Request, 'post'], options);

        const estimate_search_makeItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setEstimate_search_makeItems({ estimate_search_makeItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ createEstimate_search_makeItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: true }));

    try {

        const { price, name, description, item_id } = item

        const options = {
            path: EDIT_ITEM_URL(item_id),
            body: {
                name,
                description,
                price,
            }
        };

        const response = yield call([Request, 'put'], options);

        const estimate_search_makeItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeEstimate_search_makeItem({ id: estimate_search_makeItem.id }));

        yield put(setEstimate_search_makeItems({ estimate_search_makeItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: false }));
    }
}

function* createEstimate_search_make(payloadData) {
 
    const {
        payload: {
            estimate_search_make,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: true }));

    try {

        const options = {
            path: CREATE_ESTIMATE_SEARCH_MAKE_URL(),
            body: estimate_search_make,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeEstimate_search_makeItems())

            yield put(setEstimate_search_makes({ estimate_search_makes: [response.estimate_search_make], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: false }));
    }
}

function* detailEstimate_search_make(payloadData) {
      const {
        payload: {
            estimate_search_make,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: true }));

    try {

        const options = {
            path: EDIT_ESTIMATE_SEARCH_MAKE_URL(estimate_search_make),
            body: estimate_search_make
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromEstimate_search_makes({ id: estimate_search_make.id }))

        yield put(setEstimate_search_makes({ estimate_search_makes: [response.estimate_search_make], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: false }));
    }
}

function* getItems(payloadData) {
 
    const {
        payload: {
            onResult,
            fresh,
            onMeta,
            search = '',
            q = '',
            pagination: { page, limit },
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ itemsLoading: true }));

    try {

        const options = {
            path: GET_ITEMS_URL(q, search, page, limit),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setItems({ items: response.items.data, fresh }));

        onMeta && onMeta(response.items);

        onResult && onResult(response.items);
    } catch (error) {
        // console.log(error);
        onResult && onResult(response.items);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeEstimate_search_makeItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimate_search_makeItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: false }));
    }
}

function* removeEstimate_search_make(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: true }));

    try {

        const options = {
            path: REMOVE_ESTIMATE_SEARCH_MAKE_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromEstimate_search_makes({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: false }));
    }
}

function* changeEstimate_search_makeStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: true }));

    try {

        const options = {
            path: CHANGE_ESTIMATE_SEARCH_MAKE_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.ESTIMATE_SEARCH_MAKE_LIST)
            yield call(getEstimate_search_makes, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_makeTriggerSpinner({ estimate_search_makeLoading: false }));
    }
}

export default function* estimate_search_makeSaga() {
    yield takeEvery(GET_ESTIMATE_SEARCH_MAKES, getEstimate_search_makes);
    yield takeEvery(GET_CREATE_ESTIMATE_SEARCH_MAKE, getCreateEstimate_search_make);
    yield takeEvery(GET_EDIT_ESTIMATE_SEARCH_MAKE, getEditEstimate_search_make);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_ESTIMATE_SEARCH_MAKE, createEstimate_search_make);
    yield takeEvery(EDIT_ESTIMATE_SEARCH_MAKE, detailEstimate_search_make);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_ESTIMATE_SEARCH_MAKE_STATUS, changeEstimate_search_makeStatus);
    yield takeEvery(REMOVE_ESTIMATE_SEARCH_MAKE, removeEstimate_search_make);
}
