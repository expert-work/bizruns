// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Models from '../Tab/Models';

import { ROUTES } from '../../../../navigation/routes';
import { ESTIMATE_SEARCH_MODELS_TABS, ESTIMATE_SEARCH_MODEL_ADD, ESTIMATE_SEARCH_MODEL_DETAIL, ESTIMATE_SEARCH_MODEL_SEARCH, FILTER_ESTIMATE_SEARCH_MODEL_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    estimate_search_model_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    estimate_search_models: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Estimate_search_models extends React.Component<IProps> {
    constructor(props) {
        super(props);

  const { navigation } = this.props
            

        this.state = {
            activeTab: ESTIMATE_SEARCH_MODELS_TABS.MODELS,
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
            YEAR: navigation.getParam('year'),
            MAKE: navigation.getParam('make'),
            selectedFromDateValue: '',
            selectedToDateValue: ''
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true, q: '', type: 'MODELS' });

        const { navigation } = this.props
        goBack(MOUNT, navigation, { route: ROUTES.ESTIMATE_SEARCH_MAKE_LIST })
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


        const { getEstimate_search_models } = this.props;
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

        getEstimate_search_models({
            fresh,
            type,
            pagination: paginationParams,
            params: { ...params, search: q , year:this.state.YEAR,make:this.state.MAKE  },
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

    onEstimate_search_modelSelect = (estimate_search_model) => {  

    
    
    
    
    


        const { navigation } = this.props;
        if(this.state.activeTab =='MODELS'){
       
          navigation.navigate(ROUTES.ESTIMATE_SEARCH_REPAIR_LIST, { id: estimate_search_model.id,  model: estimate_search_model.model, year: this.state.YEAR, make: this.state.MAKE})
         this.onResetFilter(ESTIMATE_SEARCH_MODELS_TABS.MODELS)
         this.setActiveTab(ESTIMATE_SEARCH_MODELS_TABS.MODELS)   
        }
      
         
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == ESTIMATE_SEARCH_MODELS_TABS.MODELS) {
            type = 'MODELS';
        } else if (activeTab == ESTIMATE_SEARCH_MODELS_TABS.BYBRAND) {
            type = 'BYBRAND';
        }
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_SEARCH_MODEL_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', estimate_search_model_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || estimate_search_model_number || customer_id) {

            if (filterStatus === ESTIMATE_SEARCH_MODELS_TABS.MODELS)
                this.setState({ activeTab: ESTIMATE_SEARCH_MODELS_TABS.MODELS });
            else if (filterStatus === ESTIMATE_SEARCH_MODELS_TABS.BYBRAND)
                this.setState({ activeTab: ESTIMATE_SEARCH_MODELS_TABS.BYBRAND });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    estimate_search_model_number,
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
                estimate_search_model_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    estimate_search_model_number,
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

    onAddEstimate_search_model = () => {
        const { navigation } = this.props
        this.setActiveTab(ESTIMATE_SEARCH_MODELS_TABS.MODELS)
        this.onResetFilter(ESTIMATE_SEARCH_MODELS_TABS.MODELS)
        navigation.navigate(ROUTES.ESTIMATE_SEARCH_MODEL, { type: ESTIMATE_SEARCH_MODEL_ADD })
    }

    render() {
        const {
            language,
            navigation,
            estimate_search_models,
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

        let estimate_search_modelItem = [];
        typeof estimate_search_models !== 'undefined' && (estimate_search_modelItem = estimate_search_models);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("estimate_search_models.customer", { locale: language }),
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
                label: Lng.t("estimate_search_models.fromDate", { locale: language }),
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
                label: Lng.t("estimate_search_models.toDate", { locale: language }),
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
            name: 'estimate_search_model_number',
            hint: Lng.t("estimate_search_models.estimate_search_modelNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("estimate_search_models.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_ESTIMATE_SEARCH_MODEL_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("estimate_search_models.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.estimate_search_models", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.ESTIMATE_SEARCH_MAKE_LIST),
                        title: Lng.t("header.estimate_search_models", { locale: language }),
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
                                Title: ESTIMATE_SEARCH_MODELS_TABS.MODELS,
                                tabName: TAB_NAME(ESTIMATE_SEARCH_MODELS_TABS.MODELS, language, Lng),
                                render: (
                                    <Models
                                        estimate_search_models={estimate_search_modelItem}
                                        getEstimate_search_models={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimate_search_modelSelect={this.onEstimate_search_modelSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate_search_model={this.onAddEstimate_search_model}
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
