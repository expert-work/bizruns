// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { ESTIMATE_SEARCH_REPAIRS_STATUS_BG_COLOR, ESTIMATE_SEARCH_REPAIRS_STATUS_TEXT_COLOR } from '../../constants';

type IProps = {
    estimate_search_repairs: Array,
    onEstimate_search_repairSelect: Function,
    getEstimate_search_repairs: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddEstimate_search_repair: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Bybrand = ({
    estimate_search_repairs,
    onEstimate_search_repairSelect,
    refreshing,
    loading,
    canLoadMore,
    getEstimate_search_repairs,
    fresh,
    search,
    language,
    navigation,
    onAddEstimate_search_repair,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];

 

    if (typeof estimate_search_repairs !== 'undefined' && estimate_search_repairs.length != 0) {
        items = estimate_search_repairs.map((item) => {
            
            return {
                  title:item.brand,
                  fullItem: item
            };
        });
    }










    let empty = (!filter && !search) ? {
        description: Lng.t("estimate_search_repairs.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("estimate_search_repairs.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddEstimate_search_repair()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onEstimate_search_repairSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getEstimate_search_repairs({
                            fresh: true,
                            onResult: onHide,
                            type: 'BYBRAND',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'BYBRAND',
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

export default Bybrand;
