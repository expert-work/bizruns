import {
    GET_RECALL_LOOKUP_MODELS,
    SET_RECALL_LOOKUP_MODELS,
    CLEAR_RECALL_LOOKUP_MODELS,
    GET_CREATE_RECALL_LOOKUP_MODEL,
    SET_CREATE_RECALL_LOOKUP_MODEL,
    RECALL_LOOKUP_MODELS_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_RECALL_LOOKUP_MODEL_ITEMS,
    CREATE_RECALL_LOOKUP_MODEL,
    EDIT_ITEM,
    SET_EDIT_RECALL_LOOKUP_MODEL_ITEMS,
    REMOVE_ITEM,
    REMOVE_RECALL_LOOKUP_MODEL_ITEM,
    GET_EDIT_RECALL_LOOKUP_MODEL,
    SET_EDIT_RECALL_LOOKUP_MODEL,
    EDIT_RECALL_LOOKUP_MODEL,
    REMOVE_RECALL_LOOKUP_MODEL_ITEMS,
    CLEAR_RECALL_LOOKUP_MODEL,
    SET_RECALL_LOOKUP_MODEL,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP_MODEL,
    REMOVE_FROM_RECALL_LOOKUP_MODELS,
    CHANGE_RECALL_LOOKUP_MODEL_STATUS,
} from "../constants";

export const getRecall_lookup_models = (payload = {}) => ({
    type: GET_RECALL_LOOKUP_MODELS,
    payload,
});

export const setRecall_lookup_models = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_MODELS,
    payload,
});

export const clearRecall_lookup_models = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP_MODELS,
    payload,
});

export const clearRecall_lookup_model = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP_MODEL,
    payload,
});

export const getCreateRecall_lookup_model = (payload = {}) => ({
    type: GET_CREATE_RECALL_LOOKUP_MODEL,
    payload,
});

export const getEditRecall_lookup_model = (payload = {}) => ({
    type: GET_EDIT_RECALL_LOOKUP_MODEL,
    payload,
});

export const createRecall_lookup_model = (payload = {}) => ({
    type: CREATE_RECALL_LOOKUP_MODEL,
    payload,
});

export const detailRecall_lookup_model = (payload = {}) => ({
    type: EDIT_RECALL_LOOKUP_MODEL,
    payload,
});

export const setRecall_lookup_model = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_MODEL,
    payload,
});

export const setEditRecall_lookup_model = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_MODEL,
    payload,
});

export const recall_lookup_modelTriggerSpinner = (payload) => ({
    type: RECALL_LOOKUP_MODELS_TRIGGER_SPINNER,
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

export const setRecall_lookup_modelItems = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_MODEL_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditRecall_lookup_modelItem = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_MODEL_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeRecall_lookup_modelItem = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_MODEL_ITEM,
    payload,
});

export const removeRecall_lookup_modelItems = () => ({
    type: REMOVE_RECALL_LOOKUP_MODEL_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeRecall_lookup_model = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_MODEL,
    payload,
});

export const removeFromRecall_lookup_models = (payload = {}) => ({
    type: REMOVE_FROM_RECALL_LOOKUP_MODELS,
    payload,
});

export const changeRecall_lookup_modelStatus = (payload = {}) => ({
    type: CHANGE_RECALL_LOOKUP_MODEL_STATUS,
    payload,
});

