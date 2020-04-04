import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const RECALL_LOOKUP_MODEL_SEARCH = 'recall_lookup_modelForm/RECALL_LOOKUP_MODEL_SEARCH';
export const RECALL_LOOKUP_MODEL_FORM = 'recall_lookup_modelForm/RECALL_LOOKUP_MODEL_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const RECALL_LOOKUP_MODEL_ADD = 'recall_lookup_modelForm/RECALL_LOOKUP_MODEL_ADD';
export const RECALL_LOOKUP_MODEL_DETAIL = 'recall_lookup_modelForm/RECALL_LOOKUP_MODEL_DETAIL';

// Actions
// -----------------------------------------
export const RECALL_LOOKUP_MODELS_TRIGGER_SPINNER = 'recall_lookup_model/RECALL_LOOKUP_MODELS_TRIGGER_SPINNER';
export const GET_RECALL_LOOKUP_MODELS = 'recall_lookup_model/GET_RECALL_LOOKUP_MODELS';
export const SET_RECALL_LOOKUP_MODELS = 'recall_lookup_model/SET_RECALL_LOOKUP_MODELS';

export const CLEAR_RECALL_LOOKUP_MODELS = 'recall_lookup_model/CLEAR_RECALL_LOOKUP_MODELS';
export const CLEAR_RECALL_LOOKUP_MODEL = 'recall_lookup_model/CLEAR_RECALL_LOOKUP_MODEL';
export const GET_CREATE_RECALL_LOOKUP_MODEL = 'recall_lookup_model/GET_CREATE_RECALL_LOOKUP_MODEL';
export const GET_EDIT_RECALL_LOOKUP_MODEL = 'recall_lookup_model/GET_EDIT_RECALL_LOOKUP_MODEL';
export const SET_RECALL_LOOKUP_MODEL = 'recall_lookup_model/SET_RECALL_LOOKUP_MODEL';
export const SET_EDIT_RECALL_LOOKUP_MODEL = 'recall_lookup_model/SET_EDIT_RECALL_LOOKUP_MODEL';
export const CREATE_RECALL_LOOKUP_MODEL = 'recall_lookup_model/CREATE_RECALL_LOOKUP_MODEL';
export const EDIT_RECALL_LOOKUP_MODEL = 'recall_lookup_model/EDIT_RECALL_LOOKUP_MODEL';
export const CONVERT_TO_INVOICE = 'recall_lookup_model/CONVERT_TO_INVOICE';
export const REMOVE_RECALL_LOOKUP_MODEL = 'recall_lookup_model/REMOVE_RECALL_LOOKUP_MODEL';
export const REMOVE_FROM_RECALL_LOOKUP_MODELS = 'recall_lookup_model/REMOVE_FROM_RECALL_LOOKUP_MODELS';
export const CHANGE_RECALL_LOOKUP_MODEL_STATUS = 'recall_lookup_model/CHANGE_RECALL_LOOKUP_MODEL_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_RECALL_LOOKUP_MODEL_ITEMS = 'recall_lookup_model/SET_EDIT_RECALL_LOOKUP_MODEL_ITEMS';
export const REMOVE_RECALL_LOOKUP_MODEL_ITEM = 'recall_lookup_model/REMOVE_RECALL_LOOKUP_MODEL_ITEM';
export const REMOVE_RECALL_LOOKUP_MODEL_ITEMS = 'recall_lookup_model/REMOVE_RECALL_LOOKUP_MODEL_ITEMS';
export const ADD_ITEM = 'recall_lookup_model/ADD_ITEM';
export const EDIT_ITEM = 'recall_lookup_model/EDIT_ITEM';
export const GET_ITEMS = 'recall_lookup_model/GET_ITEMS';
export const SET_ITEMS = 'recall_lookup_model/SET_ITEMS';
export const SET_RECALL_LOOKUP_MODEL_ITEMS = 'recall_lookup_model/SET_RECALL_LOOKUP_MODEL_ITEMS';
export const REMOVE_ITEM = 'recall_lookup_model/REMOVE_ITEM';
export const ITEM_ADD = 'recall_lookup_model/ITEM_ADD';
export const ITEM_EDIT = 'recall_lookup_model/ITEM_EDIT';

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


export const RECALL_LOOKUP_MODEL_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const RECALL_LOOKUP_MODELS_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const RECALL_LOOKUP_MODELS_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`recall_lookup_models.tabs.${name}`, { locale: language })
};

export const RECALL_LOOKUP_MODELS_TABS = {
    MODEL: 'MODEL',
    BYBRAND: 'BYBRAND',
 };

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_RECALL_LOOKUP_MODEL_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const RECALL_LOOKUP_MODELS_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const RECALL_LOOKUP_MODEL_ACTIONS = {
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


export const EDIT_RECALL_LOOKUP_MODEL_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("recall_lookup_models.actions.markAsSent", { locale: language }),
        value: RECALL_LOOKUP_MODEL_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("recall_lookup_models.actions.markAsAccepted", { locale: language }),
        value: RECALL_LOOKUP_MODEL_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("recall_lookup_models.actions.markAsRejected", { locale: language }),
        value: RECALL_LOOKUP_MODEL_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("recall_lookup_models.actions.delete", { locale: language }),
        value: RECALL_LOOKUP_MODEL_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("recall_lookup_models.actions.convertToInvoice", { locale: language }),
            value: RECALL_LOOKUP_MODEL_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("recall_lookup_models.actions.sendEstimate", { locale: language }),
            value: RECALL_LOOKUP_MODEL_ACTIONS.SEND
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

export const GET_RECALL_LOOKUP_MODELS_URL = (param) => `recall_lookup_models?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_RECALL_LOOKUP_MODEL_URL = () => `recall_lookup_models`
export const EDIT_RECALL_LOOKUP_MODEL_URL = (recall_lookup_model) => `recall_lookup_models/${recall_lookup_model.id}`
export const REMOVE_RECALL_LOOKUP_MODEL_URL = (id) => `recall_lookup_models/${id}`
export const CHANGE_RECALL_LOOKUP_MODEL_STATUS_URL = (action) => `recall_lookup_models/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_RECALL_LOOKUP_MODEL_URL = (id) => `recall_lookup_models/${id}/edit`
export const GET_CREATE_RECALL_LOOKUP_MODEL_URL = () => `recall_lookup_models/create`

export const CONVERT_TO_INVOICE_URL = (id) => `recall_lookup_models/${id}/convert-to-invoice`
