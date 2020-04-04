// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import { RECALL_LOOKUPS_STATUS, RECALL_LOOKUP_ADD, RECALL_LOOKUPS_STATUS_BG_COLOR, RECALL_LOOKUPS_STATUS_TEXT_COLOR } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    recall_lookups: Array,
    onRecall_lookupSelect: Function,
    getRecall_lookups: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddRecall_lookup: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Years = ({
    recall_lookups,
    onRecall_lookupSelect,
    refreshing,
    loading,
    canLoadMore,
    getRecall_lookups,
    fresh,
    search,
    language,
    navigation,
    onAddRecall_lookup,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];
   
    if (typeof recall_lookups !== 'undefined' && recall_lookups.length != 0) {
        items = recall_lookups.map((item) => {
             
            return {
                  title:item.year,
                  fullItem: item
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("recall_lookups.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("recall_lookups.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddRecall_lookup()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onRecall_lookupSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getRecall_lookups({
                            fresh: true,
                            onResult: onHide,
                            type: 'YEARS',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'YEARS',
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

export default Years;
