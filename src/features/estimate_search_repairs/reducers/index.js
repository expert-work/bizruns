import {
    SET_ESTIMATE_SEARCH_REPAIRS,
    CLEAR_ESTIMATE_SEARCH_REPAIRS,
    ESTIMATE_SEARCH_REPAIRS_TRIGGER_SPINNER,
    GET_ESTIMATE_SEARCH_REPAIRS,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_ESTIMATE_SEARCH_REPAIR,
    SET_ESTIMATE_SEARCH_REPAIR_ITEMS,
    SET_EDIT_ESTIMATE_SEARCH_REPAIR_ITEMS,
    REMOVE_ESTIMATE_SEARCH_REPAIR_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_REPAIR,
    REMOVE_ESTIMATE_SEARCH_REPAIR_ITEMS,
    CLEAR_ESTIMATE_SEARCH_REPAIR,
    SET_ESTIMATE_SEARCH_REPAIR,
    REMOVE_FROM_ESTIMATE_SEARCH_REPAIRS
} from "../constants";

const initialState = {
    estimate_search_repairs: [],
    items: [],
    errors: null,
    loading: {
        estimate_search_repairsLoading: false,
        itemsLoading: false,
        estimate_search_repairLoading: false,
        initEstimateLoading: false
    },
    estimate_search_repairData: {
        estimate_search_repair: null,
        estimate_search_repairTemplates: [],
        nextEstimateNumber: '',
    },
    estimate_search_repairItems: [],
};

export default function estimate_search_repairsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_ESTIMATE_SEARCH_REPAIRS:
            let { estimate_search_repairs, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, estimate_search_repairs: [ ...estimate_search_repairs, ...state.estimate_search_repairs] };
            }

            if (!fresh) {
                return { ...state, estimate_search_repairs: [...state.estimate_search_repairs, ...estimate_search_repairs] };
            }

            return { ...state, estimate_search_repairs };

        case CLEAR_ESTIMATE_SEARCH_REPAIRS:
            return { ...state, estimate_search_repairs: [] };

        case CLEAR_ESTIMATE_SEARCH_REPAIR:
            return {
                ...state,
                estimate_search_repairItems: [],
                items: [],
                estimate_search_repairData: {
                    estimate_search_repair: null,
                    estimate_search_repairTemplates: []
                }
            };

        case GET_ESTIMATE_SEARCH_REPAIRS:
            return { ...state };

        case SET_ESTIMATE_SEARCH_REPAIR:

            return { ...state, estimate_search_repairData: payload };

        case SET_EDIT_ESTIMATE_SEARCH_REPAIR:
            return { ...state, ...payload };

        case ESTIMATE_SEARCH_REPAIRS_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_ESTIMATE_SEARCH_REPAIR_ITEMS:

            const { estimate_search_repairItem } = payload;

            return { ...state, estimate_search_repairItems: [...state.estimate_search_repairItems, ...estimate_search_repairItem] };

        case REMOVE_ESTIMATE_SEARCH_REPAIR_ITEM:

            const { id } = payload;

            const estimate_search_repairItems = state.estimate_search_repairItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, estimate_search_repairItems };

        case REMOVE_ESTIMATE_SEARCH_REPAIR_ITEMS:

            return { ...state, estimate_search_repairItems: [] };

        case REMOVE_FROM_ESTIMATE_SEARCH_REPAIRS:

            const newEstimates = state.estimate_search_repairs.filter(val => val.id !== payload.id)

            return { ...state, estimate_search_repairs: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
