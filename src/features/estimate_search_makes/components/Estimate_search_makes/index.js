// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Makes from '../Tab/Makes';

import { ROUTES } from '../../../../navigation/routes';
import { ESTIMATE_SEARCH_MAKES_TABS, ESTIMATE_SEARCH_MAKE_ADD, ESTIMATE_SEARCH_MAKE_DETAIL, ESTIMATE_SEARCH_MAKE_SEARCH, FILTER_ESTIMATE_SEARCH_MAKE_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    estimate_search_make_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    estimate_search_makes: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Estimate_search_makes extends React.Component<IProps> {
    constructor(props) {
        super(props);
        const { navigation } = this.props

        this.state = {
            activeTab: ESTIMATE_SEARCH_MAKES_TABS.MAKES,
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 150,
                lastPage: 1,
            },
            search: '',
            YEAR:navigation.getParam('year'),
            filter: false,
            selectedFromDate: '',
            selectedToDate: '',
            selectedFromDateValue: '',
            selectedToDateValue: ''
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true, q: '', type: 'MAKES' });
         // Alert.alert(this.state.YEAR);
        const { navigation } = this.props
        goBack(MOUNT, navigation, { route: ROUTES.ESTIMATE_SEARCH_LIST })
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


        const { getEstimate_search_makes } = this.props;
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

        getEstimate_search_makes({
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

    onEstimate_search_makeSelect = (estimate_search_make) => {  

    
    
    
    
    


        const { navigation } = this.props;
        if(this.state.activeTab =='MAKES'){
          navigation.navigate(ROUTES.ESTIMATE_SEARCH_MODEL_LIST, { id: estimate_search_make.id,year:this.state.YEAR,make: estimate_search_make.make})
         this.onResetFilter(ESTIMATE_SEARCH_MAKES_TABS.MAKES)
         this.setActiveTab(ESTIMATE_SEARCH_MAKES_TABS.MAKES)   
        }
      
         
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == ESTIMATE_SEARCH_MAKES_TABS.MAKES) {
            type = 'MAKES';
        } else if (activeTab == ESTIMATE_SEARCH_MAKES_TABS.BYBRAND) {
            type = 'BYBRAND';
        }
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_SEARCH_MAKE_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', estimate_search_make_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || estimate_search_make_number || customer_id) {

            if (filterStatus === ESTIMATE_SEARCH_MAKES_TABS.MAKES)
                this.setState({ activeTab: ESTIMATE_SEARCH_MAKES_TABS.MAKES });
            else if (filterStatus === ESTIMATE_SEARCH_MAKES_TABS.BYBRAND)
                this.setState({ activeTab: ESTIMATE_SEARCH_MAKES_TABS.BYBRAND });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    estimate_search_make_number,
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
                estimate_search_make_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    estimate_search_make_number,
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

    onAddEstimate_search_make = () => {
        const { navigation } = this.props
        this.setActiveTab(ESTIMATE_SEARCH_MAKES_TABS.MAKES)
        this.onResetFilter(ESTIMATE_SEARCH_MAKES_TABS.MAKES)
        navigation.navigate(ROUTES.ESTIMATE_SEARCH_MAKE, { type: ESTIMATE_SEARCH_MAKE_ADD })
    }

    render() {
        const {
            language,
            navigation,
            estimate_search_makes,
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

        let estimate_search_makeItem = [];
        typeof estimate_search_makes !== 'undefined' && (estimate_search_makeItem = estimate_search_makes);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("estimate_search_makes.customer", { locale: language }),
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
                label: Lng.t("estimate_search_makes.fromDate", { locale: language }),
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
                label: Lng.t("estimate_search_makes.toDate", { locale: language }),
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
            name: 'estimate_search_make_number',
            hint: Lng.t("estimate_search_makes.estimate_search_makeNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("estimate_search_makes.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_ESTIMATE_SEARCH_MAKE_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("estimate_search_makes.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.estimate_search_makes", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.ESTIMATE_SEARCH_LIST),
                        title: Lng.t("header.estimate_search_makes", { locale: language }),
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
                                Title: ESTIMATE_SEARCH_MAKES_TABS.MAKES,
                                tabName: TAB_NAME(ESTIMATE_SEARCH_MAKES_TABS.MAKES, language, Lng),
                                render: (
                                    <Makes
                                        estimate_search_makes={estimate_search_makeItem}
                                        getEstimate_search_makes={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimate_search_makeSelect={this.onEstimate_search_makeSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate_search_make={this.onAddEstimate_search_make}
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
