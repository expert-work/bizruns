import Estimate_search_repairsContainer from '../../features/estimate_search_repairs/containers/Estimate_search_repairs';
import Estimate_search_repairContainer from '../../features/estimate_search_repairs/containers/Estimate_search_repair';
import Estimate_search_repairItemContainer from '../../features/estimate_search_repairs/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const Estimate_search_repairNavigator = {

    [ROUTES.ESTIMATE_SEARCH_REPAIR_LIST]: generateStackNavigation(
        ROUTES.ESTIMATE_SEARCH_REPAIR_LIST,
        Estimate_search_repairsContainer,
    ),
    [ROUTES.ESTIMATE_SEARCH_REPAIR]: generateStackNavigation(
        ROUTES.ESTIMATE_SEARCH_REPAIR,
        Estimate_search_repairContainer,
    ),
    [ROUTES.ESTIMATE_SEARCH_REPAIR_ITEM]: generateStackNavigation(
        ROUTES.ESTIMATE_SEARCH_REPAIR_ITEM,
        Estimate_search_repairItemContainer,
    ),
}
 