
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import SubscriptionContainer from "../../features/Subscriptions/containers/Subscription";


export const SubscriptionNavigator = {

    [ROUTES.SUBSCRIPTION]: generateStackNavigation(
        ROUTES.SUBSCRIPTION,
        SubscriptionContainer,
    ),

}



