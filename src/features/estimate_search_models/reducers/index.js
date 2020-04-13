import {
    SET_ESTIMATE_SEARCH_MODELS,
    CLEAR_ESTIMATE_SEARCH_MODELS,
    ESTIMATE_SEARCH_MODELS_TRIGGER_SPINNER,
    GET_ESTIMATE_SEARCH_MODELS,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_ESTIMATE_SEARCH_MODEL,
    SET_ESTIMATE_SEARCH_MODEL_ITEMS,
    SET_EDIT_ESTIMATE_SEARCH_MODEL_ITEMS,
    REMOVE_ESTIMATE_SEARCH_MODEL_ITEM,
    SET_EDIT_ESTIMATE_SEARCH_MODEL,
    REMOVE_ESTIMATE_SEARCH_MODEL_ITEMS,
    CLEAR_ESTIMATE_SEARCH_MODEL,
    SET_ESTIMATE_SEARCH_MODEL,
    REMOVE_FROM_ESTIMATE_SEARCH_MODELS
} from "../constants";

const initialState = {
    estimate_search_models: [],
    items: [],
    errors: null,
    loading: {
        estimate_search_modelsLoading: false,
        itemsLoading: false,
        estimate_search_modelLoading: false,
        initEstimateLoading: false
    },
    estimate_search_modelData: {
        estimate_search_model: null,
        estimate_search_modelTemplates: [],
        nextEstimateNumber: '',
    },
    estimate_search_modelItems: [],
};

export default function estimate_search_modelsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_ESTIMATE_SEARCH_MODELS:
            let { estimate_search_models, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, estimate_search_models: [ ...estimate_search_models, ...state.estimate_search_models] };
            }

            if (!fresh) {
                return { ...state, estimate_search_models: [...state.estimate_search_models, ...estimate_search_models] };
            }

            return { ...state, estimate_search_models };

        case CLEAR_ESTIMATE_SEARCH_MODELS:
            return { ...state, estimate_search_models: [] };

        case CLEAR_ESTIMATE_SEARCH_MODEL:
            return {
                ...state,
                estimate_search_modelItems: [],
                items: [],
                estimate_search_modelData: {
                    estimate_search_model: null,
                    estimate_search_modelTemplates: []
                }
            };

        case GET_ESTIMATE_SEARCH_MODELS:
            return { ...state };

        case SET_ESTIMATE_SEARCH_MODEL:

            return { ...state, estimate_search_modelData: payload };

        case SET_EDIT_ESTIMATE_SEARCH_MODEL:
            return { ...state, ...payload };

        case ESTIMATE_SEARCH_MODELS_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_ESTIMATE_SEARCH_MODEL_ITEMS:

            const { estimate_search_modelItem } = payload;

            return { ...state, estimate_search_modelItems: [...state.estimate_search_modelItems, ...estimate_search_modelItem] };

        case REMOVE_ESTIMATE_SEARCH_MODEL_ITEM:

            const { id } = payload;

            const estimate_search_modelItems = state.estimate_search_modelItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, estimate_search_modelItems };

        case REMOVE_ESTIMATE_SEARCH_MODEL_ITEMS:

            return { ...state, estimate_search_modelItems: [] };

        case REMOVE_FROM_ESTIMATE_SEARCH_MODELS:

            const newEstimates = state.estimate_search_models.filter(val => val.id !== payload.id)

            return { ...state, estimate_search_models: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
