import {
    GET_OBD2S,
    SET_OBD2S,
    CLEAR_OBD2S,
    GET_CREATE_OBD2,
    SET_CREATE_OBD2,
    OBD2S_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_OBD2_ITEMS,
    CREATE_OBD2,
    EDIT_ITEM,
    SET_EDIT_OBD2_ITEMS,
    REMOVE_ITEM,
    REMOVE_OBD2_ITEM,
    GET_EDIT_OBD2,
    SET_EDIT_OBD2,
    EDIT_OBD2,
    REMOVE_OBD2_ITEMS,
    CLEAR_OBD2,
    SET_OBD2,
    CONVERT_TO_INVOICE,
    REMOVE_OBD2,
    REMOVE_FROM_OBD2S,
    CHANGE_OBD2_STATUS,
} from "../constants";

export const getObd2s = (payload = {}) => ({
    type: GET_OBD2S,
    payload,
});

export const setObd2s = (payload = {}) => ({
    type: SET_OBD2S,
    payload,
});

export const clearObd2s = (payload = {}) => ({
    type: CLEAR_OBD2S,
    payload,
});

export const clearObd2 = (payload = {}) => ({
    type: CLEAR_OBD2,
    payload,
});

export const getCreateObd2 = (payload = {}) => ({
    type: GET_CREATE_OBD2,
    payload,
});

export const getEditObd2 = (payload = {}) => ({
    type: GET_EDIT_OBD2,
    payload,
});

export const createObd2 = (payload = {}) => ({
    type: CREATE_OBD2,
    payload,
});

export const detailObd2 = (payload = {}) => ({
    type: EDIT_OBD2,
    payload,
});

export const setObd2 = (payload = {}) => ({
    type: SET_OBD2,
    payload,
});

export const setEditObd2 = (payload = {}) => ({
    type: SET_EDIT_OBD2,
    payload,
});

export const obd2TriggerSpinner = (payload) => ({
    type: OBD2S_TRIGGER_SPINNER,
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

export const setObd2Items = (payload = {}) => ({
    type: SET_OBD2_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditObd2Item = (payload = {}) => ({
    type: SET_EDIT_OBD2_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeObd2Item = (payload = {}) => ({
    type: REMOVE_OBD2_ITEM,
    payload,
});

export const removeObd2Items = () => ({
    type: REMOVE_OBD2_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeObd2 = (payload = {}) => ({
    type: REMOVE_OBD2,
    payload,
});

export const removeFromObd2s = (payload = {}) => ({
    type: REMOVE_FROM_OBD2S,
    payload,
});

export const changeObd2Status = (payload = {}) => ({
    type: CHANGE_OBD2_STATUS,
    payload,
});

