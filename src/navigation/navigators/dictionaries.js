import DictionariesContainer from '../../features/dictionaries/containers/Dictionaries';
import DictionaryContainer from '../../features/dictionaries/containers/Dictionary';
import DictionaryItemContainer from '../../features/dictionaries/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const DictionaryNavigator = {

    [ROUTES.DICTIONARY_LIST]: generateStackNavigation(
        ROUTES.DICTIONARY_LIST,
        DictionariesContainer,
    ),
    [ROUTES.DICTIONARY]: generateStackNavigation(
        ROUTES.DICTIONARY,
        DictionaryContainer,
    ),
    [ROUTES.DICTIONARY_ITEM]: generateStackNavigation(
        ROUTES.DICTIONARY_ITEM,
        DictionaryItemContainer,
    ),
}
