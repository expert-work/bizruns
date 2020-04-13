import {
    GET_ESTIMATE_SEARCHS,
    GET_ESTIMATE_SEARCH_INFORMATION,
    SET_ESTIMATE_SEARCHS,
    CLEAR_ESTIMATE_SEARCHS,
    GET_CREATE_ESTIMATE_SEARCH,
    SET_CREATE_ESTIMATE_SEARCH,
    ESTIMATE_SEARCHS_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_ESTIMATE_SEARCH_ITEMS,
    CREATE_ESTIMATE_SEARCH,
    EDIT_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_ITEMS,
    REMOVE_ITEM,
    REMOVE_ESTIMATE_SEARCH_ITEM,
    GET_EDIT_ESTIMATE_SEARCH,
    SET_EDIT_ESTIMATE_SEARCH,
    EDIT_ESTIMATE_SEARCH,
    REMOVE_ESTIMATE_SEARCH_ITEMS,
    CLEAR_ESTIMATE_SEARCH,
    SET_ESTIMATE_SEARCH,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH,
    REMOVE_FROM_ESTIMATE_SEARCHS,
    CHANGE_ESTIMATE_SEARCH_STATUS,
} from "../constants";

export const getEstimate_searchs = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCHS,
    payload,
});


export const getEstimate_search_informations = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCH_INFORMATION,
    payload,
});



export const setEstimate_searchs = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCHS,
    payload,
});

export const clearEstimate_searchs = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCHS,
    payload,
});

export const clearEstimate_search = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH,
    payload,
});

export const getCreateEstimate_search = (payload = {}) => ({
    type: GET_CREATE_ESTIMATE_SEARCH,
    payload,
});

export const getEditEstimate_search = (payload = {}) => ({
    type: GET_EDIT_ESTIMATE_SEARCH,
    payload,
});

export const createEstimate_search = (payload = {}) => ({
    type: CREATE_ESTIMATE_SEARCH,
    payload,
});

export const detailEstimate_search = (payload = {}) => ({
    type: EDIT_ESTIMATE_SEARCH,
    payload,
});

export const setEstimate_search = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH,
    payload,
});

export const setEditEstimate_search = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH,
    payload,
});

export const estimate_searchTriggerSpinner = (payload) => ({
    type: ESTIMATE_SEARCHS_TRIGGER_SPINNER,
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

export const setEstimate_searchItems = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditEstimate_searchItem = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeEstimate_searchItem = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_ITEM,
    payload,
});

export const removeEstimate_searchItems = () => ({
    type: REMOVE_ESTIMATE_SEARCH_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeEstimate_search = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH,
    payload,
});

export const removeFromEstimate_searchs = (payload = {}) => ({
    type: REMOVE_FROM_ESTIMATE_SEARCHS,
    payload,
});

export const changeEstimate_searchStatus = (payload = {}) => ({
    type: CHANGE_ESTIMATE_SEARCH_STATUS,
    payload,
});

