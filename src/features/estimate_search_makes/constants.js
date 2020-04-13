import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const ESTIMATE_SEARCH_MAKE_SEARCH = 'estimate_search_makeForm/ESTIMATE_SEARCH_MAKE_SEARCH';
export const ESTIMATE_SEARCH_MAKE_FORM = 'estimate_search_makeForm/ESTIMATE_SEARCH_MAKE_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const ESTIMATE_SEARCH_MAKE_ADD = 'estimate_search_makeForm/ESTIMATE_SEARCH_MAKE_ADD';
export const ESTIMATE_SEARCH_MAKE_DETAIL = 'estimate_search_makeForm/ESTIMATE_SEARCH_MAKE_DETAIL';

// Actions
// -----------------------------------------
export const ESTIMATE_SEARCH_MAKES_TRIGGER_SPINNER = 'estimate_search_make/ESTIMATE_SEARCH_MAKES_TRIGGER_SPINNER';
export const GET_ESTIMATE_SEARCH_MAKES = 'estimate_search_make/GET_ESTIMATE_SEARCH_MAKES';
export const GET_ESTIMATE_SEARCH_MAKE_INFORMATION = 'estimate_search_make/GET_ESTIMATE_SEARCH_MAKE_INFORMATION';

export const SET_ESTIMATE_SEARCH_MAKES = 'estimate_search_make/SET_ESTIMATE_SEARCH_MAKES';

export const CLEAR_ESTIMATE_SEARCH_MAKES = 'estimate_search_make/CLEAR_ESTIMATE_SEARCH_MAKES';
export const CLEAR_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/CLEAR_ESTIMATE_SEARCH_MAKE';
export const GET_CREATE_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/GET_CREATE_ESTIMATE_SEARCH_MAKE';
export const GET_EDIT_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/GET_EDIT_ESTIMATE_SEARCH_MAKE';
export const SET_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/SET_ESTIMATE_SEARCH_MAKE';
export const SET_EDIT_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/SET_EDIT_ESTIMATE_SEARCH_MAKE';
export const CREATE_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/CREATE_ESTIMATE_SEARCH_MAKE';
export const EDIT_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/EDIT_ESTIMATE_SEARCH_MAKE';
export const CONVERT_TO_INVOICE = 'estimate_search_make/CONVERT_TO_INVOICE';
export const REMOVE_ESTIMATE_SEARCH_MAKE = 'estimate_search_make/REMOVE_ESTIMATE_SEARCH_MAKE';
export const REMOVE_FROM_ESTIMATE_SEARCH_MAKES = 'estimate_search_make/REMOVE_FROM_ESTIMATE_SEARCH_MAKES';
export const CHANGE_ESTIMATE_SEARCH_MAKE_STATUS = 'estimate_search_make/CHANGE_ESTIMATE_SEARCH_MAKE_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_ESTIMATE_SEARCH_MAKE_ITEMS = 'estimate_search_make/SET_EDIT_ESTIMATE_SEARCH_MAKE_ITEMS';
export const REMOVE_ESTIMATE_SEARCH_MAKE_ITEM = 'estimate_search_make/REMOVE_ESTIMATE_SEARCH_MAKE_ITEM';
export const REMOVE_ESTIMATE_SEARCH_MAKE_ITEMS = 'estimate_search_make/REMOVE_ESTIMATE_SEARCH_MAKE_ITEMS';
export const ADD_ITEM = 'estimate_search_make/ADD_ITEM';
export const EDIT_ITEM = 'estimate_search_make/EDIT_ITEM';
export const GET_ITEMS = 'estimate_search_make/GET_ITEMS';
export const SET_ITEMS = 'estimate_search_make/SET_ITEMS';
export const SET_ESTIMATE_SEARCH_MAKE_ITEMS = 'estimate_search_make/SET_ESTIMATE_SEARCH_MAKE_ITEMS';
export const REMOVE_ITEM = 'estimate_search_make/REMOVE_ITEM';
export const ITEM_ADD = 'estimate_search_make/ITEM_ADD';
export const ITEM_EDIT = 'estimate_search_make/ITEM_EDIT';

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


export const ESTIMATE_SEARCH_MAKE_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const ESTIMATE_SEARCH_MAKES_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const ESTIMATE_SEARCH_MAKES_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`estimate_search_makes.tabs.${name}`, { locale: language })
};

export const ESTIMATE_SEARCH_MAKES_TABS = {
    MAKES: 'MAKES' 
 };

export const ESTIMATE_SEARCH_MAKE_INFORMATIONS_TABS = {
    MAKES: 'MAKES' 
 };
 

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_ESTIMATE_SEARCH_MAKE_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const ESTIMATE_SEARCH_MAKES_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const ESTIMATE_SEARCH_MAKE_ACTIONS = {
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


export const EDIT_ESTIMATE_SEARCH_MAKE_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("estimate_search_makes.actions.markAsSent", { locale: language }),
        value: ESTIMATE_SEARCH_MAKE_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("estimate_search_makes.actions.markAsAccepted", { locale: language }),
        value: ESTIMATE_SEARCH_MAKE_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("estimate_search_makes.actions.markAsRejected", { locale: language }),
        value: ESTIMATE_SEARCH_MAKE_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("estimate_search_makes.actions.delete", { locale: language }),
        value: ESTIMATE_SEARCH_MAKE_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("estimate_search_makes.actions.convertToInvoice", { locale: language }),
            value: ESTIMATE_SEARCH_MAKE_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("estimate_search_makes.actions.sendEstimate", { locale: language }),
            value: ESTIMATE_SEARCH_MAKE_ACTIONS.SEND
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

export const GET_ESTIMATE_SEARCH_MAKES_URL = (param) => `estimate_search_makes?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_ESTIMATE_SEARCH_MAKE_URL = () => `estimate_search_makes`
export const EDIT_ESTIMATE_SEARCH_MAKE_URL = (estimate_search_make) => `estimate_search_makes/${estimate_search_make.id}`
export const REMOVE_ESTIMATE_SEARCH_MAKE_URL = (id) => `estimate_search_makes/${id}`
export const CHANGE_ESTIMATE_SEARCH_MAKE_STATUS_URL = (action) => `estimate_search_makes/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_ESTIMATE_SEARCH_MAKE_URL = (id) => `estimate_search_makes/${id}/edit`
export const GET_CREATE_ESTIMATE_SEARCH_MAKE_URL = () => `estimate_search_makes/create`

export const CONVERT_TO_INVOICE_URL = (id) => `estimate_search_makes/${id}/convert-to-invoice`
