import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const DICTIONARY_SEARCH = 'dictionaryForm/DICTIONARY_SEARCH';
export const DICTIONARY_FORM = 'dictionaryForm/DICTIONARY_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const DICTIONARY_ADD = 'dictionaryForm/DICTIONARY_ADD';
export const DICTIONARY_DETAIL = 'dictionaryForm/DICTIONARY_DETAIL';

// Actions
// -----------------------------------------
export const DICTIONARIES_TRIGGER_SPINNER = 'dictionary/DICTIONARIES_TRIGGER_SPINNER';
export const GET_DICTIONARIES = 'dictionary/GET_DICTIONARIES';
export const SET_DICTIONARIES = 'dictionary/SET_DICTIONARIES';

export const CLEAR_DICTIONARIES = 'dictionary/CLEAR_DICTIONARIES';
export const CLEAR_DICTIONARY = 'dictionary/CLEAR_DICTIONARY';
export const GET_CREATE_DICTIONARY = 'dictionary/GET_CREATE_DICTIONARY';
export const GET_EDIT_DICTIONARY = 'dictionary/GET_EDIT_DICTIONARY';
export const SET_DICTIONARY = 'dictionary/SET_DICTIONARY';
export const SET_EDIT_DICTIONARY = 'dictionary/SET_EDIT_DICTIONARY';
export const CREATE_DICTIONARY = 'dictionary/CREATE_DICTIONARY';
export const EDIT_DICTIONARY = 'dictionary/EDIT_DICTIONARY';
export const CONVERT_TO_INVOICE = 'dictionary/CONVERT_TO_INVOICE';
export const REMOVE_DICTIONARY = 'dictionary/REMOVE_DICTIONARY';
export const REMOVE_FROM_DICTIONARIES = 'dictionary/REMOVE_FROM_DICTIONARIES';
export const CHANGE_DICTIONARY_STATUS = 'dictionary/CHANGE_DICTIONARY_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_DICTIONARY_ITEMS = 'dictionary/SET_EDIT_DICTIONARY_ITEMS';
export const REMOVE_DICTIONARY_ITEM = 'dictionary/REMOVE_DICTIONARY_ITEM';
export const REMOVE_DICTIONARY_ITEMS = 'dictionary/REMOVE_DICTIONARY_ITEMS';
export const ADD_ITEM = 'dictionary/ADD_ITEM';
export const EDIT_ITEM = 'dictionary/EDIT_ITEM';
export const GET_ITEMS = 'dictionary/GET_ITEMS';
export const SET_ITEMS = 'dictionary/SET_ITEMS';
export const SET_DICTIONARY_ITEMS = 'dictionary/SET_DICTIONARY_ITEMS';
export const REMOVE_ITEM = 'dictionary/REMOVE_ITEM';
export const ITEM_ADD = 'dictionary/ITEM_ADD';
export const ITEM_EDIT = 'dictionary/ITEM_EDIT';

export const ITEM_DISCOUNT_OPTION = [
    {
        key: 'none',
        label: 'None',
    },
    {
        key: 'fixed',
        label: 'Fixed',
    },
    {
        key: 'percentage',
        label: 'Percentage',
    },
];


export const DICTIONARY_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const DICTIONARIES_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const DICTIONARIES_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`dictionaries.tabs.${name}`, { locale: language })
};

export const DICTIONARIES_TABS = {
    ALL: 'ALL',
    BYLETTER: 'BYLETTER',
 };

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_DICTIONARY_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const DICTIONARIES_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const DICTIONARY_ACTIONS = {
    VIEW: 'download',
    SEND: 'send',
    DELETE: 'delete',
    EDIT: 'edit',
    CONVERT_TO_INVOICE: 'convertToInvoice',
    MARK_AS_SENT: 'markAsSent',
    MARK_AS_ACCEPTED: 'markAsAccepted',
    MARK_AS_REJECTED: 'markAsRejected',
}

export const MARK_AS_SENT = 'SENT'
export const MARK_AS_ACCEPT = 'ACCEPTED'
export const MARK_AS_REJECT = 'REJECTED'


export const EDIT_DICTIONARY_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("dictionaries.actions.markAsSent", { locale: language }),
        value: DICTIONARY_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("dictionaries.actions.markAsAccepted", { locale: language }),
        value: DICTIONARY_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("dictionaries.actions.markAsRejected", { locale: language }),
        value: DICTIONARY_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("dictionaries.actions.delete", { locale: language }),
        value: DICTIONARY_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("dictionaries.actions.convertToInvoice", { locale: language }),
            value: DICTIONARY_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("dictionaries.actions.sendEstimate", { locale: language }),
            value: DICTIONARY_ACTIONS.SEND
        }
    ]

    let items = []

    if (markAs === MARK_AS_SENT) {
        items = [
            ...markAsAccept,
            ...markAsReject
        ]
    }
    else if (markAs === MARK_AS_ACCEPT) {
        items = [
            ...markAsSent,
            ...markAsReject
        ]
    }
    else if (markAs === MARK_AS_REJECT) {
        items = [
            ...markAsSent,
            ...markAsAccept
        ]
    }
    else {
        items = [
            ...markAsSent,
            ...markAsAccept,
            ...markAsReject
        ]
    }

    return [
        ...actions,
        ...items,
        ...deleteAction
    ]

};

// Endpoint Api URL
// -----------------------------------------

export const GET_DICTIONARIES_URL = (param) => `dictionaries?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_DICTIONARY_URL = () => `dictionaries`
export const EDIT_DICTIONARY_URL = (dictionary) => `dictionaries/${dictionary.id}`
export const REMOVE_DICTIONARY_URL = (id) => `dictionaries/${id}`
export const CHANGE_DICTIONARY_STATUS_URL = (action) => `dictionaries/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_DICTIONARY_URL = (id) => `dictionaries/${id}/edit`
export const GET_CREATE_DICTIONARY_URL = () => `dictionaries/create`

export const CONVERT_TO_INVOICE_URL = (id) => `dictionaries/${id}/convert-to-invoice`
