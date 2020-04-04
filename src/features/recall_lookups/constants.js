import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const RECALL_LOOKUP_SEARCH = 'recall_lookupForm/RECALL_LOOKUP_SEARCH';
export const RECALL_LOOKUP_FORM = 'recall_lookupForm/RECALL_LOOKUP_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const RECALL_LOOKUP_ADD = 'recall_lookupForm/RECALL_LOOKUP_ADD';
export const RECALL_LOOKUP_DETAIL = 'recall_lookupForm/RECALL_LOOKUP_DETAIL';

// Actions
// -----------------------------------------
export const RECALL_LOOKUPS_TRIGGER_SPINNER = 'recall_lookup/RECALL_LOOKUPS_TRIGGER_SPINNER';
export const GET_RECALL_LOOKUPS = 'recall_lookup/GET_RECALL_LOOKUPS';
export const SET_RECALL_LOOKUPS = 'recall_lookup/SET_RECALL_LOOKUPS';

export const CLEAR_RECALL_LOOKUPS = 'recall_lookup/CLEAR_RECALL_LOOKUPS';
export const CLEAR_RECALL_LOOKUP = 'recall_lookup/CLEAR_RECALL_LOOKUP';
export const GET_CREATE_RECALL_LOOKUP = 'recall_lookup/GET_CREATE_RECALL_LOOKUP';
export const GET_EDIT_RECALL_LOOKUP = 'recall_lookup/GET_EDIT_RECALL_LOOKUP';
export const SET_RECALL_LOOKUP = 'recall_lookup/SET_RECALL_LOOKUP';
export const SET_EDIT_RECALL_LOOKUP = 'recall_lookup/SET_EDIT_RECALL_LOOKUP';
export const CREATE_RECALL_LOOKUP = 'recall_lookup/CREATE_RECALL_LOOKUP';
export const EDIT_RECALL_LOOKUP = 'recall_lookup/EDIT_RECALL_LOOKUP';
export const CONVERT_TO_INVOICE = 'recall_lookup/CONVERT_TO_INVOICE';
export const REMOVE_RECALL_LOOKUP = 'recall_lookup/REMOVE_RECALL_LOOKUP';
export const REMOVE_FROM_RECALL_LOOKUPS = 'recall_lookup/REMOVE_FROM_RECALL_LOOKUPS';
export const CHANGE_RECALL_LOOKUP_STATUS = 'recall_lookup/CHANGE_RECALL_LOOKUP_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_RECALL_LOOKUP_ITEMS = 'recall_lookup/SET_EDIT_RECALL_LOOKUP_ITEMS';
export const REMOVE_RECALL_LOOKUP_ITEM = 'recall_lookup/REMOVE_RECALL_LOOKUP_ITEM';
export const REMOVE_RECALL_LOOKUP_ITEMS = 'recall_lookup/REMOVE_RECALL_LOOKUP_ITEMS';
export const ADD_ITEM = 'recall_lookup/ADD_ITEM';
export const EDIT_ITEM = 'recall_lookup/EDIT_ITEM';
export const GET_ITEMS = 'recall_lookup/GET_ITEMS';
export const SET_ITEMS = 'recall_lookup/SET_ITEMS';
export const SET_RECALL_LOOKUP_ITEMS = 'recall_lookup/SET_RECALL_LOOKUP_ITEMS';
export const REMOVE_ITEM = 'recall_lookup/REMOVE_ITEM';
export const ITEM_ADD = 'recall_lookup/ITEM_ADD';
export const ITEM_EDIT = 'recall_lookup/ITEM_EDIT';

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


export const RECALL_LOOKUP_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const RECALL_LOOKUPS_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const RECALL_LOOKUPS_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`recall_lookups.tabs.${name}`, { locale: language })
};

export const RECALL_LOOKUPS_TABS = {
    YEARS: 'YEARS',
  };

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_RECALL_LOOKUP_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const RECALL_LOOKUPS_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const RECALL_LOOKUP_ACTIONS = {
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


export const EDIT_RECALL_LOOKUP_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("recall_lookups.actions.markAsSent", { locale: language }),
        value: RECALL_LOOKUP_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("recall_lookups.actions.markAsAccepted", { locale: language }),
        value: RECALL_LOOKUP_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("recall_lookups.actions.markAsRejected", { locale: language }),
        value: RECALL_LOOKUP_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("recall_lookups.actions.delete", { locale: language }),
        value: RECALL_LOOKUP_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("recall_lookups.actions.convertToInvoice", { locale: language }),
            value: RECALL_LOOKUP_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("recall_lookups.actions.sendEstimate", { locale: language }),
            value: RECALL_LOOKUP_ACTIONS.SEND
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

export const GET_RECALL_LOOKUPS_URL = (param) => `recall_lookups?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_RECALL_LOOKUP_URL = () => `recall_lookups`
export const EDIT_RECALL_LOOKUP_URL = (recall_lookup) => `recall_lookups/${recall_lookup.id}`
export const REMOVE_RECALL_LOOKUP_URL = (id) => `recall_lookups/${id}`
export const CHANGE_RECALL_LOOKUP_STATUS_URL = (action) => `recall_lookups/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_RECALL_LOOKUP_URL = (id) => `recall_lookups/${id}/edit`
export const GET_CREATE_RECALL_LOOKUP_URL = () => `recall_lookups/create`

export const CONVERT_TO_INVOICE_URL = (id) => `recall_lookups/${id}/convert-to-invoice`
