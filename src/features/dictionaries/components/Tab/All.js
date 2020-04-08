// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import { DICTIONARIES_STATUS, DICTIONARY_ADD, DICTIONARIES_STATUS_BG_COLOR, DICTIONARIES_STATUS_TEXT_COLOR } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    dictionaries: Array,
    onDictionarySelect: Function,
    getDictionaries: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddDictionary: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const All = ({
    dictionaries,
    onDictionarySelect,
    refreshing,
    loading,
    canLoadMore,
    getDictionaries,
    fresh,
    search,
    language,
    navigation,
    onAddDictionary,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];
   
    if (typeof dictionaries !== 'undefined' && dictionaries.length != 0) {
        items = dictionaries.map((item) => {
            const {
                dictionary_number,
                user: { name } = {},
                              
            } = item;

            return {
                  title:item.name,
                  fullItem: item,
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("dictionaries.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("dictionaries.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddDictionary()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onDictionarySelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getDictionaries({
                            fresh: true,
                            onResult: onHide,
                            type: 'ALL',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'ALL',
                            q: search,
                        });
                    }}
                    bottomDivider
                    emptyContentProps={{
                        title: emptyTitle  
                    }}
                />
            </Content>
        </View>
    );
};

export default All;
