// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Bybrand from '../Tab/Bybrand';
import All from '../Tab/All';

import { ROUTES } from '../../../../navigation/routes';
import { ESTIMATE_SEARCH_REPAIRS_TABS, ESTIMATE_SEARCH_REPAIR_ADD, ESTIMATE_SEARCH_REPAIR_DETAIL, ESTIMATE_SEARCH_REPAIR_SEARCH, FILTER_ESTIMATE_SEARCH_REPAIR_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    estimate_search_repair_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    estimate_search_repairs: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Estimate_search_repairs extends React.Component<IProps> {
    constructor(props) {
        super(props);
        const { navigation } = this.props
        this.state = {
            activeTab: ESTIMATE_SEARCH_REPAIRS_TABS.ALL,
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 150,
                lastPage: 1,
            },
            search: '',
            filter: false,
          YEAR: navigation.getParam('year'),
            MAKE: navigation.getParam('make'),
            MODEL: navigation.getParam('model'),
            selectedFromDate: '',
            selectedToDate: '',
            selectedFromDateValue: '',
            selectedToDateValue: ''
        };
    }

    componentDidMount() {
 
        this.getItems({ fresh: true, q: '', type: 'ALL' });

        const { navigation } = this.props
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_MORE })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setActiveTab = (activeTab) => {
        const { refreshing, search } = this.state;

        this.setState({ filter: false })

        if (!refreshing) {
            let type = this.getActiveTab(activeTab)

            this.getItems({ fresh: true, type, q: search });

            this.setState({ activeTab });
        }
    };


    getItems = ({
        fresh = false,
        onResult,
        type,
        params,
        q = '',
        resetFilter = false,
    } = {}) => {


        const { getEstimate_search_repairs } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        if (resetFilter)
            this.setState({ filter: false })

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getEstimate_search_repairs({
            fresh,
            type,
            pagination: paginationParams,
            params: { ...params, search: q, year:this.state.YEAR,make:this.state.MAKE,model:this.state.MODEL  },
            onMeta: ({ last_page, current_page }) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1,
                    },
                });
            },
            onResult: (val) => {
                 this.setState({
                    refreshing: false,
                    fresh: !val,
                });
                onResult && onResult();
            },
        });
    };

    onEstimate_search_repairSelect = (estimate_search_repair) => {  
 
        const { navigation } = this.props;
         
          navigation.navigate(ROUTES.ESTIMATE_SEARCH_REPAIR, { 
                    AssociatedRepair2: estimate_search_repair.AssociatedRepair2,
                    associatedRepair: estimate_search_repair.associatedRepair,
                    created_at: estimate_search_repair.created_at,
                    id: estimate_search_repair.id,
                    laborAvg: estimate_search_repair.laborAvg,
                    laborMax: estimate_search_repair.laborMax,
                    laborMin: estimate_search_repair.laborMin,
                    make: estimate_search_repair.make,
                    model: estimate_search_repair.model,
                    partsList: estimate_search_repair.partsList,
                    partsMax: estimate_search_repair.partsMax,
                    partsMin: estimate_search_repair.partsMin,
                    repairAverage: estimate_search_repair.repairAverage,
                    repairCauses: estimate_search_repair.repairCauses,
                    repairMain: estimate_search_repair.repairMain,
                    repairMin: estimate_search_repair.repairMin,
                    repairName: estimate_search_repair.repairName,
                    repairRecommendation: estimate_search_repair.repairRecommendation,
                    year: estimate_search_repair.year
          })
         this.onResetFilter(ESTIMATE_SEARCH_REPAIRS_TABS.ALL)
         this.setActiveTab(ESTIMATE_SEARCH_REPAIRS_TABS.ALL)   
        
    };






    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == ESTIMATE_SEARCH_REPAIRS_TABS.ALL) {
            type = 'ALL';
        }          
        return type
    }
 
    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_SEARCH_REPAIR_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', estimate_search_repair_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || estimate_search_repair_number || customer_id) {

            if (filterStatus === ESTIMATE_SEARCH_REPAIRS_TABS.ALL)
                this.setState({ activeTab: ESTIMATE_SEARCH_REPAIRS_TABS.ALL });
            
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    estimate_search_repair_number,
                    from_date,
                    to_date,
                },
                type: filterStatus,
            });

        }
        else
            this.onResetFilter()
    }

    loadMoreItems = ({ type, q }) => {
        const { filter } = this.state
        const {
            formValues: {
                filterStatus = '',
                from_date = '',
                to_date = '',
                estimate_search_repair_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    estimate_search_repair_number,
                    from_date,
                    to_date,
                },
                type: filterStatus,
                filter: true
            })
        }
        else
            this.getItems({ type, q });
    }

 
    render() {
        const {
            language,
            navigation,
            estimate_search_repairs,
            loading,
            handleSubmit,
            customers,
            getCustomers,
        } = this.props;

        const {
            activeTab,
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            selectedFromDate,
            selectedToDate,
            selectedFromDateValue,
            selectedToDateValue,
            filter
        } = this.state;

        const canLoadMore = lastPage >= page;

        let estimate_search_repairItem = [];
        typeof estimate_search_repairs !== 'undefined' && (estimate_search_repairItem = estimate_search_repairs);

       

        let inputFields = [{
            name: 'estimate_search_repair_number',
            hint: Lng.t("estimate_search_repairs.estimate_search_repairNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("estimate_search_repairs.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_ESTIMATE_SEARCH_REPAIR_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("estimate_search_repairs.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.estimate_search_repairs", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.RECALL_LOOKUP_MODEL_LIST),
                        title: Lng.t("header.estimate_search_repairs", { locale: language }),
                        titleStyle: styles.headerTitle,
                        placement: "center",
                        hasRightButton:false
                    }}
                    onSearch={this.onSearch}
                    hasRightButton={false}
                >
                    <Tabs
                        style={styles.Tabs}
                        activeTab={activeTab}
                        setActiveTab={this.setActiveTab}
                        tabs={[
                                {
                                Title: ESTIMATE_SEARCH_REPAIRS_TABS.ALL,
                                tabName: TAB_NAME(ESTIMATE_SEARCH_REPAIRS_TABS.ALL, language, Lng),
                                render: (
                                    <All
                                        estimate_search_repairs={estimate_search_repairItem}
                                        getEstimate_search_repairs={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimate_search_repairSelect={this.onEstimate_search_repairSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate_search_repair=''
                                        filter={filter}
                                    />
                                ),
                            } 
                        ]}
                    />
                </MainLayout>
            </View>
        );
    }
}
