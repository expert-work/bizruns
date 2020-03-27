import queryString from 'query-string';

// Forms
// -----------------------------------------
export const SUBSCRIPTION_SEARCH = 'subscriptions/SUBSCRIPTION_SEARCH';
export const SUBSCRIPTION_FORM = 'subscriptions/SUBSCRIPTION_FORM';

// Type
// -----------------------------------------
export const SUBSCRIPTION_ADD = 'subscriptions/SUBSCRIPTION_ADD';
export const SUBSCRIPTION_EDIT = 'subscriptions/SUBSCRIPTION_EDIT';

// Actions
// -----------------------------------------
export const GET_SUBSCRIPTIONS = 'subscriptions/GET_SUBSCRIPTIONS';
export const SET_SUBSCRIPTIONS = 'subscriptions/SET_SUBSCRIPTIONS';
export const SET_FILTER_SUBSCRIPTIONS = 'subscriptions/SET_FILTER_SUBSCRIPTIONS';

export const GET_CREATE_SUBSCRIPTION = 'subscriptions/GET_CREATE_SUBSCRIPTION';
export const CREATE_SUBSCRIPTION = 'subscriptions/CREATE_SUBSCRIPTION';
export const GET_UNPAID_INVOICES = 'subscriptions/GET_UNPAID_INVOICES';
export const PAYMENTS_TRIGGER_SPINNER = 'subscriptions/PAYMENTS_TRIGGER_SPINNER';
export const GET_EDIT_SUBSCRIPTION = 'subscriptions/GET_EDIT_SUBSCRIPTION';
export const EDIT_SUBSCRIPTION = 'subscriptions/EDIT_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'subscriptions/REMOVE_SUBSCRIPTION';

// Payment Mode
// -----------------------------------------
export const SUBSCRIPTION_MODE = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Check', value: 'Check' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Bank Transfer', value: 'Bank Transfer' }
]

export const ACTIONS_VALUE = {
    REMOVE: 'remove',
}

export const SUBSCRIPTION_ACTIONS = (Lng, language) => {
    return [
        {
            label: Lng.t("subscriptions.removePayment", { locale: language })
            ,
            value: ACTIONS_VALUE.REMOVE
        }
    ];
}

// Endpoint Api URL
// -----------------------------------------

export const GET_SUBSCRIPTIONS_URL = (param) => `subscriptions?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const CREATE_SUBSCRIPTION_URL = () => `subscriptions`
export const EDIT_SUBSCRIPTION_URL = (id) => `subscriptions/${id}`
export const REMOVE_SUBSCRIPTION_URL = (id) => `subscriptions/${id}`

export const GET_EDIT_SUBSCRIPTION_URL = (id) => `subscriptions/${id}/edit`
export const GET_CREATE_SUBSCRIPTIONS_URL = () => `subscriptions/create`
export const GET_UNPAID_INVOICES_URL = (id) => `invoices/unpaid/${id}`