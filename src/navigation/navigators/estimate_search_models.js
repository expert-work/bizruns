import Estimate_search_modelsContainer from '../../features/estimate_search_models/containers/Estimate_search_models';
 
 
 import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const Estimate_search_modelNavigator = {
    [ROUTES.ESTIMATE_SEARCH_MODEL_LIST]: generateStackNavigation(
        ROUTES.ESTIMATE_SEARCH_MODEL_LIST,
        Estimate_search_modelsContainer,
    )
    }
