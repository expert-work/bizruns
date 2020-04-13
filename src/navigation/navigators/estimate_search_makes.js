import Estimate_search_makesContainer from '../../features/estimate_search_makes/containers/Estimate_search_makes';
 
 
 import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const Estimate_search_makeNavigator = {
    [ROUTES.ESTIMATE_SEARCH_MAKE_LIST]: generateStackNavigation(
        ROUTES.ESTIMATE_SEARCH_MAKE_LIST,
        Estimate_search_makesContainer,
    )
    }
