import Recall_lookup_componentsContainer from '../../features/recall_lookup_components/containers/Recall_lookup_components';
import Recall_lookup_componentContainer from '../../features/recall_lookup_components/containers/Recall_lookup_component';
import Recall_lookup_componentItemContainer from '../../features/recall_lookup_components/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const Recall_lookup_componentNavigator = {

    [ROUTES.RECALL_LOOKUP_COMPONENT_LIST]: generateStackNavigation(
        ROUTES.RECALL_LOOKUP_COMPONENT_LIST,
        Recall_lookup_componentsContainer,
    ),
    [ROUTES.RECALL_LOOKUP_COMPONENT]: generateStackNavigation(
        ROUTES.RECALL_LOOKUP_COMPONENT,
        Recall_lookup_componentContainer,
    ),
    [ROUTES.RECALL_LOOKUP_COMPONENT_ITEM]: generateStackNavigation(
        ROUTES.RECALL_LOOKUP_COMPONENT_ITEM,
        Recall_lookup_componentItemContainer,
    ),
}
 