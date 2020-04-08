import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_RECALL_LOOKUP_COMPONENTS,
    GET_CREATE_RECALL_LOOKUP_COMPONENT,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_RECALL_LOOKUP_COMPONENT,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_RECALL_LOOKUP_COMPONENT,
    EDIT_RECALL_LOOKUP_COMPONENT,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP_COMPONENT,
    CHANGE_RECALL_LOOKUP_COMPONENT_STATUS,
    // Endpoint Api URL
    GET_RECALL_LOOKUP_COMPONENTS_URL,
    GET_CREATE_RECALL_LOOKUP_COMPONENT_URL,
    GET_EDIT_RECALL_LOOKUP_COMPONENT_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_RECALL_LOOKUP_COMPONENT_URL,
    EDIT_RECALL_LOOKUP_COMPONENT_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_RECALL_LOOKUP_COMPONENT_URL,
    CHANGE_RECALL_LOOKUP_COMPONENT_STATUS_URL,
} from '../constants';
import {
    recall_lookup_componentTriggerSpinner,
    setRecall_lookup_components,
    setItems,
    setRecall_lookup_componentItems,
    removeRecall_lookup_componentItem,
    removeRecall_lookup_componentItems,
    setRecall_lookup_component,
    removeFromRecall_lookup_components
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getRecall_lookup_components(payloadData) {
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

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentsLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_RECALL_LOOKUP_COMPONENTS_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setRecall_lookup_components({ recall_lookup_components: response.recall_lookup_components.data, fresh }));
         onMeta && onMeta(response.recall_lookup_components);

        onResult && onResult(true);

    } catch (error) {
//        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentsLoading: false }));
    }
}

function* getCreateRecall_lookup_component(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ initRecall_lookup_componentLoading: true }));

    try {


        const options = {
            path: GET_CREATE_RECALL_LOOKUP_COMPONENT_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup_component(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ initRecall_lookup_componentLoading: false }));
    }
}

function* getEditRecall_lookup_component(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ initRecall_lookup_componentLoading: true }));

    try {

        const options = {
            path: GET_EDIT_RECALL_LOOKUP_COMPONENT_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setRecall_lookup_component(response));

        yield put(removeRecall_lookup_componentItems());

        yield put(setRecall_lookup_componentItems({ recall_lookup_componentItem: response.recall_lookup_component.items }));

        onResult && onResult(response.recall_lookup_component);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ initRecall_lookup_componentLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ createRecall_lookup_componentItemLoading: true }));

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

        const recall_lookup_componentItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setRecall_lookup_componentItems({ recall_lookup_componentItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ createRecall_lookup_componentItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: true }));

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

        const recall_lookup_componentItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeRecall_lookup_componentItem({ id: recall_lookup_componentItem.id }));

        yield put(setRecall_lookup_componentItems({ recall_lookup_componentItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: false }));
    }
}

function* createRecall_lookup_component(payloadData) {
 
    const {
        payload: {
            recall_lookup_component,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: true }));

    try {

        const options = {
            path: CREATE_RECALL_LOOKUP_COMPONENT_URL(),
            body: recall_lookup_component,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeRecall_lookup_componentItems())

            yield put(setRecall_lookup_components({ recall_lookup_components: [response.recall_lookup_component], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: false }));
    }
}

function* detailRecall_lookup_component(payloadData) {
      const {
        payload: {
            recall_lookup_component,
            onResult,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: true }));

    try {

        const options = {
            path: EDIT_RECALL_LOOKUP_COMPONENT_URL(recall_lookup_component),
            body: recall_lookup_component
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromRecall_lookup_components({ id: recall_lookup_component.id }))

        yield put(setRecall_lookup_components({ recall_lookup_components: [response.recall_lookup_component], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: false }));
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

    yield put(recall_lookup_componentTriggerSpinner({ itemsLoading: true }));

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
        yield put(recall_lookup_componentTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeRecall_lookup_componentItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeRecall_lookup_componentItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: false }));
    }
}

function* removeRecall_lookup_component(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: true }));

    try {

        const options = {
            path: REMOVE_RECALL_LOOKUP_COMPONENT_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromRecall_lookup_components({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: false }));
    }
}

function* changeRecall_lookup_componentStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: true }));

    try {

        const options = {
            path: CHANGE_RECALL_LOOKUP_COMPONENT_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.RECALL_LOOKUP_COMPONENT_LIST)
            yield call(getRecall_lookup_components, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(recall_lookup_componentTriggerSpinner({ recall_lookup_componentLoading: false }));
    }
}

export default function* recall_lookup_componentSaga() {
    yield takeEvery(GET_RECALL_LOOKUP_COMPONENTS, getRecall_lookup_components);
    yield takeEvery(GET_CREATE_RECALL_LOOKUP_COMPONENT, getCreateRecall_lookup_component);
    yield takeEvery(GET_EDIT_RECALL_LOOKUP_COMPONENT, getEditRecall_lookup_component);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_RECALL_LOOKUP_COMPONENT, createRecall_lookup_component);
    yield takeEvery(EDIT_RECALL_LOOKUP_COMPONENT, detailRecall_lookup_component);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_RECALL_LOOKUP_COMPONENT_STATUS, changeRecall_lookup_componentStatus);
    yield takeEvery(REMOVE_RECALL_LOOKUP_COMPONENT, removeRecall_lookup_component);
}
