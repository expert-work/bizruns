import {
    GET_ESTIMATE_SEARCH_MODELS,
    GET_ESTIMATE_SEARCH_MODEL_INFORMATION,
    SET_ESTIMATE_SEARCH_MODELS,
    CLEAR_ESTIMATE_SEARCH_MODELS,
    GET_CREATE_ESTIMATE_SEARCH_MODEL,
    SET_CREATE_ESTIMATE_SEARCH_MODEL,
    ESTIMATE_SEARCH_MODELS_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_ESTIMATE_SEARCH_MODEL_ITEMS,
    CREATE_ESTIMATE_SEARCH_MODEL,
    EDIT_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_MODEL_ITEMS,
    REMOVE_ITEM,
    REMOVE_ESTIMATE_SEARCH_MODEL_ITEM,
    GET_EDIT_ESTIMATE_SEARCH_MODEL,
    SET_EDIT_ESTIMATE_SEARCH_MODEL,
    EDIT_ESTIMATE_SEARCH_MODEL,
    REMOVE_ESTIMATE_SEARCH_MODEL_ITEMS,
    CLEAR_ESTIMATE_SEARCH_MODEL,
    SET_ESTIMATE_SEARCH_MODEL,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE_SEARCH_MODEL,
    REMOVE_FROM_ESTIMATE_SEARCH_MODELS,
    CHANGE_ESTIMATE_SEARCH_MODEL_STATUS,
} from "../constants";

export const getEstimate_search_models = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCH_MODELS,
    payload,
});


export const getEstimate_search_model_informations = (payload = {}) => ({
    type: GET_ESTIMATE_SEARCH_MODEL_INFORMATION,
    payload,
});



export const setEstimate_search_models = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_MODELS,
    payload,
});

export const clearEstimate_search_models = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH_MODELS,
    payload,
});

export const clearEstimate_search_model = (payload = {}) => ({
    type: CLEAR_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const getCreateEstimate_search_model = (payload = {}) => ({
    type: GET_CREATE_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const getEditEstimate_search_model = (payload = {}) => ({
    type: GET_EDIT_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const createEstimate_search_model = (payload = {}) => ({
    type: CREATE_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const detailEstimate_search_model = (payload = {}) => ({
    type: EDIT_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const setEstimate_search_model = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const setEditEstimate_search_model = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const estimate_search_modelTriggerSpinner = (payload) => ({
    type: ESTIMATE_SEARCH_MODELS_TRIGGER_SPINNER,
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

export const setEstimate_search_modelItems = (payload = {}) => ({
    type: SET_ESTIMATE_SEARCH_MODEL_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditEstimate_search_modelItem = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_SEARCH_MODEL_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeEstimate_search_modelItem = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_MODEL_ITEM,
    payload,
});

export const removeEstimate_search_modelItems = () => ({
    type: REMOVE_ESTIMATE_SEARCH_MODEL_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeEstimate_search_model = (payload = {}) => ({
    type: REMOVE_ESTIMATE_SEARCH_MODEL,
    payload,
});

export const removeFromEstimate_search_models = (payload = {}) => ({
    type: REMOVE_FROM_ESTIMATE_SEARCH_MODELS,
    payload,
});

export const changeEstimate_search_modelStatus = (payload = {}) => ({
    type: CHANGE_ESTIMATE_SEARCH_MODEL_STATUS,
    payload,
});

