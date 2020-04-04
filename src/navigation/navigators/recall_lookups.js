import Recall_lookupsContainer from '../../features/recall_lookups/containers/Recall_lookups';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
 
export const Recall_lookupNavigator = {

    [ROUTES.RECALL_LOOKUP_LIST]: generateStackNavigation(
        ROUTES.RECALL_LOOKUP_LIST,
        Recall_lookupsContainer,
    ) 
} 