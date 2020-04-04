import Obd2sContainer from '../../features/obd2s/containers/Obd2s';
import Obd2Container from '../../features/obd2s/containers/Obd2';
import Obd2ItemContainer from '../../features/obd2s/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const Obd2Navigator = {

    [ROUTES.OBD2_LIST]: generateStackNavigation(
        ROUTES.OBD2_LIST,
        Obd2sContainer,
    ),
    [ROUTES.OBD2]: generateStackNavigation(
        ROUTES.OBD2,
        Obd2Container,
    ),
    [ROUTES.OBD2_ITEM]: generateStackNavigation(
        ROUTES.OBD2_ITEM,
        Obd2ItemContainer,
    ),
}
