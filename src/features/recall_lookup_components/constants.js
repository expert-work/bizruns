import queryString from 'query-string';
import Lng from "../../api/lang/i18n";
import { colors } from "../../styles/colors";

//  Forms
// -----------------------------------------
export const RECALL_LOOKUP_COMPONENT_SEARCH = 'recall_lookup_componentForm/RECALL_LOOKUP_COMPONENT_SEARCH';
export const RECALL_LOOKUP_COMPONENT_FORM = 'recall_lookup_componentForm/RECALL_LOOKUP_COMPONENT_DETAIL';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const RECALL_LOOKUP_COMPONENT_ADD = 'recall_lookup_componentForm/RECALL_LOOKUP_COMPONENT_ADD';
export const RECALL_LOOKUP_COMPONENT_DETAIL = 'recall_lookup_componentForm/RECALL_LOOKUP_COMPONENT_DETAIL';

// Actions
// -----------------------------------------
export const RECALL_LOOKUP_COMPONENTS_TRIGGER_SPINNER = 'recall_lookup_component/RECALL_LOOKUP_COMPONENTS_TRIGGER_SPINNER';
export const GET_RECALL_LOOKUP_COMPONENTS = 'recall_lookup_component/GET_RECALL_LOOKUP_COMPONENTS';
export const SET_RECALL_LOOKUP_COMPONENTS = 'recall_lookup_component/SET_RECALL_LOOKUP_COMPONENTS';

export const CLEAR_RECALL_LOOKUP_COMPONENTS = 'recall_lookup_component/CLEAR_RECALL_LOOKUP_COMPONENTS';
export const CLEAR_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/CLEAR_RECALL_LOOKUP_COMPONENT';
export const GET_CREATE_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/GET_CREATE_RECALL_LOOKUP_COMPONENT';
export const GET_EDIT_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/GET_EDIT_RECALL_LOOKUP_COMPONENT';
export const SET_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/SET_RECALL_LOOKUP_COMPONENT';
export const SET_EDIT_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/SET_EDIT_RECALL_LOOKUP_COMPONENT';
export const CREATE_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/CREATE_RECALL_LOOKUP_COMPONENT';
export const EDIT_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/EDIT_RECALL_LOOKUP_COMPONENT';
export const CONVERT_TO_INVOICE = 'recall_lookup_component/CONVERT_TO_INVOICE';
export const REMOVE_RECALL_LOOKUP_COMPONENT = 'recall_lookup_component/REMOVE_RECALL_LOOKUP_COMPONENT';
export const REMOVE_FROM_RECALL_LOOKUP_COMPONENTS = 'recall_lookup_component/REMOVE_FROM_RECALL_LOOKUP_COMPONENTS';
export const CHANGE_RECALL_LOOKUP_COMPONENT_STATUS = 'recall_lookup_component/CHANGE_RECALL_LOOKUP_COMPONENT_STATUS';

// Items
// -----------------------------------------
export const SET_EDIT_RECALL_LOOKUP_COMPONENT_ITEMS = 'recall_lookup_component/SET_EDIT_RECALL_LOOKUP_COMPONENT_ITEMS';
export const REMOVE_RECALL_LOOKUP_COMPONENT_ITEM = 'recall_lookup_component/REMOVE_RECALL_LOOKUP_COMPONENT_ITEM';
export const REMOVE_RECALL_LOOKUP_COMPONENT_ITEMS = 'recall_lookup_component/REMOVE_RECALL_LOOKUP_COMPONENT_ITEMS';
export const ADD_ITEM = 'recall_lookup_component/ADD_ITEM';
export const EDIT_ITEM = 'recall_lookup_component/EDIT_ITEM';
export const GET_ITEMS = 'recall_lookup_component/GET_ITEMS';
export const SET_ITEMS = 'recall_lookup_component/SET_ITEMS';
export const SET_RECALL_LOOKUP_COMPONENT_ITEMS = 'recall_lookup_component/SET_RECALL_LOOKUP_COMPONENT_ITEMS';
export const REMOVE_ITEM = 'recall_lookup_component/REMOVE_ITEM';
export const ITEM_ADD = 'recall_lookup_component/ITEM_ADD';
export const ITEM_EDIT = 'recall_lookup_component/ITEM_EDIT';

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


export const RECALL_LOOKUP_COMPONENT_DISCOUNT_OPTION = [
    {
        value: 'percentage',
        displayLabel: '%',
        label: 'Percentage',
    },
];


export const RECALL_LOOKUP_COMPONENTS_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    EXPIRED: colors.dangerLight,
    REJECTED: colors.gray2,
    ACCEPTED: colors.successLight2,
};

export const RECALL_LOOKUP_COMPONENTS_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    EXPIRED: colors.dangerDark,
    REJECTED: colors.darkGray2,
    ACCEPTED: colors.successDark,
};


export const TAB_NAME = (name, language, Lng) => {
    return Lng.t(`recall_lookup_components.tabs.${name}`, { locale: language })
};

export const RECALL_LOOKUP_COMPONENTS_TABS = {
    ALL: 'ALL',
 };

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_RECALL_LOOKUP_COMPONENT_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'EXPIRED', value: 'EXPIRED' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
]

export const RECALL_LOOKUP_COMPONENTS_STATUS = {
    SENT: 'danger',
    DRAFT: 'warning',
    PAID: 'success',
};


export const RECALL_LOOKUP_COMPONENT_ACTIONS = {
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


export const EDIT_RECALL_LOOKUP_COMPONENT_ACTIONS = (language, markAs = '') => {

    const markAsSent = [{
        label: Lng.t("recall_lookup_components.actions.markAsSent", { locale: language }),
        value: RECALL_LOOKUP_COMPONENT_ACTIONS.MARK_AS_SENT
    }]

    const markAsAccept = [{
        label: Lng.t("recall_lookup_components.actions.markAsAccepted", { locale: language }),
        value: RECALL_LOOKUP_COMPONENT_ACTIONS.MARK_AS_ACCEPTED
    }]

    const markAsReject = [{
        label: Lng.t("recall_lookup_components.actions.markAsRejected", { locale: language }),
        value: RECALL_LOOKUP_COMPONENT_ACTIONS.MARK_AS_REJECTED
    }]

    const deleteAction = [{
        label: Lng.t("recall_lookup_components.actions.delete", { locale: language }),
        value: RECALL_LOOKUP_COMPONENT_ACTIONS.DELETE
    }]

    const actions = [
        {
            label: Lng.t("recall_lookup_components.actions.convertToInvoice", { locale: language }),
            value: RECALL_LOOKUP_COMPONENT_ACTIONS.CONVERT_TO_INVOICE
        },
        {
            label: Lng.t("recall_lookup_components.actions.sendEstimate", { locale: language }),
            value: RECALL_LOOKUP_COMPONENT_ACTIONS.SEND
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

export const GET_RECALL_LOOKUP_COMPONENTS_URL = (param) => `recall_lookup_components?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const GET_ITEMS_URL = (q, search, page, limit) => `items?search=${q ? q : search}&page=${page}&limit=${limit}`

export const CREATE_RECALL_LOOKUP_COMPONENT_URL = () => `recall_lookup_components`
export const EDIT_RECALL_LOOKUP_COMPONENT_URL = (recall_lookup_component) => `recall_lookup_components/${recall_lookup_component.id}`
export const REMOVE_RECALL_LOOKUP_COMPONENT_URL = (id) => `recall_lookup_components/${id}`
export const CHANGE_RECALL_LOOKUP_COMPONENT_STATUS_URL = (action) => `recall_lookup_components/${action}`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (item_id) => `items/${item_id}`

export const GET_EDIT_RECALL_LOOKUP_COMPONENT_URL = (id) => `recall_lookup_components/${id}/edit`
export const GET_CREATE_RECALL_LOOKUP_COMPONENT_URL = () => `recall_lookup_components/create`

export const CONVERT_TO_INVOICE_URL = (id) => `recall_lookup_components/${id}/convert-to-invoice`
