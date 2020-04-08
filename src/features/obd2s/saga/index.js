import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_OBD2S,
    GET_CREATE_OBD2,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_OBD2,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_OBD2,
    EDIT_OBD2,
    CONVERT_TO_INVOICE,
    REMOVE_OBD2,
    CHANGE_OBD2_STATUS,
    // Endpoint Api URL
    GET_OBD2S_URL,
    GET_CREATE_OBD2_URL,
    GET_EDIT_OBD2_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_OBD2_URL,
    EDIT_OBD2_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_OBD2_URL,
    CHANGE_OBD2_STATUS_URL,
} from '../constants';
import {
    obd2TriggerSpinner,
    setObd2s,
    setItems,
    setObd2Items,
    removeObd2Item,
    removeObd2Items,
    setObd2,
    removeFromObd2s
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getObd2s(payloadData) {
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

    yield put(obd2TriggerSpinner({ obd2sLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_OBD2S_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setObd2s({ obd2s: response.obd2s.data, fresh }));
         onMeta && onMeta(response.obd2s);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(obd2TriggerSpinner({ obd2sLoading: false }));
    }
}

function* getCreateObd2(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(obd2TriggerSpinner({ initObd2Loading: true }));

    try {


        const options = {
            path: GET_CREATE_OBD2_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setObd2(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ initObd2Loading: false }));
    }
}

function* getEditObd2(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(obd2TriggerSpinner({ initObd2Loading: true }));

    try {

        const options = {
            path: GET_EDIT_OBD2_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setObd2(response));

        yield put(removeObd2Items());

        yield put(setObd2Items({ obd2Item: response.obd2.items }));

        onResult && onResult(response.obd2);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ initObd2Loading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ createObd2ItemLoading: true }));

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

        const obd2Item = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setObd2Items({ obd2Item }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ createObd2ItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ obd2Loading: true }));

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

        const obd2Item = [{
            ...response.item,
            ...item,
        }]

        yield put(removeObd2Item({ id: obd2Item.id }));

        yield put(setObd2Items({ obd2Item }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ obd2Loading: false }));
    }
}

function* createObd2(payloadData) {
 
    const {
        payload: {
            obd2,
            onResult,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ obd2Loading: true }));

    try {

        const options = {
            path: CREATE_OBD2_URL(),
            body: obd2,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeObd2Items())

            yield put(setObd2s({ obd2s: [response.obd2], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ obd2Loading: false }));
    }
}

function* detailObd2(payloadData) {
      const {
        payload: {
            obd2,
            onResult,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ obd2Loading: true }));

    try {

        const options = {
            path: EDIT_OBD2_URL(obd2),
            body: obd2
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromObd2s({ id: obd2.id }))

        yield put(setObd2s({ obd2s: [response.obd2], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ obd2Loading: false }));
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

    yield put(obd2TriggerSpinner({ itemsLoading: true }));

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
        yield put(obd2TriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeObd2Item({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ obd2Loading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeObd2Items())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ obd2Loading: false }));
    }
}

function* removeObd2(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ obd2Loading: true }));

    try {

        const options = {
            path: REMOVE_OBD2_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromObd2s({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ obd2Loading: false }));
    }
}

function* changeObd2Status(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(obd2TriggerSpinner({ obd2Loading: true }));

    try {

        const options = {
            path: CHANGE_OBD2_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.OBD2_LIST)
            yield call(getObd2s, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(obd2TriggerSpinner({ obd2Loading: false }));
    }
}

export default function* obd2Saga() {
    yield takeEvery(GET_OBD2S, getObd2s);
    yield takeEvery(GET_CREATE_OBD2, getCreateObd2);
    yield takeEvery(GET_EDIT_OBD2, getEditObd2);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_OBD2, createObd2);
    yield takeEvery(EDIT_OBD2, detailObd2);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_OBD2_STATUS, changeObd2Status);
    yield takeEvery(REMOVE_OBD2, removeObd2);
}
