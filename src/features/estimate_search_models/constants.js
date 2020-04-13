import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const ESTIMATE_SEARCH_MODEL_SEARCH = 'estimate_search_modelForm/ESTIMATE_SEARCH_MODEL_SEARCH';
export const ESTIMATE_SEARCH_MODEL_FORM = 'estimate_search_modelForm/ESTIMATE_SEARCH_MODEL_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const ESTIMATE_SEARCH_MODEL_ADD = 'estimate_search_modelForm/ESTIMATE_SEARCH_MODEL_ADD';
export const ESTIMATE_SEARCH_MODEL_DETAIL = 'estimate_search_modelForm/ESTIMATE_SEARCH_MODEL_DETAIL';

// Actions
// -----------------------------------------
export const ESTIMATE_SEARCH_MODELS_TRIGGER_SPINNER = 'estimate_search_model/ESTIMATE_SEARCH_MODELS_TRIGGER_SPINNER';
export const GET_ESTIMATE_SEARCH_MODELS = 'estimate_search_model/GET_ESTIMATE_SEARCH_MODELS';
export const GET_ESTIMATE_SEARCH_MODEL_INFORMATION = 'estimate_search_model/GET_ESTIMATE_SEARCH_MODEL_INFORMATION';

export const SET_ESTIMATE_SEARCH_MODELS = 'estimate_search_model/SET_ESTIMATE_SEARCH_MODELS';

export const CLEAR_ESTIMATE_SEARCH_MODELS = 'estimate_search_model/CLEAR_ESTIMATE_SEARCH_MODELS';
export const CLEAR_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/CLEAR_ESTIMATE_SEARCH_MODEL';
export const GET_CREATE_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/GET_CREATE_ESTIMATE_SEARCH_MODEL';
export const GET_EDIT_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/GET_EDIT_ESTIMATE_SEARCH_MODEL';
export const SET_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/SET_ESTIMATE_SEARCH_MODEL';
export const SET_EDIT_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/SET_EDIT_ESTIMATE_SEARCH_MODEL';
export const CREATE_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/CREATE_ESTIMATE_SEARCH_MODEL';
export const EDIT_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/EDIT_ESTIMATE_SEARCH_MODEL';
export const CONVERT_TO_INVOICE = 'estimate_search_model/CONVERT_TO_INVOICE';
export const REMOVE_ESTIMATE_SEARCH_MODEL = 'estimate_search_model/REMOVE_ESTIMATE_SEARCH_MODEL';
export const REMOVE_FROM_ESTIMATE_SEARCH_MODELS = 'estimate_search_model/REMOVE_FROM_ESTIMATE_SEARCH_MODELS';
export const CHANGE_ESTIMATE_SEARCH_MODEL_STATUS = 'estimate_search_model/CHANGE_ESTIMATE_SEARCH_MODEL_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_ESTIMATE_SEARCH_MODEL_ITEMS = 'estimate_search_model/SET_EDIT_ESTIMATE_SEARCH_MODEL_ITEMS';
export const REMOVE_ESTIMATE_SEARCH_MODEL_ITEM = 'estimate_search_model/REMOVE_ESTIMATE_SEARCH_MODEL_ITEM';
export const REMOVE_ESTIMATE_SEARCH_MODEL_ITEMS = 'estimate_search_model/REMOVE_ESTIMATE_SEARCH_MODEL_ITEMS';
export const ADD_ITEM = 'estimate_search_model/ADD_ITEM';
export const EDIT_ITEM = 'estimate_search_model/EDIT_ITEM';
export const GET_ITEMS = 'estimate_search_model/GET_ITEMS';
export const SET_ITEMS = 'estimate_search_model/SET_ITEMS';
export const SET_ESTIMATE_SEARCH_MODEL_ITEMS = 'estimate_search_model/SET_ESTIMATE_SEARCH_MODEL_ITEMS';
export const REMOVE_ITEM = 'estimate_search_model/REMOVE_ITEM';
export const ITEM_ADD = 'estimate_search_model/ITEM_ADD';
export const ITEM_EDIT = 'estimate_search_model/ITEM_EDIT';

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


export const ESTIMATE_SEARCH_MODEL_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const ESTIMATE_SEARCH_MODELS_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const ESTIMATE_SEARCH_MODELS_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`estimate_search_models.tabs.${name}`, { locale: language })
};

export const ESTIMATE_SEARCH_MODELS_TABS = {
    MODELS: 'MODELS' 
 };

export const ESTIMATE_SEARCH_MODEL_INFORMATIONS_TABS = {
    MODELS: 'MODELS' 
 };
 

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_ESTIMATE_SEARCH_MODEL_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const ESTIMATE_SEARCH_MODELS_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const ESTIMATE_SEARCH_MODEL_ACTIONS = {
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


export const EDIT_ESTIMATE_SEARCH_MODEL_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("estimate_search_models.actions.markAsSent", { locale: language }),
        value: ESTIMATE_SEARCH_MODEL_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("estimate_search_models.actions.markAsAccepted", { locale: language }),
        value: ESTIMATE_SEARCH_MODEL_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("estimate_search_models.actions.markAsRejected", { locale: language }),
        value: ESTIMATE_SEARCH_MODEL_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("estimate_search_models.actions.delete", { locale: language }),
        value: ESTIMATE_SEARCH_MODEL_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("estimate_search_models.actions.convertToInvoice", { locale: language }),
            value: ESTIMATE_SEARCH_MODEL_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("estimate_search_models.actions.sendEstimate", { locale: language }),
            value: ESTIMATE_SEARCH_MODEL_ACTIONS.SEND
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

export const GET_ESTIMATE_SEARCH_MODELS_URL = (param) => `estimate_search_models?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_ESTIMATE_SEARCH_MODEL_URL = () => `estimate_search_models`
export const EDIT_ESTIMATE_SEARCH_MODEL_URL = (estimate_search_model) => `estimate_search_models/${estimate_search_model.id}`
export const REMOVE_ESTIMATE_SEARCH_MODEL_URL = (id) => `estimate_search_models/${id}`
export const CHANGE_ESTIMATE_SEARCH_MODEL_STATUS_URL = (action) => `estimate_search_models/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_ESTIMATE_SEARCH_MODEL_URL = (id) => `estimate_search_models/${id}/edit`
export const GET_CREATE_ESTIMATE_SEARCH_MODEL_URL = () => `estimate_search_models/create`

export const CONVERT_TO_INVOICE_URL = (id) => `estimate_search_models/${id}/convert-to-invoice`
