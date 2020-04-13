import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const ESTIMATE_SEARCH_SEARCH = 'estimate_searchForm/ESTIMATE_SEARCH_SEARCH';
export const ESTIMATE_SEARCH_FORM = 'estimate_searchForm/ESTIMATE_SEARCH_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const ESTIMATE_SEARCH_ADD = 'estimate_searchForm/ESTIMATE_SEARCH_ADD';
export const ESTIMATE_SEARCH_DETAIL = 'estimate_searchForm/ESTIMATE_SEARCH_DETAIL';

// Actions
// -----------------------------------------
export const ESTIMATE_SEARCHS_TRIGGER_SPINNER = 'estimate_search/ESTIMATE_SEARCHS_TRIGGER_SPINNER';
export const GET_ESTIMATE_SEARCHS = 'estimate_search/GET_ESTIMATE_SEARCHS';
export const GET_ESTIMATE_SEARCH_INFORMATION = 'estimate_search/GET_ESTIMATE_SEARCH_INFORMATION';

export const SET_ESTIMATE_SEARCHS = 'estimate_search/SET_ESTIMATE_SEARCHS';

export const CLEAR_ESTIMATE_SEARCHS = 'estimate_search/CLEAR_ESTIMATE_SEARCHS';
export const CLEAR_ESTIMATE_SEARCH = 'estimate_search/CLEAR_ESTIMATE_SEARCH';
export const GET_CREATE_ESTIMATE_SEARCH = 'estimate_search/GET_CREATE_ESTIMATE_SEARCH';
export const GET_EDIT_ESTIMATE_SEARCH = 'estimate_search/GET_EDIT_ESTIMATE_SEARCH';
export const SET_ESTIMATE_SEARCH = 'estimate_search/SET_ESTIMATE_SEARCH';
export const SET_EDIT_ESTIMATE_SEARCH = 'estimate_search/SET_EDIT_ESTIMATE_SEARCH';
export const CREATE_ESTIMATE_SEARCH = 'estimate_search/CREATE_ESTIMATE_SEARCH';
export const EDIT_ESTIMATE_SEARCH = 'estimate_search/EDIT_ESTIMATE_SEARCH';
export const CONVERT_TO_INVOICE = 'estimate_search/CONVERT_TO_INVOICE';
export const REMOVE_ESTIMATE_SEARCH = 'estimate_search/REMOVE_ESTIMATE_SEARCH';
export const REMOVE_FROM_ESTIMATE_SEARCHS = 'estimate_search/REMOVE_FROM_ESTIMATE_SEARCHS';
export const CHANGE_ESTIMATE_SEARCH_STATUS = 'estimate_search/CHANGE_ESTIMATE_SEARCH_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_ESTIMATE_SEARCH_ITEMS = 'estimate_search/SET_EDIT_ESTIMATE_SEARCH_ITEMS';
export const REMOVE_ESTIMATE_SEARCH_ITEM = 'estimate_search/REMOVE_ESTIMATE_SEARCH_ITEM';
export const REMOVE_ESTIMATE_SEARCH_ITEMS = 'estimate_search/REMOVE_ESTIMATE_SEARCH_ITEMS';
export const ADD_ITEM = 'estimate_search/ADD_ITEM';
export const EDIT_ITEM = 'estimate_search/EDIT_ITEM';
export const GET_ITEMS = 'estimate_search/GET_ITEMS';
export const SET_ITEMS = 'estimate_search/SET_ITEMS';
export const SET_ESTIMATE_SEARCH_ITEMS = 'estimate_search/SET_ESTIMATE_SEARCH_ITEMS';
export const REMOVE_ITEM = 'estimate_search/REMOVE_ITEM';
export const ITEM_ADD = 'estimate_search/ITEM_ADD';
export const ITEM_EDIT = 'estimate_search/ITEM_EDIT';

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


export const ESTIMATE_SEARCH_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const ESTIMATE_SEARCHS_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const ESTIMATE_SEARCHS_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`estimate_searchs.tabs.${name}`, { locale: language })
};

export const ESTIMATE_SEARCHS_TABS = {
    YEARS: 'YEARS' 
 };

export const ESTIMATE_SEARCH_INFORMATIONS_TABS = {
    YEARS: 'YEARS' 
 };
 

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_ESTIMATE_SEARCH_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const ESTIMATE_SEARCHS_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const ESTIMATE_SEARCH_ACTIONS = {
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


export const EDIT_ESTIMATE_SEARCH_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("estimate_searchs.actions.markAsSent", { locale: language }),
        value: ESTIMATE_SEARCH_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("estimate_searchs.actions.markAsAccepted", { locale: language }),
        value: ESTIMATE_SEARCH_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("estimate_searchs.actions.markAsRejected", { locale: language }),
        value: ESTIMATE_SEARCH_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("estimate_searchs.actions.delete", { locale: language }),
        value: ESTIMATE_SEARCH_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("estimate_searchs.actions.convertToInvoice", { locale: language }),
            value: ESTIMATE_SEARCH_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("estimate_searchs.actions.sendEstimate", { locale: language }),
            value: ESTIMATE_SEARCH_ACTIONS.SEND
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

export const GET_ESTIMATE_SEARCHS_URL = (param) => `estimate_searchs?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_ESTIMATE_SEARCH_URL = () => `estimate_searchs`
export const EDIT_ESTIMATE_SEARCH_URL = (estimate_search) => `estimate_searchs/${estimate_search.id}`
export const REMOVE_ESTIMATE_SEARCH_URL = (id) => `estimate_searchs/${id}`
export const CHANGE_ESTIMATE_SEARCH_STATUS_URL = (action) => `estimate_searchs/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_ESTIMATE_SEARCH_URL = (id) => `estimate_searchs/${id}/edit`
export const GET_CREATE_ESTIMATE_SEARCH_URL = () => `estimate_searchs/create`

export const CONVERT_TO_INVOICE_URL = (id) => `estimate_searchs/${id}/convert-to-invoice`
