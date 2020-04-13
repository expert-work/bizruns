import {
    SET_ESTIMATE_SEARCHS,
    CLEAR_ESTIMATE_SEARCHS,
    ESTIMATE_SEARCHS_TRIGGER_SPINNER,
    GET_ESTIMATE_SEARCHS,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_ESTIMATE_SEARCH,
    SET_ESTIMATE_SEARCH_ITEMS,
    SET_EDIT_ESTIMATE_SEARCH_ITEMS,
    REMOVE_ESTIMATE_SEARCH_ITEM,
    SET_EDIT_ESTIMATE_SEARCH,
    REMOVE_ESTIMATE_SEARCH_ITEMS,
    CLEAR_ESTIMATE_SEARCH,
    SET_ESTIMATE_SEARCH,
    REMOVE_FROM_ESTIMATE_SEARCHS
} from "../constants";

const initialState = {
    estimate_searchs: [],
    items: [],
    errors: null,
    loading: {
        estimate_searchsLoading: false,
        itemsLoading: false,
        estimate_searchLoading: false,
        initEstimateLoading: false
    },
    estimate_searchData: {
        estimate_search: null,
        estimate_searchTemplates: [],
        nextEstimateNumber: '',
    },
    estimate_searchItems: [],
};

export default function estimate_searchsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_ESTIMATE_SEARCHS:
            let { estimate_searchs, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, estimate_searchs: [ ...estimate_searchs, ...state.estimate_searchs] };
            }

            if (!fresh) {
                return { ...state, estimate_searchs: [...state.estimate_searchs, ...estimate_searchs] };
            }

            return { ...state, estimate_searchs };

        case CLEAR_ESTIMATE_SEARCHS:
            return { ...state, estimate_searchs: [] };

        case CLEAR_ESTIMATE_SEARCH:
            return {
                ...state,
                estimate_searchItems: [],
                items: [],
                estimate_searchData: {
                    estimate_search: null,
                    estimate_searchTemplates: []
                }
            };

        case GET_ESTIMATE_SEARCHS:
            return { ...state };

        case SET_ESTIMATE_SEARCH:

            return { ...state, estimate_searchData: payload };

        case SET_EDIT_ESTIMATE_SEARCH:
            return { ...state, ...payload };

        case ESTIMATE_SEARCHS_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_ESTIMATE_SEARCH_ITEMS:

            const { estimate_searchItem } = payload;

            return { ...state, estimate_searchItems: [...state.estimate_searchItems, ...estimate_searchItem] };

        case REMOVE_ESTIMATE_SEARCH_ITEM:

            const { id } = payload;

            const estimate_searchItems = state.estimate_searchItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, estimate_searchItems };

        case REMOVE_ESTIMATE_SEARCH_ITEMS:

            return { ...state, estimate_searchItems: [] };

        case REMOVE_FROM_ESTIMATE_SEARCHS:

            const newEstimates = state.estimate_searchs.filter(val => val.id !== payload.id)

            return { ...state, estimate_searchs: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
