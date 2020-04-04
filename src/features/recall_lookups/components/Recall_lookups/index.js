// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
import Years from '../Tab/Years';

import { ROUTES } from '../../../../navigation/routes';
import { RECALL_LOOKUPS_TABS, RECALL_LOOKUP_ADD, RECALL_LOOKUP_DETAIL, RECALL_LOOKUP_SEARCH, FILTER_RECALL_LOOKUP_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    recall_lookup_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    recall_lookups: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Recall_lookups extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: RECALL_LOOKUPS_TABS.YEARS,
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


        const { getRecall_lookups } = this.props;
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

        getRecall_lookups({
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

    onRecall_lookupSelect = (recall_lookup) => {  
        const { navigation } = this.props;
        if(this.state.activeTab =='YEARS'){ 
          navigation.navigate(ROUTES.RECALL_LOOKUP_MAKE_LIST, { id: recall_lookup.id,  year: recall_lookup.year})
         this.onResetFilter(RECALL_LOOKUPS_TABS.YEARS)
         this.setActiveTab(RECALL_LOOKUPS_TABS.YEARS)   
        }         
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == RECALL_LOOKUPS_TABS.YEARS) {
            type = 'YEARS';
        }  
        return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(RECALL_LOOKUP_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', recall_lookup_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || recall_lookup_number || customer_id) {

            if (filterStatus === RECALL_LOOKUPS_TABS.YEARS)
                this.setState({ activeTab: RECALL_LOOKUPS_TABS.YEARS });
            
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_number,
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
                recall_lookup_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_number,
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

    onAddRecall_lookup = () => {
        const { navigation } = this.props
        this.setActiveTab(RECALL_LOOKUPS_TABS.YEARS)
        this.onResetFilter(RECALL_LOOKUPS_TABS.YEARS)
        navigation.navigate(ROUTES.RECALL_LOOKUP, { type: RECALL_LOOKUP_ADD })
    }

    render() {
        const {
            language,
            navigation,
            recall_lookups,
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

        let recall_lookupItem = [];
        typeof recall_lookups !== 'undefined' && (recall_lookupItem = recall_lookups);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("recall_lookups.customer", { locale: language }),
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
                label: Lng.t("recall_lookups.fromDate", { locale: language }),
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
                label: Lng.t("recall_lookups.toDate", { locale: language }),
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
            name: 'recall_lookup_number',
            hint: Lng.t("recall_lookups.recall_lookupNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("recall_lookups.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_RECALL_LOOKUP_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("recall_lookups.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.recall_lookups", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.recall_lookups", { locale: language }),
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
                                Title: RECALL_LOOKUPS_TABS.YEARS,
                                tabName: TAB_NAME(RECALL_LOOKUPS_TABS.YEARS, language, Lng),
                                render: (
                                    <Years
                                        recall_lookups={recall_lookupItem}
                                        getRecall_lookups={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onRecall_lookupSelect={this.onRecall_lookupSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddRecall_lookup={this.onAddRecall_lookup}
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
