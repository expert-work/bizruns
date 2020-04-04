// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Bybrand from '../Tab/Bybrand';
import Model from '../Tab/Model';

import { ROUTES } from '../../../../navigation/routes';
import { RECALL_LOOKUP_MODELS_TABS, RECALL_LOOKUP_MODEL_ADD, RECALL_LOOKUP_MODEL_DETAIL, RECALL_LOOKUP_MODEL_SEARCH, FILTER_RECALL_LOOKUP_MODEL_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    recall_lookup_model_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    recall_lookup_models: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Recall_lookup_models extends React.Component<IProps> {
    constructor(props) {
        super(props);
        const { navigation } = this.props

        this.state = {
            activeTab: RECALL_LOOKUP_MODELS_TABS.MODEL,
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
             selectedFromDate: '',
            selectedToDate: '',
            selectedFromDateValue: '',
            selectedToDateValue: ''
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true, q: '', type: 'MODEL' });
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


        const { getRecall_lookup_models } = this.props;
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

        getRecall_lookup_models({
            fresh,
            type,
            pagination: paginationParams,
            params: { ...params, search: q, year:this.state.YEAR,make:this.state.MAKE  },

         
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

    onRecall_lookup_modelSelect = (recall_lookup_model) => {  

    
    
    
    
    


        const { navigation } = this.props;
        if(this.state.activeTab =='MODEL'){
         navigation.navigate(ROUTES.RECALL_LOOKUP_COMPONENT_LIST, { id: recall_lookup_model.id,  model: recall_lookup_model.model,make:this.state.MAKE, year:this.state.YEAR})

        //  navigation.navigate(ROUTES.RECALL_LOOKUP_MODEL, { id: recall_lookup_model.id,  code: recall_lookup_model.code,type: RECALL_LOOKUP_MODEL_DETAIL,code_description: recall_lookup_model.code_description,code_causes:recall_lookup_model.code_causes,code_description_expanded:recall_lookup_model.code_description_expanded,code_symptoms:recall_lookup_model.code_symptoms,code_warnings:recall_lookup_model.code_warnings})
         this.onResetFilter(RECALL_LOOKUP_MODELS_TABS.MODEL)
         this.setActiveTab(RECALL_LOOKUP_MODELS_TABS.MODEL)   
        }
         if(this.state.activeTab =='BYBRAND'){
                  // Alert.alert(this.state.activeTab+' '+recall_lookup_model.letter);
                   this.setState({ activeTab:'MODEL' })
                  const type = 'MODEL';
                  let search=recall_lookup_model.brand;
                   this.getItems({ fresh: true, q: search, type })
        }
         
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';
         if (activeTab == RECALL_LOOKUP_MODELS_TABS.MODEL) {
            type = 'MODEL';
        } else if (activeTab == RECALL_LOOKUP_MODELS_TABS.BYBRAND) {
            type = 'BYBRAND';
        }
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(RECALL_LOOKUP_MODEL_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', recall_lookup_model_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || recall_lookup_model_number || customer_id) {

            if (filterStatus === RECALL_LOOKUP_MODELS_TABS.MODEL)
                this.setState({ activeTab: RECALL_LOOKUP_MODELS_TABS.MODEL });
            else if (filterStatus === RECALL_LOOKUP_MODELS_TABS.BYBRAND)
                this.setState({ activeTab: RECALL_LOOKUP_MODELS_TABS.BYBRAND });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_model_number,
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
                recall_lookup_model_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_model_number,
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

    onAddRecall_lookup_model = () => {
        const { navigation } = this.props
        this.setActiveTab(RECALL_LOOKUP_MODELS_TABS.MODEL)
        this.onResetFilter(RECALL_LOOKUP_MODELS_TABS.MODEL)
        navigation.navigate(ROUTES.RECALL_LOOKUP_MODEL, { type: RECALL_LOOKUP_MODEL_ADD })
    }

    render() {
        const {
            language,
            navigation,
            recall_lookup_models,
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

        let recall_lookup_modelItem = [];
        typeof recall_lookup_models !== 'undefined' && (recall_lookup_modelItem = recall_lookup_models);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("recall_lookup_models.customer", { locale: language }),
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
                label: Lng.t("recall_lookup_models.fromDate", { locale: language }),
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
                label: Lng.t("recall_lookup_models.toDate", { locale: language }),
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
            name: 'recall_lookup_model_number',
            hint: Lng.t("recall_lookup_models.recall_lookup_modelNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("recall_lookup_models.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_RECALL_LOOKUP_MODEL_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("recall_lookup_models.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.recall_lookup_models", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.RECALL_LOOKUP_MAKE_LIST),
                        title: Lng.t("header.recall_lookup_models", { locale: language }),
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
                                Title: RECALL_LOOKUP_MODELS_TABS.MODEL,
                                tabName: TAB_NAME(RECALL_LOOKUP_MODELS_TABS.MODEL, language, Lng),
                                render: (
                                    <Model
                                        recall_lookup_models={recall_lookup_modelItem}
                                        getRecall_lookup_models={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onRecall_lookup_modelSelect={this.onRecall_lookup_modelSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddRecall_lookup_model={this.onAddRecall_lookup_model}
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
