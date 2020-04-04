// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { RECALL_LOOKUP_MODELS_STATUS_BG_COLOR, RECALL_LOOKUP_MODELS_STATUS_TEXT_COLOR } from '../../constants';

type IProps = {
    recall_lookup_models: Array,
    onRecall_lookup_modelSelect: Function,
    getRecall_lookup_models: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddRecall_lookup_model: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Bybrand = ({
    recall_lookup_models,
    onRecall_lookup_modelSelect,
    refreshing,
    loading,
    canLoadMore,
    getRecall_lookup_models,
    fresh,
    search,
    language,
    navigation,
    onAddRecall_lookup_model,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];

 

    if (typeof recall_lookup_models !== 'undefined' && recall_lookup_models.length != 0) {
        items = recall_lookup_models.map((item) => {
            
            return {
                  title:item.brand,
                  fullItem: item
            };
        });
    }










    let empty = (!filter && !search) ? {
        description: Lng.t("recall_lookup_models.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("recall_lookup_models.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddRecall_lookup_model()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onRecall_lookup_modelSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getRecall_lookup_models({
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
