import {
    GET_RECALL_LOOKUP_MAKES,
    SET_RECALL_LOOKUP_MAKES,
    CLEAR_RECALL_LOOKUP_MAKES,
    GET_CREATE_RECALL_LOOKUP_MAKE,
    SET_CREATE_RECALL_LOOKUP_MAKE,
    RECALL_LOOKUP_MAKES_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_RECALL_LOOKUP_MAKE_ITEMS,
    CREATE_RECALL_LOOKUP_MAKE,
    EDIT_ITEM,
    SET_EDIT_RECALL_LOOKUP_MAKE_ITEMS,
    REMOVE_ITEM,
    REMOVE_RECALL_LOOKUP_MAKE_ITEM,
    GET_EDIT_RECALL_LOOKUP_MAKE,
    SET_EDIT_RECALL_LOOKUP_MAKE,
    EDIT_RECALL_LOOKUP_MAKE,
    REMOVE_RECALL_LOOKUP_MAKE_ITEMS,
    CLEAR_RECALL_LOOKUP_MAKE,
    SET_RECALL_LOOKUP_MAKE,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP_MAKE,
    REMOVE_FROM_RECALL_LOOKUP_MAKES,
    CHANGE_RECALL_LOOKUP_MAKE_STATUS,
} from "../constants";

export const getRecall_lookup_makes = (payload = {}) => ({
    type: GET_RECALL_LOOKUP_MAKES,
    payload,
});

export const setRecall_lookup_makes = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_MAKES,
    payload,
});

export const clearRecall_lookup_makes = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP_MAKES,
    payload,
});

export const clearRecall_lookup_make = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP_MAKE,
    payload,
});

export const getCreateRecall_lookup_make = (payload = {}) => ({
    type: GET_CREATE_RECALL_LOOKUP_MAKE,
    payload,
});

export const getEditRecall_lookup_make = (payload = {}) => ({
    type: GET_EDIT_RECALL_LOOKUP_MAKE,
    payload,
});

export const createRecall_lookup_make = (payload = {}) => ({
    type: CREATE_RECALL_LOOKUP_MAKE,
    payload,
});

export const detailRecall_lookup_make = (payload = {}) => ({
    type: EDIT_RECALL_LOOKUP_MAKE,
    payload,
});

export const setRecall_lookup_make = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_MAKE,
    payload,
});

export const setEditRecall_lookup_make = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_MAKE,
    payload,
});

export const recall_lookup_makeTriggerSpinner = (payload) => ({
    type: RECALL_LOOKUP_MAKES_TRIGGER_SPINNER,
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

export const setRecall_lookup_makeItems = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_MAKE_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditRecall_lookup_makeItem = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_MAKE_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeRecall_lookup_makeItem = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_MAKE_ITEM,
    payload,
});

export const removeRecall_lookup_makeItems = () => ({
    type: REMOVE_RECALL_LOOKUP_MAKE_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeRecall_lookup_make = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_MAKE,
    payload,
});

export const removeFromRecall_lookup_makes = (payload = {}) => ({
    type: REMOVE_FROM_RECALL_LOOKUP_MAKES,
    payload,
});

export const changeRecall_lookup_makeStatus = (payload = {}) => ({
    type: CHANGE_RECALL_LOOKUP_MAKE_STATUS,
    payload,
});

