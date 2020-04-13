import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_ESTIMATE_SEARCH_REPAIRS,
    GET_CREATE_ESTIMATE_SEARCH_REPAIR,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_ESTIMATE_SEARCH_REPAIR,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_ESTIMATE_SEARCH_REPAIR,
    EDIT_ESTIMATE_SEARCH_REPAIR,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH_REPAIR,
    CHANGE_ESTIMATE_SEARCH_REPAIR_STATUS,
    // Endpoint Api URL
    GET_ESTIMATE_SEARCH_REPAIRS_URL,
    GET_CREATE_ESTIMATE_SEARCH_REPAIR_URL,
    GET_EDIT_ESTIMATE_SEARCH_REPAIR_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_ESTIMATE_SEARCH_REPAIR_URL,
    EDIT_ESTIMATE_SEARCH_REPAIR_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_ESTIMATE_SEARCH_REPAIR_URL,
    CHANGE_ESTIMATE_SEARCH_REPAIR_STATUS_URL,
} from '../constants';
import {
    estimate_search_repairTriggerSpinner,
    setEstimate_search_repairs,
    setItems,
    setEstimate_search_repairItems,
    removeEstimate_search_repairItem,
    removeEstimate_search_repairItems,
    setEstimate_search_repair,
    removeFromEstimate_search_repairs
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getEstimate_search_repairs(payloadData) {
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

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairsLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_ESTIMATE_SEARCH_REPAIRS_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setEstimate_search_repairs({ estimate_search_repairs: response.estimate_search_repairs.data, fresh }));
         onMeta && onMeta(response.estimate_search_repairs);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairsLoading: false }));
    }
}

function* getCreateEstimate_search_repair(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ initEstimate_search_repairLoading: true }));

    try {


        const options = {
            path: GET_CREATE_ESTIMATE_SEARCH_REPAIR_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search_repair(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ initEstimate_search_repairLoading: false }));
    }
}

function* getEditEstimate_search_repair(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ initEstimate_search_repairLoading: true }));

    try {

        const options = {
            path: GET_EDIT_ESTIMATE_SEARCH_REPAIR_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search_repair(response));

        yield put(removeEstimate_search_repairItems());

        yield put(setEstimate_search_repairItems({ estimate_search_repairItem: response.estimate_search_repair.items }));

        onResult && onResult(response.estimate_search_repair);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ initEstimate_search_repairLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ createEstimate_search_repairItemLoading: true }));

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

        const estimate_search_repairItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setEstimate_search_repairItems({ estimate_search_repairItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ createEstimate_search_repairItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: true }));

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

        const estimate_search_repairItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeEstimate_search_repairItem({ id: estimate_search_repairItem.id }));

        yield put(setEstimate_search_repairItems({ estimate_search_repairItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: false }));
    }
}

function* createEstimate_search_repair(payloadData) {
 
    const {
        payload: {
            estimate_search_repair,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: true }));

    try {

        const options = {
            path: CREATE_ESTIMATE_SEARCH_REPAIR_URL(),
            body: estimate_search_repair,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeEstimate_search_repairItems())

            yield put(setEstimate_search_repairs({ estimate_search_repairs: [response.estimate_search_repair], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: false }));
    }
}

function* detailEstimate_search_repair(payloadData) {
      const {
        payload: {
            estimate_search_repair,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: true }));

    try {

        const options = {
            path: EDIT_ESTIMATE_SEARCH_REPAIR_URL(estimate_search_repair),
            body: estimate_search_repair
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromEstimate_search_repairs({ id: estimate_search_repair.id }))

        yield put(setEstimate_search_repairs({ estimate_search_repairs: [response.estimate_search_repair], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: false }));
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

    yield put(estimate_search_repairTriggerSpinner({ itemsLoading: true }));

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
        yield put(estimate_search_repairTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeEstimate_search_repairItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimate_search_repairItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: false }));
    }
}

function* removeEstimate_search_repair(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: true }));

    try {

        const options = {
            path: REMOVE_ESTIMATE_SEARCH_REPAIR_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromEstimate_search_repairs({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: false }));
    }
}

function* changeEstimate_search_repairStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: true }));

    try {

        const options = {
            path: CHANGE_ESTIMATE_SEARCH_REPAIR_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.ESTIMATE_SEARCH_REPAIR_LIST)
            yield call(getEstimate_search_repairs, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_repairTriggerSpinner({ estimate_search_repairLoading: false }));
    }
}

export default function* estimate_search_repairSaga() {
    yield takeEvery(GET_ESTIMATE_SEARCH_REPAIRS, getEstimate_search_repairs);
    yield takeEvery(GET_CREATE_ESTIMATE_SEARCH_REPAIR, getCreateEstimate_search_repair);
    yield takeEvery(GET_EDIT_ESTIMATE_SEARCH_REPAIR, getEditEstimate_search_repair);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_ESTIMATE_SEARCH_REPAIR, createEstimate_search_repair);
    yield takeEvery(EDIT_ESTIMATE_SEARCH_REPAIR, detailEstimate_search_repair);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_ESTIMATE_SEARCH_REPAIR_STATUS, changeEstimate_search_repairStatus);
    yield takeEvery(REMOVE_ESTIMATE_SEARCH_REPAIR, removeEstimate_search_repair);
}
