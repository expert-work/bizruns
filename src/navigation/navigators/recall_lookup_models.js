import Recall_lookup_modelsContainer from '../../features/recall_lookup_models/containers/Recall_lookup_models';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
 
export const Recall_lookup_modelNavigator = {

    [ROUTES.RECALL_LOOKUP_MODEL_LIST]: generateStackNavigation(
        ROUTES.RECALL_LOOKUP_MODEL_LIST,
        Recall_lookup_modelsContainer,
    ) 
} 

