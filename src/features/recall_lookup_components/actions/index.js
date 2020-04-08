import {
    GET_RECALL_LOOKUP_COMPONENTS,
    SET_RECALL_LOOKUP_COMPONENTS,
    CLEAR_RECALL_LOOKUP_COMPONENTS,
    GET_CREATE_RECALL_LOOKUP_COMPONENT,
    SET_CREATE_RECALL_LOOKUP_COMPONENT,
    RECALL_LOOKUP_COMPONENTS_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_RECALL_LOOKUP_COMPONENT_ITEMS,
    CREATE_RECALL_LOOKUP_COMPONENT,
    EDIT_ITEM,
    SET_EDIT_RECALL_LOOKUP_COMPONENT_ITEMS,
    REMOVE_ITEM,
    REMOVE_RECALL_LOOKUP_COMPONENT_ITEM,
    GET_EDIT_RECALL_LOOKUP_COMPONENT,
    SET_EDIT_RECALL_LOOKUP_COMPONENT,
    EDIT_RECALL_LOOKUP_COMPONENT,
    REMOVE_RECALL_LOOKUP_COMPONENT_ITEMS,
    CLEAR_RECALL_LOOKUP_COMPONENT,
    SET_RECALL_LOOKUP_COMPONENT,
    CONVERT_TO_INVOICE,
    REMOVE_RECALL_LOOKUP_COMPONENT,
    REMOVE_FROM_RECALL_LOOKUP_COMPONENTS,
    CHANGE_RECALL_LOOKUP_COMPONENT_STATUS,
} from "../constants";

export const getRecall_lookup_components = (payload = {}) => ({
    type: GET_RECALL_LOOKUP_COMPONENTS,
    payload,
});

export const setRecall_lookup_components = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_COMPONENTS,
    payload,
});

export const clearRecall_lookup_components = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP_COMPONENTS,
    payload,
});

export const clearRecall_lookup_component = (payload = {}) => ({
    type: CLEAR_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const getCreateRecall_lookup_component = (payload = {}) => ({
    type: GET_CREATE_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const getEditRecall_lookup_component = (payload = {}) => ({
    type: GET_EDIT_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const createRecall_lookup_component = (payload = {}) => ({
    type: CREATE_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const detailRecall_lookup_component = (payload = {}) => ({
    type: EDIT_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const setRecall_lookup_component = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const setEditRecall_lookup_component = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const recall_lookup_componentTriggerSpinner = (payload) => ({
    type: RECALL_LOOKUP_COMPONENTS_TRIGGER_SPINNER,
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

export const setRecall_lookup_componentItems = (payload = {}) => ({
    type: SET_RECALL_LOOKUP_COMPONENT_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditRecall_lookup_componentItem = (payload = {}) => ({
    type: SET_EDIT_RECALL_LOOKUP_COMPONENT_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeRecall_lookup_componentItem = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_COMPONENT_ITEM,
    payload,
});

export const removeRecall_lookup_componentItems = () => ({
    type: REMOVE_RECALL_LOOKUP_COMPONENT_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeRecall_lookup_component = (payload = {}) => ({
    type: REMOVE_RECALL_LOOKUP_COMPONENT,
    payload,
});

export const removeFromRecall_lookup_components = (payload = {}) => ({
    type: REMOVE_FROM_RECALL_LOOKUP_COMPONENTS,
    payload,
});

export const changeRecall_lookup_componentStatus = (payload = {}) => ({
    type: CHANGE_RECALL_LOOKUP_COMPONENT_STATUS,
    payload,
});

