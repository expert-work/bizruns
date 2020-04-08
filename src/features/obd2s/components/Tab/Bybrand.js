// @flow
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { OBD2S_STATUS_BG_COLOR, OBD2S_STATUS_TEXT_COLOR } from '../../constants';

type IProps = {
    obd2s: Array,
    onObd2Select: Function,
    getObd2s: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddObd2: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Bybrand = ({
    obd2s,
    onObd2Select,
    refreshing,
    loading,
    canLoadMore,
    getObd2s,
    fresh,
    search,
    language,
    navigation,
    onAddObd2,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];

 

    if (typeof obd2s !== 'undefined' && obd2s.length != 0) {
        items = obd2s.map((item) => {
            
            return {
                  title:item.brand,
                  fullItem: item
            };
        });
    }










    let empty = (!filter && !search) ? {
        description: Lng.t("obd2s.empty.all.description", { locale: language }),
        buttonTitle: Lng.t("obd2s.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddObd2()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? 'No records found' :'No records found'

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onObd2Select}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getObd2s({
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
