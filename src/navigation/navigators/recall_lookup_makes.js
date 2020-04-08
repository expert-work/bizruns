import Recall_lookup_makesContainer from '../../features/recall_lookup_makes/containers/Recall_lookup_makes';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
 
export const Recall_lookup_makeNavigator = {

    [ROUTES.RECALL_LOOKUP_MAKE_LIST]: generateStackNavigation(
        ROUTES.RECALL_LOOKUP_MAKE_LIST,
        Recall_lookup_makesContainer,
    ) 
} 