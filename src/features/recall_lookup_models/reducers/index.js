import {
    SET_RECALL_LOOKUP_MODELS,
    CLEAR_RECALL_LOOKUP_MODELS,
    RECALL_LOOKUP_MODELS_TRIGGER_SPINNER,
    GET_RECALL_LOOKUP_MODELS,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_RECALL_LOOKUP_MODEL,
    SET_RECALL_LOOKUP_MODEL_ITEMS,
    SET_EDIT_RECALL_LOOKUP_MODEL_ITEMS,
    REMOVE_RECALL_LOOKUP_MODEL_ITEM,
    SET_EDIT_RECALL_LOOKUP_MODEL,
    REMOVE_RECALL_LOOKUP_MODEL_ITEMS,
    CLEAR_RECALL_LOOKUP_MODEL,
    SET_RECALL_LOOKUP_MODEL,
    REMOVE_FROM_RECALL_LOOKUP_MODELS
} from "../constants";

const initialState = {
    recall_lookup_models: [],
    items: [],
    errors: null,
    loading: {
        recall_lookup_modelsLoading: false,
        itemsLoading: false,
        recall_lookup_modelLoading: false,
        initEstimateLoading: false
    },
    recall_lookup_modelData: {
        recall_lookup_model: null,
        recall_lookup_modelTemplates: [],
        nextEstimateNumber: '',
    },
    recall_lookup_modelItems: [],
};

export default function recall_lookup_modelsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_RECALL_LOOKUP_MODELS:
            let { recall_lookup_models, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, recall_lookup_models: [ ...recall_lookup_models, ...state.recall_lookup_models] };
            }

            if (!fresh) {
                return { ...state, recall_lookup_models: [...state.recall_lookup_models, ...recall_lookup_models] };
            }

            return { ...state, recall_lookup_models };

        case CLEAR_RECALL_LOOKUP_MODELS:
            return { ...state, recall_lookup_models: [] };

        case CLEAR_RECALL_LOOKUP_MODEL:
            return {
                ...state,
                recall_lookup_modelItems: [],
                items: [],
                recall_lookup_modelData: {
                    recall_lookup_model: null,
                    recall_lookup_modelTemplates: []
                }
            };

        case GET_RECALL_LOOKUP_MODELS:
            return { ...state };

        case SET_RECALL_LOOKUP_MODEL:

            return { ...state, recall_lookup_modelData: payload };

        case SET_EDIT_RECALL_LOOKUP_MODEL:
            return { ...state, ...payload };

        case RECALL_LOOKUP_MODELS_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_RECALL_LOOKUP_MODEL_ITEMS:

            const { recall_lookup_modelItem } = payload;

            return { ...state, recall_lookup_modelItems: [...state.recall_lookup_modelItems, ...recall_lookup_modelItem] };

        case REMOVE_RECALL_LOOKUP_MODEL_ITEM:

            const { id } = payload;

            const recall_lookup_modelItems = state.recall_lookup_modelItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, recall_lookup_modelItems };

        case REMOVE_RECALL_LOOKUP_MODEL_ITEMS:

            return { ...state, recall_lookup_modelItems: [] };

        case REMOVE_FROM_RECALL_LOOKUP_MODELS:

            const newEstimates = state.recall_lookup_models.filter(val => val.id !== payload.id)

            return { ...state, recall_lookup_models: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
