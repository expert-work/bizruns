import {
    GET_ESTIMATE_SEARCH_MAKES,
    GET_ESTIMATE_SEARCH_MAKE_INFORMATION,
    SET_ESTIMATE_SEARCH_MAKES,
    CLEAR_ESTIMATE_SEARCH_MAKES,
    GET_CREATE_ESTIMATE_SEARCH_MAKE,
    SET_CREATE_ESTIMATE_SEARCH_MAKE,
    ESTIMATE_SEARCH_MAKES_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_ESTIMATE_SEARCH_MAKE_ITEMS,
    CREATE_ESTIMATE_SEARCH_MAKE,
    EDIT_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_MAKE_ITEMS,
    REMOVE_ITEM,
    REMOVE_ESTIMATE_SEARCH_MAKE_ITEM,
    GET_EDIT_ESTIMATE_SEARCH_MAKE,
    SET_EDIT_ESTIMATE_SEARCH_MAKE,
    EDIT_ESTIMATE_SEARCH_MAKE,
    REMOVE_ESTIMATE_SEARCH_MAKE_ITEMS,
    CLEAR_ESTIMATE_SEARCH_MAKE,
    SET_ESTIMATE_SEARCH_MAKE,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH_MAKE,
    REMOVE_FROM_ESTIMATE_SEARCH_MAKES,
    CHANGE_ESTIMATE_SEARCH_MAKE_STATUS,
} from "../constants";

export const getEstimate_search_makes = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCH_MAKES,
    payload,
});


export const getEstimate_search_make_informations = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCH_MAKE_INFORMATION,
    payload,
});



export const setEstimate_search_makes = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_MAKES,
    payload,
});

export const clearEstimate_search_makes = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH_MAKES,
    payload,
});

export const clearEstimate_search_make = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const getCreateEstimate_search_make = (payload = {}) => ({
    type: GET_CREATE_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const getEditEstimate_search_make = (payload = {}) => ({
    type: GET_EDIT_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const createEstimate_search_make = (payload = {}) => ({
    type: CREATE_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const detailEstimate_search_make = (payload = {}) => ({
    type: EDIT_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const setEstimate_search_make = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const setEditEstimate_search_make = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const estimate_search_makeTriggerSpinner = (payload) => ({
    type: ESTIMATE_SEARCH_MAKES_TRIGGER_SPINNER,
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

export const setEstimate_search_makeItems = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_MAKE_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditEstimate_search_makeItem = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_MAKE_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeEstimate_search_makeItem = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_MAKE_ITEM,
    payload,
});

export const removeEstimate_search_makeItems = () => ({
    type: REMOVE_ESTIMATE_SEARCH_MAKE_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeEstimate_search_make = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_MAKE,
    payload,
});

export const removeFromEstimate_search_makes = (payload = {}) => ({
    type: REMOVE_FROM_ESTIMATE_SEARCH_MAKES,
    payload,
});

export const changeEstimate_search_makeStatus = (payload = {}) => ({
    type: CHANGE_ESTIMATE_SEARCH_MAKE_STATUS,
    payload,
});

