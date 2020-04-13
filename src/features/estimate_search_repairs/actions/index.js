import {
    GET_ESTIMATE_SEARCH_REPAIRS,
    SET_ESTIMATE_SEARCH_REPAIRS,
    CLEAR_ESTIMATE_SEARCH_REPAIRS,
    GET_CREATE_ESTIMATE_SEARCH_REPAIR,
    SET_CREATE_ESTIMATE_SEARCH_REPAIR,
    ESTIMATE_SEARCH_REPAIRS_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_ESTIMATE_SEARCH_REPAIR_ITEMS,
    CREATE_ESTIMATE_SEARCH_REPAIR,
    EDIT_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_REPAIR_ITEMS,
    REMOVE_ITEM,
    REMOVE_ESTIMATE_SEARCH_REPAIR_ITEM,
    GET_EDIT_ESTIMATE_SEARCH_REPAIR,
    SET_EDIT_ESTIMATE_SEARCH_REPAIR,
    EDIT_ESTIMATE_SEARCH_REPAIR,
    REMOVE_ESTIMATE_SEARCH_REPAIR_ITEMS,
    CLEAR_ESTIMATE_SEARCH_REPAIR,
    SET_ESTIMATE_SEARCH_REPAIR,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH_REPAIR,
    REMOVE_FROM_ESTIMATE_SEARCH_REPAIRS,
    CHANGE_ESTIMATE_SEARCH_REPAIR_STATUS,
} from "../constants";

export const getEstimate_search_repairs = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCH_REPAIRS,
    payload,
});

export const setEstimate_search_repairs = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_REPAIRS,
    payload,
});

export const clearEstimate_search_repairs = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH_REPAIRS,
    payload,
});

export const clearEstimate_search_repair = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const getCreateEstimate_search_repair = (payload = {}) => ({
    type: GET_CREATE_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const getEditEstimate_search_repair = (payload = {}) => ({
    type: GET_EDIT_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const createEstimate_search_repair = (payload = {}) => ({
    type: CREATE_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const detailEstimate_search_repair = (payload = {}) => ({
    type: EDIT_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const setEstimate_search_repair = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const setEditEstimate_search_repair = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const estimate_search_repairTriggerSpinner = (payload) => ({
    type: ESTIMATE_SEARCH_REPAIRS_TRIGGER_SPINNER,
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

export const setEstimate_search_repairItems = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_REPAIR_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditEstimate_search_repairItem = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_REPAIR_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeEstimate_search_repairItem = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_REPAIR_ITEM,
    payload,
});

export const removeEstimate_search_repairItems = () => ({
    type: REMOVE_ESTIMATE_SEARCH_REPAIR_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeEstimate_search_repair = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_REPAIR,
    payload,
});

export const removeFromEstimate_search_repairs = (payload = {}) => ({
    type: REMOVE_FROM_ESTIMATE_SEARCH_REPAIRS,
    payload,
});

export const changeEstimate_search_repairStatus = (payload = {}) => ({
    type: CHANGE_ESTIMATE_SEARCH_REPAIR_STATUS,
    payload,
});

