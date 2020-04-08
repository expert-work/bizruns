import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_RECALL_LOOKUPS,
    GET_CREATE_RECALL_LOOKUP,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_RECALL_LOOKUP,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_RECALL_LOOKUP,
    EDIT_RECALL_LOOKUP,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP,
    CHANGE_RECALL_LOOKUP_STATUS,
    // Endpoint Api URL
    GET_RECALL_LOOKUPS_URL,
    GET_CREATE_RECALL_LOOKUP_URL,
    GET_EDIT_RECALL_LOOKUP_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_RECALL_LOOKUP_URL,
    EDIT_RECALL_LOOKUP_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_RECALL_LOOKUP_URL,
    CHANGE_RECALL_LOOKUP_STATUS_URL,
} from '../constants';
import {
    recall_lookupTriggerSpinner,
    setRecall_lookups,
    setItems,
    setRecall_lookupItems,
    removeRecall_lookupItem,
    removeRecall_lookupItems,
    setRecall_lookup,
    removeFromRecall_lookups
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getRecall_lookups(payloadData) {
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

    yield put(recall_lookupTriggerSpinner({ recall_lookupsLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_RECALL_LOOKUPS_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setRecall_lookups({ recall_lookups: response.recall_lookups.data, fresh }));
         onMeta && onMeta(response.recall_lookups);

        onResult && onResult(true);

    } catch (error) {
       // Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupsLoading: false }));
    }
}

function* getCreateRecall_lookup(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ initRecall_lookupLoading: true }));

    try {


        const options = {
            path: GET_CREATE_RECALL_LOOKUP_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ initRecall_lookupLoading: false }));
    }
}

function* getEditRecall_lookup(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ initRecall_lookupLoading: true }));

    try {

        const options = {
            path: GET_EDIT_RECALL_LOOKUP_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup(response));

        yield put(removeRecall_lookupItems());

        yield put(setRecall_lookupItems({ recall_lookupItem: response.recall_lookup.items }));

        onResult && onResult(response.recall_lookup);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ initRecall_lookupLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ createRecall_lookupItemLoading: true }));

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

        const recall_lookupItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setRecall_lookupItems({ recall_lookupItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ createRecall_lookupItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: true }));

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

        const recall_lookupItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeRecall_lookupItem({ id: recall_lookupItem.id }));

        yield put(setRecall_lookupItems({ recall_lookupItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: false }));
    }
}

function* createRecall_lookup(payloadData) {
 
    const {
        payload: {
            recall_lookup,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: true }));

    try {

        const options = {
            path: CREATE_RECALL_LOOKUP_URL(),
            body: recall_lookup,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeRecall_lookupItems())

            yield put(setRecall_lookups({ recall_lookups: [response.recall_lookup], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: false }));
    }
}

function* detailRecall_lookup(payloadData) {
      const {
        payload: {
            recall_lookup,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: true }));

    try {

        const options = {
            path: EDIT_RECALL_LOOKUP_URL(recall_lookup),
            body: recall_lookup
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromRecall_lookups({ id: recall_lookup.id }))

        yield put(setRecall_lookups({ recall_lookups: [response.recall_lookup], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: false }));
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

    yield put(recall_lookupTriggerSpinner({ itemsLoading: true }));

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
        yield put(recall_lookupTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeRecall_lookupItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeRecall_lookupItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: false }));
    }
}

function* removeRecall_lookup(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: true }));

    try {

        const options = {
            path: REMOVE_RECALL_LOOKUP_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromRecall_lookups({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: false }));
    }
}

function* changeRecall_lookupStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: true }));

    try {

        const options = {
            path: CHANGE_RECALL_LOOKUP_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.RECALL_LOOKUP_LIST)
            yield call(getRecall_lookups, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookupTriggerSpinner({ recall_lookupLoading: false }));
    }
}

export default function* recall_lookupSaga() {
    yield takeEvery(GET_RECALL_LOOKUPS, getRecall_lookups);
    yield takeEvery(GET_CREATE_RECALL_LOOKUP, getCreateRecall_lookup);
    yield takeEvery(GET_EDIT_RECALL_LOOKUP, getEditRecall_lookup);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_RECALL_LOOKUP, createRecall_lookup);
    yield takeEvery(EDIT_RECALL_LOOKUP, detailRecall_lookup);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_RECALL_LOOKUP_STATUS, changeRecall_lookupStatus);
    yield takeEvery(REMOVE_RECALL_LOOKUP, removeRecall_lookup);
}
