// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import { RECALL_LOOKUP_COMPONENTS_STATUS, RECALL_LOOKUP_COMPONENT_ADD, RECALL_LOOKUP_COMPONENTS_STATUS_BG_COLOR, RECALL_LOOKUP_COMPONENTS_STATUS_TEXT_COLOR } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    recall_lookup_components: Array,
    onRecall_lookup_componentSelect: Function,
    getRecall_lookup_components: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddRecall_lookup_component: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const All = ({
    recall_lookup_components,
    onRecall_lookup_componentSelect,
    refreshing,
    loading,
    canLoadMore,
    getRecall_lookup_components,
    fresh,
    search,
    language,
    navigation,
    onAddRecall_lookup_component,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];
   
    if (typeof recall_lookup_components !== 'undefined' && recall_lookup_components.length != 0) {
        items = recall_lookup_components.map((item) => {
             
            return {
                  title:item.Component,
                     subtitle: {
                      label: 'Read more...',
                    labelTextColor: 'blue',
                  },
                  fullItem: item
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("recall_lookup_components.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("recall_lookup_components.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddRecall_lookup_component()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onRecall_lookup_componentSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getRecall_lookup_components({
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
