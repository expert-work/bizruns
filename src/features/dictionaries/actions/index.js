import {
    GET_DICTIONARIES,
    SET_DICTIONARIES,
    CLEAR_DICTIONARIES,
    GET_CREATE_DICTIONARY,
    SET_CREATE_DICTIONARY,
    DICTIONARIES_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_DICTIONARY_ITEMS,
    CREATE_DICTIONARY,
    EDIT_ITEM,
    SET_EDIT_DICTIONARY_ITEMS,
    REMOVE_ITEM,
    REMOVE_DICTIONARY_ITEM,
    GET_EDIT_DICTIONARY,
    SET_EDIT_DICTIONARY,
    EDIT_DICTIONARY,
    REMOVE_DICTIONARY_ITEMS,
    CLEAR_DICTIONARY,
    SET_DICTIONARY,
    CONVERT_TO_INVOICE,
    REMOVE_DICTIONARY,
    REMOVE_FROM_DICTIONARIES,
    CHANGE_DICTIONARY_STATUS,
} from "../constants";

export const getDictionaries = (payload = {}) => ({
    type: GET_DICTIONARIES,
    payload,
});

export const setDictionaries = (payload = {}) => ({
    type: SET_DICTIONARIES,
    payload,
});

export const clearDictionaries = (payload = {}) => ({
    type: CLEAR_DICTIONARIES,
    payload,
});

export const clearDictionary = (payload = {}) => ({
    type: CLEAR_DICTIONARY,
    payload,
});

export const getCreateDictionary = (payload = {}) => ({
    type: GET_CREATE_DICTIONARY,
    payload,
});

export const getEditDictionary = (payload = {}) => ({
    type: GET_EDIT_DICTIONARY,
    payload,
});

export const createDictionary = (payload = {}) => ({
    type: CREATE_DICTIONARY,
    payload,
});

export const detailDictionary = (payload = {}) => ({
    type: EDIT_DICTIONARY,
    payload,
});

export const setDictionary = (payload = {}) => ({
    type: SET_DICTIONARY,
    payload,
});

export const setEditDictionary = (payload = {}) => ({
    type: SET_EDIT_DICTIONARY,
    payload,
});

export const dictionaryTriggerSpinner = (payload) => ({
    type: DICTIONARIES_TRIGGER_SPINNER,
    payload,
});

export const addItem = (payload = {}) => ({
    type: ADD_ITEM,
    payload,
});

export const getItems = (payload = {}) => ({
    type: GET_ITEMS,
    payload,
});

export const setItems = (payload = {}) => ({
    type: SET_ITEMS,
    payload,
});

export const setDictionaryItems = (payload = {}) => ({
    type: SET_DICTIONARY_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditDictionaryItem = (payload = {}) => ({
    type: SET_EDIT_DICTIONARY_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeDictionaryItem = (payload = {}) => ({
    type: REMOVE_DICTIONARY_ITEM,
    payload,
});

export const removeDictionaryItems = () => ({
    type: REMOVE_DICTIONARY_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeDictionary = (payload = {}) => ({
    type: REMOVE_DICTIONARY,
    payload,
});

export const removeFromDictionaries = (payload = {}) => ({
    type: REMOVE_FROM_DICTIONARIES,
    payload,
});

export const changeDictionaryStatus = (payload = {}) => ({
    type: CHANGE_DICTIONARY_STATUS,
    payload,
});

