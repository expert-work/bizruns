// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { DICTIONARIES_STATUS_BG_COLOR, DICTIONARIES_STATUS_TEXT_COLOR } from '../../constants';

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

const Byletter = ({
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
                  title:item.letter,
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
                            type: 'BYLETTER',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'BYLETTER',
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

export default Byletter;
