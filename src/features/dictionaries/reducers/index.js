import {
    SET_DICTIONARIES,
    CLEAR_DICTIONARIES,
    DICTIONARIES_TRIGGER_SPINNER,
    GET_DICTIONARIES,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_DICTIONARY,
    SET_DICTIONARY_ITEMS,
    SET_EDIT_DICTIONARY_ITEMS,
    REMOVE_DICTIONARY_ITEM,
    SET_EDIT_DICTIONARY,
    REMOVE_DICTIONARY_ITEMS,
    CLEAR_DICTIONARY,
    SET_DICTIONARY,
    REMOVE_FROM_DICTIONARIES
} from "../constants";

const initialState = {
    dictionaries: [],
    items: [],
    errors: null,
    loading: {
        dictionariesLoading: false,
        itemsLoading: false,
        dictionaryLoading: false,
        initEstimateLoading: false
    },
    dictionaryData: {
        dictionary: null,
        dictionaryTemplates: [],
        nextEstimateNumber: '',
    },
    dictionaryItems: [],
};

export default function dictionariesReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_DICTIONARIES:
            let { dictionaries, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, dictionaries: [ ...dictionaries, ...state.dictionaries] };
            }

            if (!fresh) {
                return { ...state, dictionaries: [...state.dictionaries, ...dictionaries] };
            }

            return { ...state, dictionaries };

        case CLEAR_DICTIONARIES:
            return { ...state, dictionaries: [] };

        case CLEAR_DICTIONARY:
            return {
                ...state,
                dictionaryItems: [],
                items: [],
                dictionaryData: {
                    dictionary: null,
                    dictionaryTemplates: []
                }
            };

        case GET_DICTIONARIES:
            return { ...state };

        case SET_DICTIONARY:

            return { ...state, dictionaryData: payload };

        case SET_EDIT_DICTIONARY:
            return { ...state, ...payload };

        case DICTIONARIES_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_DICTIONARY_ITEMS:

            const { dictionaryItem } = payload;

            return { ...state, dictionaryItems: [...state.dictionaryItems, ...dictionaryItem] };

        case REMOVE_DICTIONARY_ITEM:

            const { id } = payload;

            const dictionaryItems = state.dictionaryItems.filter(val => (val.item_id || val.id) !== id)

            return { ...state, dictionaryItems };

        case REMOVE_DICTIONARY_ITEMS:

            return { ...state, dictionaryItems: [] };

        case REMOVE_FROM_DICTIONARIES:

            const newEstimates = state.dictionaries.filter(val => val.id !== payload.id)

            return { ...state, dictionaries: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
