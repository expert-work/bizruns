import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_ESTIMATE_SEARCH_MODELS,
    GET_CREATE_ESTIMATE_SEARCH_MODEL,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_ESTIMATE_SEARCH_MODEL,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_ESTIMATE_SEARCH_MODEL,
    EDIT_ESTIMATE_SEARCH_MODEL,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH_MODEL,
    CHANGE_ESTIMATE_SEARCH_MODEL_STATUS,
    // Endpoint Api URL
    GET_ESTIMATE_SEARCH_MODELS_URL,
    GET_CREATE_ESTIMATE_SEARCH_MODEL_URL,
    GET_EDIT_ESTIMATE_SEARCH_MODEL_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_ESTIMATE_SEARCH_MODEL_URL,
    EDIT_ESTIMATE_SEARCH_MODEL_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_ESTIMATE_SEARCH_MODEL_URL,
    CHANGE_ESTIMATE_SEARCH_MODEL_STATUS_URL,
} from '../constants';
import {
    estimate_search_modelTriggerSpinner,
    setEstimate_search_models,
    setItems,
    setEstimate_search_modelItems,
    removeEstimate_search_modelItem,
    removeEstimate_search_modelItems,
    setEstimate_search_model,
    removeFromEstimate_search_models
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getEstimate_search_models(payloadData) {
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

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelsLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_ESTIMATE_SEARCH_MODELS_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setEstimate_search_models({ estimate_search_models: response.estimate_search_models.data, fresh }));
         onMeta && onMeta(response.estimate_search_models);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelsLoading: false }));
    }
}

function* getCreateEstimate_search_model(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ initEstimate_search_modelLoading: true }));

    try {


        const options = {
            path: GET_CREATE_ESTIMATE_SEARCH_MODEL_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search_model(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ initEstimate_search_modelLoading: false }));
    }
}

function* getEditEstimate_search_model(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ initEstimate_search_modelLoading: true }));

    try {

        const options = {
            path: GET_EDIT_ESTIMATE_SEARCH_MODEL_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate_search_model(response));

        yield put(removeEstimate_search_modelItems());

        yield put(setEstimate_search_modelItems({ estimate_search_modelItem: response.estimate_search_model.items }));

        onResult && onResult(response.estimate_search_model);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ initEstimate_search_modelLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ createEstimate_search_modelItemLoading: true }));

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

        const estimate_search_modelItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setEstimate_search_modelItems({ estimate_search_modelItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ createEstimate_search_modelItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: true }));

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

        const estimate_search_modelItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeEstimate_search_modelItem({ id: estimate_search_modelItem.id }));

        yield put(setEstimate_search_modelItems({ estimate_search_modelItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: false }));
    }
}

function* createEstimate_search_model(payloadData) {
 
    const {
        payload: {
            estimate_search_model,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: true }));

    try {

        const options = {
            path: CREATE_ESTIMATE_SEARCH_MODEL_URL(),
            body: estimate_search_model,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeEstimate_search_modelItems())

            yield put(setEstimate_search_models({ estimate_search_models: [response.estimate_search_model], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: false }));
    }
}

function* detailEstimate_search_model(payloadData) {
      const {
        payload: {
            estimate_search_model,
            onResult,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: true }));

    try {

        const options = {
            path: EDIT_ESTIMATE_SEARCH_MODEL_URL(estimate_search_model),
            body: estimate_search_model
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromEstimate_search_models({ id: estimate_search_model.id }))

        yield put(setEstimate_search_models({ estimate_search_models: [response.estimate_search_model], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: false }));
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

    yield put(estimate_search_modelTriggerSpinner({ itemsLoading: true }));

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
        yield put(estimate_search_modelTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeEstimate_search_modelItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimate_search_modelItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: false }));
    }
}

function* removeEstimate_search_model(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: true }));

    try {

        const options = {
            path: REMOVE_ESTIMATE_SEARCH_MODEL_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromEstimate_search_models({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: false }));
    }
}

function* changeEstimate_search_modelStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: true }));

    try {

        const options = {
            path: CHANGE_ESTIMATE_SEARCH_MODEL_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.ESTIMATE_SEARCH_MODEL_LIST)
            yield call(getEstimate_search_models, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimate_search_modelTriggerSpinner({ estimate_search_modelLoading: false }));
    }
}

export default function* estimate_search_modelSaga() {
    yield takeEvery(GET_ESTIMATE_SEARCH_MODELS, getEstimate_search_models);
    yield takeEvery(GET_CREATE_ESTIMATE_SEARCH_MODEL, getCreateEstimate_search_model);
    yield takeEvery(GET_EDIT_ESTIMATE_SEARCH_MODEL, getEditEstimate_search_model);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_ESTIMATE_SEARCH_MODEL, createEstimate_search_model);
    yield takeEvery(EDIT_ESTIMATE_SEARCH_MODEL, detailEstimate_search_model);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_ESTIMATE_SEARCH_MODEL_STATUS, changeEstimate_search_modelStatus);
    yield takeEvery(REMOVE_ESTIMATE_SEARCH_MODEL, removeEstimate_search_model);
}
