// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import { ESTIMATE_SEARCH_MAKES_STATUS, ESTIMATE_SEARCH_MAKE_ADD, ESTIMATE_SEARCH_MAKES_STATUS_BG_COLOR, ESTIMATE_SEARCH_MAKES_STATUS_TEXT_COLOR } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    estimate_search_makes: Array,
    onEstimate_search_makeSelect: Function,
    getEstimate_search_makes: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddEstimate_search_make: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Makes = ({
    estimate_search_makes,
    onEstimate_search_makeSelect,
    refreshing,
    loading,
    canLoadMore,
    getEstimate_search_makes,
    fresh,
    search,
    language,
    navigation,
    onAddEstimate_search_make,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];
   
    if (typeof estimate_search_makes !== 'undefined' && estimate_search_makes.length != 0) {
        items = estimate_search_makes.map((item) => {
                                   
            return {           
                  title:item.make,
                  fullItem: item
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("estimate_search_makes.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("estimate_search_makes.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddEstimate_search_make()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onEstimate_search_makeSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getEstimate_search_makes({
                            fresh: true,
                            onResult: onHide,
                            type: 'MAKES',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'MAKES',
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

export default Makes;
