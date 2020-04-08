import {
    SET_OBD2S,
    CLEAR_OBD2S,
    OBD2S_TRIGGER_SPINNER,
    GET_OBD2S,
    GET_ITEMS,
    SET_ITEMS,
    SET_CREATE_OBD2,
    SET_OBD2_ITEMS,
    SET_EDIT_OBD2_ITEMS,
    REMOVE_OBD2_ITEM,
    SET_EDIT_OBD2,
    REMOVE_OBD2_ITEMS,
    CLEAR_OBD2,
    SET_OBD2,
    REMOVE_FROM_OBD2S
} from "../constants";

const initialState = {
    obd2s: [],
    items: [],
    errors: null,
    loading: {
        obd2sLoading: false,
        itemsLoading: false,
        obd2Loading: false,
        initEstimateLoading: false
    },
    obd2Data: {
        obd2: null,
        obd2Templates: [],
        nextEstimateNumber: '',
    },
    obd2Items: [],
};

export default function obd2sReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_OBD2S:
            let { obd2s, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, obd2s: [ ...obd2s, ...state.obd2s] };
            }

            if (!fresh) {
                return { ...state, obd2s: [...state.obd2s, ...obd2s] };
            }

            return { ...state, obd2s };

        case CLEAR_OBD2S:
            return { ...state, obd2s: [] };

        case CLEAR_OBD2:
            return {
                ...state,
                obd2Items: [],
                items: [],
                obd2Data: {
                    obd2: null,
                    obd2Templates: []
                }
            };

        case GET_OBD2S:
            return { ...state };

        case SET_OBD2:

            return { ...state, obd2Data: payload };

        case SET_EDIT_OBD2:
            return { ...state, ...payload };

        case OBD2S_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:

            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_OBD2_ITEMS:

            const { obd2Item } = payload;

            return { ...state, obd2Items: [...state.obd2Items, ...obd2Item] };

        case REMOVE_OBD2_ITEM:

            const { id } = payload;

            const obd2Items = state.obd2Items.filter(val => (val.item_id || val.id) !== id)

            return { ...state, obd2Items };

        case REMOVE_OBD2_ITEMS:

            return { ...state, obd2Items: [] };

        case REMOVE_FROM_OBD2S:

            const newEstimates = state.obd2s.filter(val => val.id !== payload.id)

            return { ...state, obd2s: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
