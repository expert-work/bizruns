import { call, put, takeEvery } from 'redux-saga/effects';
import { View, Alert } from 'react-native';

import Request from '../../../api/request';
import {
    GET_DICTIONARIES,
    GET_CREATE_DICTIONARY,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_DICTIONARY,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_DICTIONARY,
    EDIT_DICTIONARY,
    CONVERT_TO_INVOICE,
    REMOVE_DICTIONARY,
    CHANGE_DICTIONARY_STATUS,
    // Endpoint Api URL
    GET_DICTIONARIES_URL,
    GET_CREATE_DICTIONARY_URL,
    GET_EDIT_DICTIONARY_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_DICTIONARY_URL,
    EDIT_DICTIONARY_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_DICTIONARY_URL,
    CHANGE_DICTIONARY_STATUS_URL,
} from '../constants';
import {
    dictionaryTriggerSpinner,
    setDictionaries,
    setItems,
    setDictionaryItems,
    removeDictionaryItem,
    removeDictionaryItems,
    setDictionary,
    removeFromDictionaries
} from '../actions';
import { store } from '../../../store';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


function* getDictionaries(payloadData) {
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

    yield put(dictionaryTriggerSpinner({ dictionariesLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_DICTIONARIES_URL(param),
        };

        console.log(options.path);

        const response = yield call([Request, 'get'], options);
                console.log('response');
                console.log(response);
                 console.log('responseend');

        yield put(setDictionaries({ dictionaries: response.dictionaries.data, fresh }));
         onMeta && onMeta(response.dictionaries);

        onResult && onResult(true);

    } catch (error) {
        Alert.alert('options.path');
        onResult && onResult(false);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionariesLoading: false }));
    }
}

function* getCreateDictionary(payloadData) {
 
    const {
        payload: { onResult },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ initDictionaryLoading: true }));

    try {


        const options = {
            path: GET_CREATE_DICTIONARY_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setDictionary(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ initDictionaryLoading: false }));
    }
}

function* getEditDictionary(payloadData) {
 
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ initDictionaryLoading: true }));

    try {

        const options = {
            path: GET_EDIT_DICTIONARY_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setDictionary(response));

        yield put(removeDictionaryItems());

        yield put(setDictionaryItems({ dictionaryItem: response.dictionary.items }));

        onResult && onResult(response.dictionary);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ initDictionaryLoading: false }));
    }
}

function* addItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ createDictionaryItemLoading: true }));

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

        const dictionaryItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setDictionaryItems({ dictionaryItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ createDictionaryItemLoading: false }));
    }
}

function* editItem(payloadData) {
 
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ dictionaryLoading: true }));

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

        const dictionaryItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeDictionaryItem({ id: dictionaryItem.id }));

        yield put(setDictionaryItems({ dictionaryItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionaryLoading: false }));
    }
}

function* createDictionary(payloadData) {
 
    const {
        payload: {
            dictionary,
            onResult,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ dictionaryLoading: true }));

    try {

        const options = {
            path: CREATE_DICTIONARY_URL(),
            body: dictionary,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeDictionaryItems())

            yield put(setDictionaries({ dictionaries: [response.dictionary], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionaryLoading: false }));
    }
}

function* detailDictionary(payloadData) {
      const {
        payload: {
            dictionary,
            onResult,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ dictionaryLoading: true }));

    try {

        const options = {
            path: EDIT_DICTIONARY_URL(dictionary),
            body: dictionary
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromDictionaries({ id: dictionary.id }))

        yield put(setDictionaries({ dictionaries: [response.dictionary], prepend: true }));

        onResult && onResult(response.url)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionaryLoading: false }));
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

    yield put(dictionaryTriggerSpinner({ itemsLoading: true }));

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
        yield put(dictionaryTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeDictionaryItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ dictionaryLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeDictionaryItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionaryLoading: false }));
    }
}

function* removeDictionary(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ dictionaryLoading: true }));

    try {

        const options = {
            path: REMOVE_DICTIONARY_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromDictionaries({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionaryLoading: false }));
    }
}

function* changeDictionaryStatus(payloadData) {
 
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(dictionaryTriggerSpinner({ dictionaryLoading: true }));

    try {

        const options = {
            path: CHANGE_DICTIONARY_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.DICTIONARY_LIST)
            yield call(getDictionaries, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(dictionaryTriggerSpinner({ dictionaryLoading: false }));
    }
}

export default function* dictionarySaga() {
    yield takeEvery(GET_DICTIONARIES, getDictionaries);
    yield takeEvery(GET_CREATE_DICTIONARY, getCreateDictionary);
    yield takeEvery(GET_EDIT_DICTIONARY, getEditDictionary);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_DICTIONARY, createDictionary);
    yield takeEvery(EDIT_DICTIONARY, detailDictionary);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_DICTIONARY_STATUS, changeDictionaryStatus);
    yield takeEvery(REMOVE_DICTIONARY, removeDictionary);
}
