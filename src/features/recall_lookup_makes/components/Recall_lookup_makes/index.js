// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Bybrand from '../Tab/Bybrand';
import Make from '../Tab/Make';

import { ROUTES } from '../../../../navigation/routes';
import { RECALL_LOOKUP_MAKES_TABS, RECALL_LOOKUP_MAKE_ADD, RECALL_LOOKUP_MAKE_DETAIL, RECALL_LOOKUP_MAKE_SEARCH, FILTER_RECALL_LOOKUP_MAKE_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    recall_lookup_make_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    recall_lookup_makes: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Recall_lookup_makes extends React.Component<IProps> {
    constructor(props) {
        super(props);
        const { navigation } = this.props

        this.state = {
            activeTab: RECALL_LOOKUP_MAKES_TABS.MAKE,
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

        const { navigation } = this.props

        this.getItems({ fresh: true, q: '', type: 'MAKE' });
         
         goBack(MOUNT, navigation, { route: ROUTES.RECALL_LOOKUP_LIST })
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


        const { getRecall_lookup_makes } = this.props;
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

        getRecall_lookup_makes({
            fresh,
            type,
            pagination: paginationParams,
            params: { ...params, search: q ,year:this.state.YEAR},
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

    onRecall_lookup_makeSelect = (recall_lookup_make) => {  
 
        const { navigation } = this.props;
        if(this.state.activeTab =='MAKE'){
          navigation.navigate(ROUTES.RECALL_LOOKUP_MODEL_LIST, { id: recall_lookup_make.id,  make: recall_lookup_make.make, year:this.state.YEAR})
          this.onResetFilter(RECALL_LOOKUP_MAKES_TABS.MAKE)
          this.setActiveTab(RECALL_LOOKUP_MAKES_TABS.MAKE)   
        }
         if(this.state.activeTab =='BYBRAND'){
                  // Alert.alert(this.state.activeTab+' '+recall_lookup_make.letter);
                   this.setState({ activeTab:'MAKE' })
                  const type = 'MAKE';
                  let search=recall_lookup_make.brand;
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
         if (activeTab == RECALL_LOOKUP_MAKES_TABS.MAKE) {
            type = 'MAKE';
        } 
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(RECALL_LOOKUP_MAKE_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', recall_lookup_make_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || recall_lookup_make_number || customer_id) {

            if (filterStatus === RECALL_LOOKUP_MAKES_TABS.MAKE)
                this.setState({ activeTab: RECALL_LOOKUP_MAKES_TABS.MAKE });
            else if (filterStatus === RECALL_LOOKUP_MAKES_TABS.BYBRAND)
                this.setState({ activeTab: RECALL_LOOKUP_MAKES_TABS.BYBRAND });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_make_number,
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
                recall_lookup_make_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    recall_lookup_make_number,
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

    onAddRecall_lookup_make = () => {
        const { navigation } = this.props
        this.setActiveTab(RECALL_LOOKUP_MAKES_TABS.MAKE)
        this.onResetFilter(RECALL_LOOKUP_MAKES_TABS.MAKE)
        navigation.navigate(ROUTES.RECALL_LOOKUP_MAKE, { type: RECALL_LOOKUP_MAKE_ADD })
    }

    render() {
        const {
            language,
            navigation,
            recall_lookup_makes,
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

        let recall_lookup_makeItem = [];
        typeof recall_lookup_makes !== 'undefined' && (recall_lookup_makeItem = recall_lookup_makes);

        
      
       
        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.recall_lookup_makes", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.RECALL_LOOKUP_LIST),
                        title: Lng.t("header.recall_lookup_makes", { locale: language }),
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
                                Title:  RECALL_LOOKUP_MAKES_TABS.MAKE,
                                tabName: TAB_NAME(RECALL_LOOKUP_MAKES_TABS.MAKE, language, Lng),
                                render: (
                                    <Make
                                        recall_lookup_makes={recall_lookup_makeItem}
                                        getRecall_lookup_makes={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onRecall_lookup_makeSelect={this.onRecall_lookup_makeSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddRecall_lookup_make={this.onAddRecall_lookup_make}
                                        filter={filter}
                                    />
                                ),
                            }                         ]}
                    />
                </MainLayout>
            </View>
        );
    }
}
