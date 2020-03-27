
import {
    GET_SUBSCRIPTIONS,
    SET_SUBSCRIPTIONS,
    SUBSCRIPTIONS_TRIGGER_SPINNER,
    GET_CREATE_SUBSCRIPTION,
    CREATE_SUBSCRIPTION,
    GET_UNPAID_INVOICES,
    GET_EDIT_SUBSCRIPTION,
    EDIT_SUBSCRIPTION,
    SET_FILTER_SUBSCRIPTIONS,
    REMOVE_SUBSCRIPTION,
} from "../constants";


export const getSubscriptions = (payload = {}) => ({
    type: GET_SUBSCRIPTIONS,
    payload,
});

export const setSubscriptions = (payload = {}) => ({
    type: SET_SUBSCRIPTIONS,
    payload,
});

export const setFilterSubscriptions = (payload = {}) => ({
    type: SET_FILTER_SUBSCRIPTIONS,
    payload,
});

export const getCreateSubscription = (payload = {}) => ({
    type: GET_CREATE_SUBSCRIPTION,
    payload,
});

export const createSubscription = (payload = {}) => ({
    type: CREATE_SUBSCRIPTION,
    payload,
});


export const getUnpaidInvoices = (payload = {}) => ({
    type: GET_UNPAID_INVOICES,
    payload,
});

export const subscriptionTriggerSpinner = (payload) => ({
    type: SUBSCRIPTIONS_TRIGGER_SPINNER,
    payload,
});

export const getEditSubscription = (payload = {}) => ({
    type: GET_EDIT_SUBSCRIPTION,
    payload,
});


export const editSubscription = (payload = {}) => ({
    type: EDIT_SUBSCRIPTION,
    payload,
});

export const removeSubscription = (payload = {}) => ({
    type: REMOVE_SUBSCRIPTION,
    payload,
});