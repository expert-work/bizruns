// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import { ESTIMATE_SEARCH_MODELS_STATUS, ESTIMATE_SEARCH_MODEL_ADD, ESTIMATE_SEARCH_MODELS_STATUS_BG_COLOR, ESTIMATE_SEARCH_MODELS_STATUS_TEXT_COLOR } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    estimate_search_models: Array,
    onEstimate_search_modelSelect: Function,
    getEstimate_search_models: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddEstimate_search_model: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Models = ({
    estimate_search_models,
    onEstimate_search_modelSelect,
    refreshing,
    loading,
    canLoadMore,
    getEstimate_search_models,
    fresh,
    search,
    language,
    navigation,
    onAddEstimate_search_model,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];
   
    if (typeof estimate_search_models !== 'undefined' && estimate_search_models.length != 0) {
        items = estimate_search_models.map((item) => {
                                   
            return {           
                  title:item.model,
                  fullItem: item
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("estimate_search_models.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("estimate_search_models.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddEstimate_search_model()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onEstimate_search_modelSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getEstimate_search_models({
                            fresh: true,
                            onResult: onHide,
                            type: 'MODELS',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'MODELS',
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

export default Models;
