import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_RECALL_LOOKUP_MAKES,
    GET_CREATE_RECALL_LOOKUP_MAKE,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_RECALL_LOOKUP_MAKE,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_RECALL_LOOKUP_MAKE,
    EDIT_RECALL_LOOKUP_MAKE,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP_MAKE,
    CHANGE_RECALL_LOOKUP_MAKE_STATUS,
    // Endpoint Api URL
    GET_RECALL_LOOKUP_MAKES_URL,
    GET_CREATE_RECALL_LOOKUP_MAKE_URL,
    GET_EDIT_RECALL_LOOKUP_MAKE_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_RECALL_LOOKUP_MAKE_URL,
    EDIT_RECALL_LOOKUP_MAKE_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_RECALL_LOOKUP_MAKE_URL,
    CHANGE_RECALL_LOOKUP_MAKE_STATUS_URL,
} from '../constants';
import {
    recall_lookup_makeTriggerSpinner,
    setRecall_lookup_makes,
    setItems,
    setRecall_lookup_makeItems,
    removeRecall_lookup_makeItem,
    removeRecall_lookup_makeItems,
    setRecall_lookup_make,
    removeFromRecall_lookup_makes
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getRecall_lookup_makes(payloadData) {
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

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makesLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_RECALL_LOOKUP_MAKES_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setRecall_lookup_makes({ recall_lookup_makes: response.recall_lookup_makes.data, fresh }));
         onMeta && onMeta(response.recall_lookup_makes);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makesLoading: false }));
    }
}

function* getCreateRecall_lookup_make(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ initRecall_lookup_makeLoading: true }));

    try {


        const options = {
            path: GET_CREATE_RECALL_LOOKUP_MAKE_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup_make(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ initRecall_lookup_makeLoading: false }));
    }
}

function* getEditRecall_lookup_make(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ initRecall_lookup_makeLoading: true }));

    try {

        const options = {
            path: GET_EDIT_RECALL_LOOKUP_MAKE_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup_make(response));

        yield put(removeRecall_lookup_makeItems());

        yield put(setRecall_lookup_makeItems({ recall_lookup_makeItem: response.recall_lookup_make.items }));

        onResult && onResult(response.recall_lookup_make);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ initRecall_lookup_makeLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ createRecall_lookup_makeItemLoading: true }));

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

        const recall_lookup_makeItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setRecall_lookup_makeItems({ recall_lookup_makeItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ createRecall_lookup_makeItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: true }));

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

        const recall_lookup_makeItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeRecall_lookup_makeItem({ id: recall_lookup_makeItem.id }));

        yield put(setRecall_lookup_makeItems({ recall_lookup_makeItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: false }));
    }
}

function* createRecall_lookup_make(payloadData) {
 
    const {
        payload: {
            recall_lookup_make,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: true }));

    try {

        const options = {
            path: CREATE_RECALL_LOOKUP_MAKE_URL(),
            body: recall_lookup_make,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeRecall_lookup_makeItems())

            yield put(setRecall_lookup_makes({ recall_lookup_makes: [response.recall_lookup_make], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: false }));
    }
}

function* detailRecall_lookup_make(payloadData) {
      const {
        payload: {
            recall_lookup_make,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: true }));

    try {

        const options = {
            path: EDIT_RECALL_LOOKUP_MAKE_URL(recall_lookup_make),
            body: recall_lookup_make
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromRecall_lookup_makes({ id: recall_lookup_make.id }))

        yield put(setRecall_lookup_makes({ recall_lookup_makes: [response.recall_lookup_make], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: false }));
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

    yield put(recall_lookup_makeTriggerSpinner({ itemsLoading: true }));

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
        yield put(recall_lookup_makeTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeRecall_lookup_makeItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeRecall_lookup_makeItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: false }));
    }
}

function* removeRecall_lookup_make(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: true }));

    try {

        const options = {
            path: REMOVE_RECALL_LOOKUP_MAKE_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromRecall_lookup_makes({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: false }));
    }
}

function* changeRecall_lookup_makeStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: true }));

    try {

        const options = {
            path: CHANGE_RECALL_LOOKUP_MAKE_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.RECALL_LOOKUP_MAKE_LIST)
            yield call(getRecall_lookup_makes, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_makeTriggerSpinner({ recall_lookup_makeLoading: false }));
    }
}

export default function* recall_lookup_makeSaga() {
    yield takeEvery(GET_RECALL_LOOKUP_MAKES, getRecall_lookup_makes);
    yield takeEvery(GET_CREATE_RECALL_LOOKUP_MAKE, getCreateRecall_lookup_make);
    yield takeEvery(GET_EDIT_RECALL_LOOKUP_MAKE, getEditRecall_lookup_make);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_RECALL_LOOKUP_MAKE, createRecall_lookup_make);
    yield takeEvery(EDIT_RECALL_LOOKUP_MAKE, detailRecall_lookup_make);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_RECALL_LOOKUP_MAKE_STATUS, changeRecall_lookup_makeStatus);
    yield takeEvery(REMOVE_RECALL_LOOKUP_MAKE, removeRecall_lookup_make);
}
