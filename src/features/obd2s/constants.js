import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const OBD2_SEARCH = 'obd2Form/OBD2_SEARCH';
export const OBD2_FORM = 'obd2Form/OBD2_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const OBD2_ADD = 'obd2Form/OBD2_ADD';
export const OBD2_DETAIL = 'obd2Form/OBD2_DETAIL';

// Actions
// -----------------------------------------
export const OBD2S_TRIGGER_SPINNER = 'obd2/OBD2S_TRIGGER_SPINNER';
export const GET_OBD2S = 'obd2/GET_OBD2S';
export const SET_OBD2S = 'obd2/SET_OBD2S';

export const CLEAR_OBD2S = 'obd2/CLEAR_OBD2S';
export const CLEAR_OBD2 = 'obd2/CLEAR_OBD2';
export const GET_CREATE_OBD2 = 'obd2/GET_CREATE_OBD2';
export const GET_EDIT_OBD2 = 'obd2/GET_EDIT_OBD2';
export const SET_OBD2 = 'obd2/SET_OBD2';
export const SET_EDIT_OBD2 = 'obd2/SET_EDIT_OBD2';
export const CREATE_OBD2 = 'obd2/CREATE_OBD2';
export const EDIT_OBD2 = 'obd2/EDIT_OBD2';
export const CONVERT_TO_INVOICE = 'obd2/CONVERT_TO_INVOICE';
export const REMOVE_OBD2 = 'obd2/REMOVE_OBD2';
export const REMOVE_FROM_OBD2S = 'obd2/REMOVE_FROM_OBD2S';
export const CHANGE_OBD2_STATUS = 'obd2/CHANGE_OBD2_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_OBD2_ITEMS = 'obd2/SET_EDIT_OBD2_ITEMS';
export const REMOVE_OBD2_ITEM = 'obd2/REMOVE_OBD2_ITEM';
export const REMOVE_OBD2_ITEMS = 'obd2/REMOVE_OBD2_ITEMS';
export const ADD_ITEM = 'obd2/ADD_ITEM';
export const EDIT_ITEM = 'obd2/EDIT_ITEM';
export const GET_ITEMS = 'obd2/GET_ITEMS';
export const SET_ITEMS = 'obd2/SET_ITEMS';
export const SET_OBD2_ITEMS = 'obd2/SET_OBD2_ITEMS';
export const REMOVE_ITEM = 'obd2/REMOVE_ITEM';
export const ITEM_ADD = 'obd2/ITEM_ADD';
export const ITEM_EDIT = 'obd2/ITEM_EDIT';

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


export const OBD2_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const OBD2S_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const OBD2S_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`obd2s.tabs.${name}`, { locale: language })
};

export const OBD2S_TABS = {
    GENERIC: 'GENERIC',
    BYBRAND: 'BYBRAND',
 };

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_OBD2_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const OBD2S_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const OBD2_ACTIONS = {
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


export const EDIT_OBD2_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("obd2s.actions.markAsSent", { locale: language }),
        value: OBD2_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("obd2s.actions.markAsAccepted", { locale: language }),
        value: OBD2_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("obd2s.actions.markAsRejected", { locale: language }),
        value: OBD2_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("obd2s.actions.delete", { locale: language }),
        value: OBD2_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("obd2s.actions.convertToInvoice", { locale: language }),
            value: OBD2_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("obd2s.actions.sendEstimate", { locale: language }),
            value: OBD2_ACTIONS.SEND
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

export const GET_OBD2S_URL = (param) => `obd2s?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_OBD2_URL = () => `obd2s`
export const EDIT_OBD2_URL = (obd2) => `obd2s/${obd2.id}`
export const REMOVE_OBD2_URL = (id) => `obd2s/${id}`
export const CHANGE_OBD2_STATUS_URL = (action) => `obd2s/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_OBD2_URL = (id) => `obd2s/${id}/edit`
export const GET_CREATE_OBD2_URL = () => `obd2s/create`

export const CONVERT_TO_INVOICE_URL = (id) => `obd2s/${id}/convert-to-invoice`
