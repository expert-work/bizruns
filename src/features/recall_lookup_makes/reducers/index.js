import {
    SET_RECALL_LOOKUP_MAKES,
    CLEAR_RECALL_LOOKUP_MAKES,
    RECALL_LOOKUP_MAKES_TRIGGER_SPINNER,
    GET_RECALL_LOOKUP_MAKES,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_RECALL_LOOKUP_MAKE,
    SET_RECALL_LOOKUP_MAKE_ITEMS,
    SET_EDIT_RECALL_LOOKUP_MAKE_ITEMS,
    REMOVE_RECALL_LOOKUP_MAKE_ITEM,
    SET_EDIT_RECALL_LOOKUP_MAKE,
    REMOVE_RECALL_LOOKUP_MAKE_ITEMS,
    CLEAR_RECALL_LOOKUP_MAKE,
    SET_RECALL_LOOKUP_MAKE,
    REMOVE_FROM_RECALL_LOOKUP_MAKES
} from "../constants";

const initialState = {
    recall_lookup_makes: [],
    items: [],
    errors: null,
    loading: {
        recall_lookup_makesLoading: false,
        itemsLoading: false,
        recall_lookup_makeLoading: false,
        initEstimateLoading: false
    },
    recall_lookup_makeData: {
        recall_lookup_make: null,
        recall_lookup_makeTemplates: [],
        nextEstimateNumber: '',
    },
    recall_lookup_makeItems: [],
};

export default function recall_lookup_makesReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_RECALL_LOOKUP_MAKES:
            let { recall_lookup_makes, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, recall_lookup_makes: [ ...recall_lookup_makes, ...state.recall_lookup_makes] };
            }

            if (!fresh) {
                return { ...state, recall_lookup_makes: [...state.recall_lookup_makes, ...recall_lookup_makes] };
            }

            return { ...state, recall_lookup_makes };

        case CLEAR_RECALL_LOOKUP_MAKES:
            return { ...state, recall_lookup_makes: [] };

        case CLEAR_RECALL_LOOKUP_MAKE:
            return {
                ...state,
                recall_lookup_makeItems: [],
                items: [],
                recall_lookup_makeData: {
                    recall_lookup_make: null,
                    recall_lookup_makeTemplates: []
                }
            };

        case GET_RECALL_LOOKUP_MAKES:
            return { ...state };

        case SET_RECALL_LOOKUP_MAKE:

            return { ...state, recall_lookup_makeData: payload };

        case SET_EDIT_RECALL_LOOKUP_MAKE:
            return { ...state, ...payload };

        case RECALL_LOOKUP_MAKES_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_RECALL_LOOKUP_MAKE_ITEMS:

            const { recall_lookup_makeItem } = payload;

            return { ...state, recall_lookup_makeItems: [...state.recall_lookup_makeItems, ...recall_lookup_makeItem] };

        case REMOVE_RECALL_LOOKUP_MAKE_ITEM:

            const { id } = payload;

            const recall_lookup_makeItems = state.recall_lookup_makeItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, recall_lookup_makeItems };

        case REMOVE_RECALL_LOOKUP_MAKE_ITEMS:

            return { ...state, recall_lookup_makeItems: [] };

        case REMOVE_FROM_RECALL_LOOKUP_MAKES:

            const newEstimates = state.recall_lookup_makes.filter(val => val.id !== payload.id)

            return { ...state, recall_lookup_makes: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
