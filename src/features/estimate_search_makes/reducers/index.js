import {
    SET_ESTIMATE_SEARCH_MAKES,
    CLEAR_ESTIMATE_SEARCH_MAKES,
    ESTIMATE_SEARCH_MAKES_TRIGGER_SPINNER,
    GET_ESTIMATE_SEARCH_MAKES,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_ESTIMATE_SEARCH_MAKE,
    SET_ESTIMATE_SEARCH_MAKE_ITEMS,
    SET_EDIT_ESTIMATE_SEARCH_MAKE_ITEMS,
    REMOVE_ESTIMATE_SEARCH_MAKE_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_MAKE,
    REMOVE_ESTIMATE_SEARCH_MAKE_ITEMS,
    CLEAR_ESTIMATE_SEARCH_MAKE,
    SET_ESTIMATE_SEARCH_MAKE,
    REMOVE_FROM_ESTIMATE_SEARCH_MAKES
} from "../constants";

const initialState = {
    estimate_search_makes: [],
    items: [],
    errors: null,
    loading: {
        estimate_search_makesLoading: false,
        itemsLoading: false,
        estimate_search_makeLoading: false,
        initEstimateLoading: false
    },
    estimate_search_makeData: {
        estimate_search_make: null,
        estimate_search_makeTemplates: [],
        nextEstimateNumber: '',
    },
    estimate_search_makeItems: [],
};

export default function estimate_search_makesReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_ESTIMATE_SEARCH_MAKES:
            let { estimate_search_makes, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, estimate_search_makes: [ ...estimate_search_makes, ...state.estimate_search_makes] };
            }

            if (!fresh) {
                return { ...state, estimate_search_makes: [...state.estimate_search_makes, ...estimate_search_makes] };
            }

            return { ...state, estimate_search_makes };

        case CLEAR_ESTIMATE_SEARCH_MAKES:
            return { ...state, estimate_search_makes: [] };

        case CLEAR_ESTIMATE_SEARCH_MAKE:
            return {
                ...state,
                estimate_search_makeItems: [],
                items: [],
                estimate_search_makeData: {
                    estimate_search_make: null,
                    estimate_search_makeTemplates: []
                }
            };

        case GET_ESTIMATE_SEARCH_MAKES:
            return { ...state };

        case SET_ESTIMATE_SEARCH_MAKE:

            return { ...state, estimate_search_makeData: payload };

        case SET_EDIT_ESTIMATE_SEARCH_MAKE:
            return { ...state, ...payload };

        case ESTIMATE_SEARCH_MAKES_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_ESTIMATE_SEARCH_MAKE_ITEMS:

            const { estimate_search_makeItem } = payload;

            return { ...state, estimate_search_makeItems: [...state.estimate_search_makeItems, ...estimate_search_makeItem] };

        case REMOVE_ESTIMATE_SEARCH_MAKE_ITEM:

            const { id } = payload;

            const estimate_search_makeItems = state.estimate_search_makeItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, estimate_search_makeItems };

        case REMOVE_ESTIMATE_SEARCH_MAKE_ITEMS:

            return { ...state, estimate_search_makeItems: [] };

        case REMOVE_FROM_ESTIMATE_SEARCH_MAKES:

            const newEstimates = state.estimate_search_makes.filter(val => val.id !== payload.id)

            return { ...state, estimate_search_makes: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
