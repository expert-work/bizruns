// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Bybrand from '../Tab/Bybrand';
import Generic from '../Tab/Generic';

import { ROUTES } from '../../../../navigation/routes';
import { OBD2S_TABS, OBD2_ADD, OBD2_DETAIL, OBD2_SEARCH, FILTER_OBD2_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    obd2_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    obd2s: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Obd2s extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: OBD2S_TABS.GENERIC,
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
        this.getItems({ fresh: true, q: '', type: 'GENERIC' });

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


        const { getObd2s } = this.props;
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

        getObd2s({
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

    onObd2Select = (obd2) => {  

    
    
    
    
    


        const { navigation } = this.props;
        if(this.state.activeTab =='GENERIC'){
          navigation.navigate(ROUTES.OBD2, { id: obd2.id,  code: obd2.code,type: OBD2_DETAIL,code_description: obd2.code_description,code_causes:obd2.code_causes,code_description_expanded:obd2.code_description_expanded,code_symptoms:obd2.code_symptoms,code_warnings:obd2.code_warnings})
         this.onResetFilter(OBD2S_TABS.GENERIC)
         this.setActiveTab(OBD2S_TABS.GENERIC)   
        }
         if(this.state.activeTab =='BYBRAND'){
                  // Alert.alert(this.state.activeTab+' '+obd2.letter);
                   this.setState({ activeTab:'GENERIC' })
                  const type = 'GENERIC';
                  let search=obd2.brand;
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
         if (activeTab == OBD2S_TABS.GENERIC) {
            type = 'GENERIC';
        } else if (activeTab == OBD2S_TABS.BYBRAND) {
            type = 'BYBRAND';
        }
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(OBD2_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', obd2_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || obd2_number || customer_id) {

            if (filterStatus === OBD2S_TABS.GENERIC)
                this.setState({ activeTab: OBD2S_TABS.GENERIC });
            else if (filterStatus === OBD2S_TABS.BYBRAND)
                this.setState({ activeTab: OBD2S_TABS.BYBRAND });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    obd2_number,
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
                obd2_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    obd2_number,
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

    onAddObd2 = () => {
        const { navigation } = this.props
        this.setActiveTab(OBD2S_TABS.GENERIC)
        this.onResetFilter(OBD2S_TABS.GENERIC)
        navigation.navigate(ROUTES.OBD2, { type: OBD2_ADD })
    }

    render() {
        const {
            language,
            navigation,
            obd2s,
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

        let obd2Item = [];
        typeof obd2s !== 'undefined' && (obd2Item = obd2s);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("obd2s.customer", { locale: language }),
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
                label: Lng.t("obd2s.fromDate", { locale: language }),
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
                label: Lng.t("obd2s.toDate", { locale: language }),
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
            name: 'obd2_number',
            hint: Lng.t("obd2s.obd2Number", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("obd2s.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_OBD2_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("obd2s.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.obd2s", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.obd2s", { locale: language }),
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
                                Title: OBD2S_TABS.GENERIC,
                                tabName: TAB_NAME(OBD2S_TABS.GENERIC, language, Lng),
                                render: (
                                    <Generic
                                        obd2s={obd2Item}
                                        getObd2s={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onObd2Select={this.onObd2Select}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddObd2={this.onAddObd2}
                                        filter={filter}
                                    />
                                ),
                            },
                             {
                                Title: OBD2S_TABS.BYBRAND,
                                tabName: TAB_NAME(OBD2S_TABS.BYBRAND, language, Lng),
                                render: (
                                    <Bybrand
                                        obd2s={obd2Item}
                                        getObd2s={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onObd2Select={this.onObd2Select}
                                        loading={loading}
                                        refreshing={refreshing}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddObd2={this.onAddObd2}
                                        fresh={fresh}
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
