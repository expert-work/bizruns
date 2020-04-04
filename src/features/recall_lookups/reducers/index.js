import {
    SET_RECALL_LOOKUPS,
    CLEAR_RECALL_LOOKUPS,
    RECALL_LOOKUPS_TRIGGER_SPINNER,
    GET_RECALL_LOOKUPS,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_RECALL_LOOKUP,
    SET_RECALL_LOOKUP_ITEMS,
    SET_EDIT_RECALL_LOOKUP_ITEMS,
    REMOVE_RECALL_LOOKUP_ITEM,
    SET_EDIT_RECALL_LOOKUP,
    REMOVE_RECALL_LOOKUP_ITEMS,
    CLEAR_RECALL_LOOKUP,
    SET_RECALL_LOOKUP,
    REMOVE_FROM_RECALL_LOOKUPS
} from "../constants";

const initialState = {
    recall_lookups: [],
    items: [],
    errors: null,
    loading: {
        recall_lookupsLoading: false,
        itemsLoading: false,
        recall_lookupLoading: false,
        initEstimateLoading: false
    },
    recall_lookupData: {
        recall_lookup: null,
        recall_lookupTemplates: [],
        nextEstimateNumber: '',
    },
    recall_lookupItems: [],
};

export default function recall_lookupsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_RECALL_LOOKUPS:
            let { recall_lookups, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, recall_lookups: [ ...recall_lookups, ...state.recall_lookups] };
            }

            if (!fresh) {
                return { ...state, recall_lookups: [...state.recall_lookups, ...recall_lookups] };
            }

            return { ...state, recall_lookups };

        case CLEAR_RECALL_LOOKUPS:
            return { ...state, recall_lookups: [] };

        case CLEAR_RECALL_LOOKUP:
            return {
                ...state,
                recall_lookupItems: [],
                items: [],
                recall_lookupData: {
                    recall_lookup: null,
                    recall_lookupTemplates: []
                }
            };

        case GET_RECALL_LOOKUPS:
            return { ...state };

        case SET_RECALL_LOOKUP:

            return { ...state, recall_lookupData: payload };

        case SET_EDIT_RECALL_LOOKUP:
            return { ...state, ...payload };

        case RECALL_LOOKUPS_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_RECALL_LOOKUP_ITEMS:

            const { recall_lookupItem } = payload;

            return { ...state, recall_lookupItems: [...state.recall_lookupItems, ...recall_lookupItem] };

        case REMOVE_RECALL_LOOKUP_ITEM:

            const { id } = payload;

            const recall_lookupItems = state.recall_lookupItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, recall_lookupItems };

        case REMOVE_RECALL_LOOKUP_ITEMS:

            return { ...state, recall_lookupItems: [] };

        case REMOVE_FROM_RECALL_LOOKUPS:

            const newEstimates = state.recall_lookups.filter(val => val.id !== payload.id)

            return { ...state, recall_lookups: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
