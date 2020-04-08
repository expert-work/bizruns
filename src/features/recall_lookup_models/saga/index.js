import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_RECALL_LOOKUP_MODELS,
    GET_CREATE_RECALL_LOOKUP_MODEL,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_RECALL_LOOKUP_MODEL,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_RECALL_LOOKUP_MODEL,
    EDIT_RECALL_LOOKUP_MODEL,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP_MODEL,
    CHANGE_RECALL_LOOKUP_MODEL_STATUS,
    // Endpoint Api URL
    GET_RECALL_LOOKUP_MODELS_URL,
    GET_CREATE_RECALL_LOOKUP_MODEL_URL,
    GET_EDIT_RECALL_LOOKUP_MODEL_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_RECALL_LOOKUP_MODEL_URL,
    EDIT_RECALL_LOOKUP_MODEL_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_RECALL_LOOKUP_MODEL_URL,
    CHANGE_RECALL_LOOKUP_MODEL_STATUS_URL,
} from '../constants';
import {
    recall_lookup_modelTriggerSpinner,
    setRecall_lookup_models,
    setItems,
    setRecall_lookup_modelItems,
    removeRecall_lookup_modelItem,
    removeRecall_lookup_modelItems,
    setRecall_lookup_model,
    removeFromRecall_lookup_models
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getRecall_lookup_models(payloadData) {
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

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelsLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_RECALL_LOOKUP_MODELS_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setRecall_lookup_models({ recall_lookup_models: response.recall_lookup_models.data, fresh }));
         onMeta && onMeta(response.recall_lookup_models);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelsLoading: false }));
    }
}

function* getCreateRecall_lookup_model(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ initRecall_lookup_modelLoading: true }));

    try {


        const options = {
            path: GET_CREATE_RECALL_LOOKUP_MODEL_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup_model(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ initRecall_lookup_modelLoading: false }));
    }
}

function* getEditRecall_lookup_model(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ initRecall_lookup_modelLoading: true }));

    try {

        const options = {
            path: GET_EDIT_RECALL_LOOKUP_MODEL_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup_model(response));

        yield put(removeRecall_lookup_modelItems());

        yield put(setRecall_lookup_modelItems({ recall_lookup_modelItem: response.recall_lookup_model.items }));

        onResult && onResult(response.recall_lookup_model);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ initRecall_lookup_modelLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ createRecall_lookup_modelItemLoading: true }));

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

        const recall_lookup_modelItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setRecall_lookup_modelItems({ recall_lookup_modelItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ createRecall_lookup_modelItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: true }));

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

        const recall_lookup_modelItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeRecall_lookup_modelItem({ id: recall_lookup_modelItem.id }));

        yield put(setRecall_lookup_modelItems({ recall_lookup_modelItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: false }));
    }
}

function* createRecall_lookup_model(payloadData) {
 
    const {
        payload: {
            recall_lookup_model,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: true }));

    try {

        const options = {
            path: CREATE_RECALL_LOOKUP_MODEL_URL(),
            body: recall_lookup_model,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeRecall_lookup_modelItems())

            yield put(setRecall_lookup_models({ recall_lookup_models: [response.recall_lookup_model], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: false }));
    }
}

function* detailRecall_lookup_model(payloadData) {
      const {
        payload: {
            recall_lookup_model,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: true }));

    try {

        const options = {
            path: EDIT_RECALL_LOOKUP_MODEL_URL(recall_lookup_model),
            body: recall_lookup_model
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromRecall_lookup_models({ id: recall_lookup_model.id }))

        yield put(setRecall_lookup_models({ recall_lookup_models: [response.recall_lookup_model], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: false }));
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

    yield put(recall_lookup_modelTriggerSpinner({ itemsLoading: true }));

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
        yield put(recall_lookup_modelTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeRecall_lookup_modelItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeRecall_lookup_modelItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: false }));
    }
}

function* removeRecall_lookup_model(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: true }));

    try {

        const options = {
            path: REMOVE_RECALL_LOOKUP_MODEL_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromRecall_lookup_models({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: false }));
    }
}

function* changeRecall_lookup_modelStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: true }));

    try {

        const options = {
            path: CHANGE_RECALL_LOOKUP_MODEL_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.RECALL_LOOKUP_MODEL_LIST)
            yield call(getRecall_lookup_models, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_modelTriggerSpinner({ recall_lookup_modelLoading: false }));
    }
}

export default function* recall_lookup_modelSaga() {
    yield takeEvery(GET_RECALL_LOOKUP_MODELS, getRecall_lookup_models);
    yield takeEvery(GET_CREATE_RECALL_LOOKUP_MODEL, getCreateRecall_lookup_model);
    yield takeEvery(GET_EDIT_RECALL_LOOKUP_MODEL, getEditRecall_lookup_model);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_RECALL_LOOKUP_MODEL, createRecall_lookup_model);
    yield takeEvery(EDIT_RECALL_LOOKUP_MODEL, detailRecall_lookup_model);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_RECALL_LOOKUP_MODEL_STATUS, changeRecall_lookup_modelStatus);
    yield takeEvery(REMOVE_RECALL_LOOKUP_MODEL, removeRecall_lookup_model);
}
