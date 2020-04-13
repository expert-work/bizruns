// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Years from '../Tab/Years';

import { ROUTES } from '../../../../navigation/routes';
import { ESTIMATE_SEARCHS_TABS, ESTIMATE_SEARCH_ADD, ESTIMATE_SEARCH_DETAIL, ESTIMATE_SEARCH_SEARCH, FILTER_ESTIMATE_SEARCH_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    estimate_search_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    estimate_searchs: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Estimate_searchs extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: ESTIMATE_SEARCHS_TABS.YEARS,
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 150,
                lastPage: 1,
            },
            search: '',
            filter: false,
            selectedFromDate: '',
            selectedToDate: '',
            selectedFromDateValue: '',
            selectedToDateValue: ''
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true, q: '', type: 'YEARS' });

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


        const { getEstimate_searchs } = this.props;
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

        getEstimate_searchs({
            fresh,
            type,
            pagination: paginationParams,
            params: { ...params, search: q },
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

    onEstimate_searchSelect = (estimate_search) => {  

    
    
    
    
    


        const { navigation } = this.props;
        if(this.state.activeTab =='YEARS'){
          navigation.navigate(ROUTES.ESTIMATE_SEARCH_MAKE_LIST, { id: estimate_search.id,  year: estimate_search.year})
         this.onResetFilter(ESTIMATE_SEARCHS_TABS.YEARS)
         this.setActiveTab(ESTIMATE_SEARCHS_TABS.YEARS)   
        }
      
         
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == ESTIMATE_SEARCHS_TABS.YEARS) {
            type = 'YEARS';
        } else if (activeTab == ESTIMATE_SEARCHS_TABS.BYBRAND) {
            type = 'BYBRAND';
        }
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_SEARCH_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', estimate_search_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || estimate_search_number || customer_id) {

            if (filterStatus === ESTIMATE_SEARCHS_TABS.YEARS)
                this.setState({ activeTab: ESTIMATE_SEARCHS_TABS.YEARS });
            else if (filterStatus === ESTIMATE_SEARCHS_TABS.BYBRAND)
                this.setState({ activeTab: ESTIMATE_SEARCHS_TABS.BYBRAND });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    estimate_search_number,
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
                estimate_search_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    estimate_search_number,
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

    onAddEstimate_search = () => {
        const { navigation } = this.props
        this.setActiveTab(ESTIMATE_SEARCHS_TABS.YEARS)
        this.onResetFilter(ESTIMATE_SEARCHS_TABS.YEARS)
        navigation.navigate(ROUTES.ESTIMATE_SEARCH, { type: ESTIMATE_SEARCH_ADD })
    }

    render() {
        const {
            language,
            navigation,
            estimate_searchs,
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

        let estimate_searchItem = [];
        typeof estimate_searchs !== 'undefined' && (estimate_searchItem = estimate_searchs);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("estimate_searchs.customer", { locale: language }),
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
                label: Lng.t("estimate_searchs.fromDate", { locale: language }),
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
                label: Lng.t("estimate_searchs.toDate", { locale: language }),
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
            name: 'estimate_search_number',
            hint: Lng.t("estimate_searchs.estimate_searchNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("estimate_searchs.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_ESTIMATE_SEARCH_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("estimate_searchs.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.estimate_searchs", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.estimate_searchs", { locale: language }),
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
                                Title: ESTIMATE_SEARCHS_TABS.YEARS,
                                tabName: TAB_NAME(ESTIMATE_SEARCHS_TABS.YEARS, language, Lng),
                                render: (
                                    <Years
                                        estimate_searchs={estimate_searchItem}
                                        getEstimate_searchs={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimate_searchSelect={this.onEstimate_searchSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate_search={this.onAddEstimate_search}
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
