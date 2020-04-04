// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Bybrand from '../Tab/Bybrand';
import All from '../Tab/All';

import { ROUTES } from '../../../../navigation/routes';
import { RECALL_LOOKUP_COMPONENTS_TABS, RECALL_LOOKUP_COMPONENT_ADD, RECALL_LOOKUP_COMPONENT_DETAIL, RECALL_LOOKUP_COMPONENT_SEARCH, FILTER_RECALL_LOOKUP_COMPONENT_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    recall_lookup_component_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    recall_lookup_components: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Recall_lookup_components extends React.Component<IProps> {
    constructor(props) {
        super(props);
        const { navigation } = this.props
        this.state = {
            activeTab: RECALL_LOOKUP_COMPONENTS_TABS.ALL,
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

//        Alert.alert(this.state.MAKE +'--'+ this.state.YEAR+'--' + this.state.MODEL)


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


        const { getRecall_lookup_components } = this.props;
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

        getRecall_lookup_components({
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

    onRecall_lookup_componentSelect = (recall_lookup_component) => {  
 
        const { navigation } = this.props;
        if(this.state.activeTab =='ALL'){
          navigation.navigate(ROUTES.RECALL_LOOKUP_COMPONENT, { 
                    Component: recall_lookup_component.Component,
                    Conequence: recall_lookup_component.Conequence,
                    Make: recall_lookup_component.Make,
                    Manufacturer: recall_lookup_component.Manufacturer,
                    Model: recall_lookup_component.Model,
                    ModelYear: recall_lookup_component.ModelYear,
                    NHTSACampaignNumber: recall_lookup_component.NHTSACampaignNumber,
                    Remedy: recall_lookup_component.Remedy,
                    ReportReceivedDate: recall_lookup_component.ReportReceivedDate,
                    Summary: recall_lookup_component.Summary
          })
         this.onResetFilter(RECALL_LOOKUP_COMPONENTS_TABS.ALL)
         this.setActiveTab(RECALL_LOOKUP_COMPONENTS_TABS.ALL)   
        }  
    };






    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == RECALL_LOOKUP_COMPONENTS_TABS.ALL) {
            type = 'ALL';
        }          
        return type
    }
 
    setFormField = (field, value) => {
        this.props.dispatch(change(RECALL_LOOKUP_COMPONENT_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', recall_lookup_component_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || recall_lookup_component_number || customer_id) {

            if (filterStatus === RECALL_LOOKUP_COMPONENTS_TABS.ALL)
                this.setState({ activeTab: RECALL_LOOKUP_COMPONENTS_TABS.ALL });
            
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_component_number,
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
                recall_lookup_component_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_component_number,
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

    onAddRecall_lookup_component = () => {
        const { navigation } = this.props
        this.setActiveTab(RECALL_LOOKUP_COMPONENTS_TABS.ALL)
        this.onResetFilter(RECALL_LOOKUP_COMPONENTS_TABS.ALL)
        navigation.navigate(ROUTES.RECALL_LOOKUP_COMPONENT, { type: RECALL_LOOKUP_COMPONENT_ADD })
    }

    render() {
        const {
            language,
            navigation,
            recall_lookup_components,
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

        let recall_lookup_componentItem = [];
        typeof recall_lookup_components !== 'undefined' && (recall_lookup_componentItem = recall_lookup_components);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("recall_lookup_components.customer", { locale: language }),
                icon: 'user',
                placeholder: Lng.t("customers.placeholder", { locale: language }),
                navigation: navigation,
                compareField: "id",
                onSelect: (item) => this.setFormField('customer_id', item.id),
                headerProps: {
                    title: Lng.t("customers.title", { locale: language }),
                    rightIconPress: null
                },
                listViewProps: {
                    hasAvatar: true,
                },
                emptyContentProps: {
                    contentType: "customers",
                    image: IMAGES.EMPTY_CUSTOMERS,
                }
            }
        ]

        let datePickerFields = [
            {
                name: "from_date",
                label: Lng.t("recall_lookup_components.fromDate", { locale: language }),
                onChangeCallback: (formDate, displayDate) => {
                    this.setState({
                        selectedFromDate: displayDate,
                        selectedFromDateValue: formDate
                    })
                },
                selectedDate: selectedFromDate,
                selectedDateValue: selectedFromDateValue
            },
            {
                name: "to_date",
                label: Lng.t("recall_lookup_components.toDate", { locale: language }),
                onChangeCallback: (formDate, displayDate) => {
                    this.setState({
                        selectedToDate: displayDate,
                        selectedToDateValue: formDate
                    })
                },
                selectedDate: selectedToDate,
                selectedDateValue: selectedToDateValue
            }
        ]

        let inputFields = [{
            name: 'recall_lookup_component_number',
            hint: Lng.t("recall_lookup_components.recall_lookup_componentNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("recall_lookup_components.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_RECALL_LOOKUP_COMPONENT_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("recall_lookup_components.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.recall_lookup_components", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.RECALL_LOOKUP_MODEL_LIST),
                        title: Lng.t("header.recall_lookup_components", { locale: language }),
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
                                Title: RECALL_LOOKUP_COMPONENTS_TABS.ALL,
                                tabName: TAB_NAME(RECALL_LOOKUP_COMPONENTS_TABS.ALL, language, Lng),
                                render: (
                                    <All
                                        recall_lookup_components={recall_lookup_componentItem}
                                        getRecall_lookup_components={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onRecall_lookup_componentSelect={this.onRecall_lookup_componentSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddRecall_lookup_component={this.onAddRecall_lookup_component}
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
