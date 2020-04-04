import {
    GET_RECALL_LOOKUPS,
    SET_RECALL_LOOKUPS,
    CLEAR_RECALL_LOOKUPS,
    GET_CREATE_RECALL_LOOKUP,
    SET_CREATE_RECALL_LOOKUP,
    RECALL_LOOKUPS_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_RECALL_LOOKUP_ITEMS,
    CREATE_RECALL_LOOKUP,
    EDIT_ITEM,
    SET_EDIT_RECALL_LOOKUP_ITEMS,
    REMOVE_ITEM,
    REMOVE_RECALL_LOOKUP_ITEM,
    GET_EDIT_RECALL_LOOKUP,
    SET_EDIT_RECALL_LOOKUP,
    EDIT_RECALL_LOOKUP,
    REMOVE_RECALL_LOOKUP_ITEMS,
    CLEAR_RECALL_LOOKUP,
    SET_RECALL_LOOKUP,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP,
    REMOVE_FROM_RECALL_LOOKUPS,
    CHANGE_RECALL_LOOKUP_STATUS,
} from "../constants";

export const getRecall_lookups = (payload = {}) => ({
    type: GET_RECALL_LOOKUPS,
    payload,
});

export const setRecall_lookups = (payload = {}) => ({
    type: SET_RECALL_LOOKUPS,
    payload,
});

export const clearRecall_lookups = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUPS,
    payload,
});

export const clearRecall_lookup = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP,
    payload,
});

export const getCreateRecall_lookup = (payload = {}) => ({
    type: GET_CREATE_RECALL_LOOKUP,
    payload,
});

export const getEditRecall_lookup = (payload = {}) => ({
    type: GET_EDIT_RECALL_LOOKUP,
    payload,
});

export const createRecall_lookup = (payload = {}) => ({
    type: CREATE_RECALL_LOOKUP,
    payload,
});

export const detailRecall_lookup = (payload = {}) => ({
    type: EDIT_RECALL_LOOKUP,
    payload,
});

export const setRecall_lookup = (payload = {}) => ({
    type: SET_RECALL_LOOKUP,
    payload,
});

export const setEditRecall_lookup = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP,
    payload,
});

export const recall_lookupTriggerSpinner = (payload) => ({
    type: RECALL_LOOKUPS_TRIGGER_SPINNER,
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

export const setRecall_lookupItems = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditRecall_lookupItem = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeRecall_lookupItem = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_ITEM,
    payload,
});

export const removeRecall_lookupItems = () => ({
    type: REMOVE_RECALL_LOOKUP_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeRecall_lookup = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP,
    payload,
});

export const removeFromRecall_lookups = (payload = {}) => ({
    type: REMOVE_FROM_RECALL_LOOKUPS,
    payload,
});

export const changeRecall_lookupStatus = (payload = {}) => ({
    type: CHANGE_RECALL_LOOKUP_STATUS,
    payload,
});

