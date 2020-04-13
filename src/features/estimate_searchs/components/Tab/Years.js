// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import { ESTIMATE_SEARCHS_STATUS, ESTIMATE_SEARCH_ADD, ESTIMATE_SEARCHS_STATUS_BG_COLOR, ESTIMATE_SEARCHS_STATUS_TEXT_COLOR } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    estimate_searchs: Array,
    onEstimate_searchSelect: Function,
    getEstimate_searchs: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddEstimate_search: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Years = ({
    estimate_searchs,
    onEstimate_searchSelect,
    refreshing,
    loading,
    canLoadMore,
    getEstimate_searchs,
    fresh,
    search,
    language,
    navigation,
    onAddEstimate_search,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];
   
    if (typeof estimate_searchs !== 'undefined' && estimate_searchs.length != 0) {
        items = estimate_searchs.map((item) => {
                                   
            return {           
                  title:item.year,
                  fullItem: item
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("estimate_searchs.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("estimate_searchs.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddEstimate_search()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onEstimate_searchSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getEstimate_searchs({
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
