import {
    SET_SUBSCRIPTIONS,
    SUBSCRIPTIONS_TRIGGER_SPINNER,
    SET_FILTER_SUBSCRIPTIONS,
} from "../constants";

const initialState = {
    subscriptions: [],
    filterSubscriptions: [],
    errors: null,
    loading: {
        subscriptionsLoading: false,
        initSubscriptionLoading: false,
        subscriptionLoading: false,
        getUnpaidInvoicesLoading: false,
    },
};

export default function subscriptionsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {

        case SET_SUBSCRIPTIONS:

            let { subscriptions, fresh } = payload;

            if (!fresh) {
                return { ...state, subscriptions: [...state.subscriptions, ...subscriptions] };
            }

            return { ...state, subscriptions };

        case SET_FILTER_SUBSCRIPTIONS:

            if (!payload.fresh) {
                return {
                    ...state,
                    filterSubscriptions: [...state.filterSubscriptions, ...payload.subscriptions]
                };
            }

            return { ...state, filterSubscriptions: payload.subscriptions };

        case SUBSCRIPTIONS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        default:
            return state;
    }
}
