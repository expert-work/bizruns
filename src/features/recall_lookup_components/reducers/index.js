import {
    SET_RECALL_LOOKUP_COMPONENTS,
    CLEAR_RECALL_LOOKUP_COMPONENTS,
    RECALL_LOOKUP_COMPONENTS_TRIGGER_SPINNER,
    GET_RECALL_LOOKUP_COMPONENTS,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_RECALL_LOOKUP_COMPONENT,
    SET_RECALL_LOOKUP_COMPONENT_ITEMS,
    SET_EDIT_RECALL_LOOKUP_COMPONENT_ITEMS,
    REMOVE_RECALL_LOOKUP_COMPONENT_ITEM,
    SET_EDIT_RECALL_LOOKUP_COMPONENT,
    REMOVE_RECALL_LOOKUP_COMPONENT_ITEMS,
    CLEAR_RECALL_LOOKUP_COMPONENT,
    SET_RECALL_LOOKUP_COMPONENT,
    REMOVE_FROM_RECALL_LOOKUP_COMPONENTS
} from "../constants";

const initialState = {
    recall_lookup_components: [],
    items: [],
    errors: null,
    loading: {
        recall_lookup_componentsLoading: false,
        itemsLoading: false,
        recall_lookup_componentLoading: false,
        initEstimateLoading: false
    },
    recall_lookup_componentData: {
        recall_lookup_component: null,
        recall_lookup_componentTemplates: [],
        nextEstimateNumber: '',
    },
    recall_lookup_componentItems: [],
};

export default function recall_lookup_componentsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_RECALL_LOOKUP_COMPONENTS:
            let { recall_lookup_components, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, recall_lookup_components: [ ...recall_lookup_components, ...state.recall_lookup_components] };
            }

            if (!fresh) {
                return { ...state, recall_lookup_components: [...state.recall_lookup_components, ...recall_lookup_components] };
            }

            return { ...state, recall_lookup_components };

        case CLEAR_RECALL_LOOKUP_COMPONENTS:
            return { ...state, recall_lookup_components: [] };

        case CLEAR_RECALL_LOOKUP_COMPONENT:
            return {
                ...state,
                recall_lookup_componentItems: [],
                items: [],
                recall_lookup_componentData: {
                    recall_lookup_component: null,
                    recall_lookup_componentTemplates: []
                }
            };

        case GET_RECALL_LOOKUP_COMPONENTS:
            return { ...state };

        case SET_RECALL_LOOKUP_COMPONENT:

            return { ...state, recall_lookup_componentData: payload };

        case SET_EDIT_RECALL_LOOKUP_COMPONENT:
            return { ...state, ...payload };

        case RECALL_LOOKUP_COMPONENTS_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_RECALL_LOOKUP_COMPONENT_ITEMS:

            const { recall_lookup_componentItem } = payload;

            return { ...state, recall_lookup_componentItems: [...state.recall_lookup_componentItems, ...recall_lookup_componentItem] };

        case REMOVE_RECALL_LOOKUP_COMPONENT_ITEM:

            const { id } = payload;

            const recall_lookup_componentItems = state.recall_lookup_componentItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, recall_lookup_componentItems };

        case REMOVE_RECALL_LOOKUP_COMPONENT_ITEMS:

            return { ...state, recall_lookup_componentItems: [] };

        case REMOVE_FROM_RECALL_LOOKUP_COMPONENTS:

            const newEstimates = state.recall_lookup_components.filter(val => val.id !== payload.id)

            return { ...state, recall_lookup_components: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
