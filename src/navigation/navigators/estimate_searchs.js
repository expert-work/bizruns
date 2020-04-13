import Estimate_searchsContainer from '../../features/estimate_searchs/containers/Estimate_searchs';
 
 
 import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const Estimate_searchNavigator = {
    [ROUTES.ESTIMATE_SEARCH_LIST]: generateStackNavigation(
        ROUTES.ESTIMATE_SEARCH_LIST,
        Estimate_searchsContainer,
    )
    }
