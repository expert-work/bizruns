import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_ESTIMATE_SEARCHS,
    GET_CREATE_ESTIMATE_SEARCH,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_ESTIMATE_SEARCH,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_ESTIMATE_SEARCH,
    EDIT_ESTIMATE_SEARCH,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH,
    CHANGE_ESTIMATE_SEARCH_STATUS,
    // Endpoint Api URL
    GET_ESTIMATE_SEARCHS_URL,
    GET_CREATE_ESTIMATE_SEARCH_URL,
    GET_EDIT_ESTIMATE_SEARCH_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_ESTIMATE_SEARCH_URL,
    EDIT_ESTIMATE_SEARCH_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_ESTIMATE_SEARCH_URL,
    CHANGE_ESTIMATE_SEARCH_STATUS_URL,
} from '../constants';
import {
    estimate_searchTriggerSpinner,
    setEstimate_searchs,
    setItems,
    setEstimate_searchItems,
    removeEstimate_searchItem,
    removeEstimate_searchItems,
    setEstimate_search,
    removeFromEstimate_searchs
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getEstimate_searchs(payloadData) {
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

    yield put(estimate_searchTriggerSpinner({ estimate_searchsLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_ESTIMATE_SEARCHS_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setEstimate_searchs({ estimate_searchs: response.estimate_searchs.data, fresh }));
         onMeta && onMeta(response.estimate_searchs);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchsLoading: false }));
    }
}

function* getCreateEstimate_search(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ initEstimate_searchLoading: true }));

    try {


        const options = {
            path: GET_CREATE_ESTIMATE_SEARCH_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ initEstimate_searchLoading: false }));
    }
}

function* getEditEstimate_search(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ initEstimate_searchLoading: true }));

    try {

        const options = {
            path: GET_EDIT_ESTIMATE_SEARCH_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search(response));

        yield put(removeEstimate_searchItems());

        yield put(setEstimate_searchItems({ estimate_searchItem: response.estimate_search.items }));

        onResult && onResult(response.estimate_search);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ initEstimate_searchLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ createEstimate_searchItemLoading: true }));

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

        const estimate_searchItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setEstimate_searchItems({ estimate_searchItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ createEstimate_searchItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: true }));

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

        const estimate_searchItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeEstimate_searchItem({ id: estimate_searchItem.id }));

        yield put(setEstimate_searchItems({ estimate_searchItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: false }));
    }
}

function* createEstimate_search(payloadData) {
 
    const {
        payload: {
            estimate_search,
            onResult,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: true }));

    try {

        const options = {
            path: CREATE_ESTIMATE_SEARCH_URL(),
            body: estimate_search,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeEstimate_searchItems())

            yield put(setEstimate_searchs({ estimate_searchs: [response.estimate_search], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: false }));
    }
}

function* detailEstimate_search(payloadData) {
      const {
        payload: {
            estimate_search,
            onResult,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: true }));

    try {

        const options = {
            path: EDIT_ESTIMATE_SEARCH_URL(estimate_search),
            body: estimate_search
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromEstimate_searchs({ id: estimate_search.id }))

        yield put(setEstimate_searchs({ estimate_searchs: [response.estimate_search], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: false }));
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

    yield put(estimate_searchTriggerSpinner({ itemsLoading: true }));

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
        yield put(estimate_searchTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeEstimate_searchItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimate_searchItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: false }));
    }
}

function* removeEstimate_search(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: true }));

    try {

        const options = {
            path: REMOVE_ESTIMATE_SEARCH_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromEstimate_searchs({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: false }));
    }
}

function* changeEstimate_searchStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: true }));

    try {

        const options = {
            path: CHANGE_ESTIMATE_SEARCH_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.ESTIMATE_SEARCH_LIST)
            yield call(getEstimate_searchs, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_searchTriggerSpinner({ estimate_searchLoading: false }));
    }
}

export default function* estimate_searchSaga() {
    yield takeEvery(GET_ESTIMATE_SEARCHS, getEstimate_searchs);
    yield takeEvery(GET_CREATE_ESTIMATE_SEARCH, getCreateEstimate_search);
    yield takeEvery(GET_EDIT_ESTIMATE_SEARCH, getEditEstimate_search);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_ESTIMATE_SEARCH, createEstimate_search);
    yield takeEvery(EDIT_ESTIMATE_SEARCH, detailEstimate_search);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_ESTIMATE_SEARCH_STATUS, changeEstimate_searchStatus);
    yield takeEvery(REMOVE_ESTIMATE_SEARCH, removeEstimate_search);
}
