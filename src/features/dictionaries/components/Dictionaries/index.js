// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
 import Byletter from '../Tab/Byletter';
import All from '../Tab/All';

import { ROUTES } from '../../../../navigation/routes';
import { DICTIONARIES_TABS, DICTIONARY_ADD, DICTIONARY_DETAIL, DICTIONARY_SEARCH, FILTER_DICTIONARY_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    dictionary_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    dictionaries: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Dictionaries extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: DICTIONARIES_TABS.ALL,
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


        const { getDictionaries } = this.props;
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

        getDictionaries({
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

    onDictionarySelect = (dictionary) => {    
        const { navigation } = this.props;
        if(this.state.activeTab =='ALL'){
          navigation.navigate(ROUTES.DICTIONARY, { id: dictionary.id, type: DICTIONARY_DETAIL,name: dictionary.name,description:dictionary.description})
         this.onResetFilter(DICTIONARIES_TABS.ALL)
         this.setActiveTab(DICTIONARIES_TABS.ALL)   
        }
         if(this.state.activeTab =='BYLETTER'){
                  // Alert.alert(this.state.activeTab+' '+dictionary.letter);
                   this.setState({ activeTab:'ALL' })
                  const type = 'ALL';
                  let search=dictionary.letter;
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
         if (activeTab == DICTIONARIES_TABS.ALL) {
            type = 'ALL';
        } else if (activeTab == DICTIONARIES_TABS.BYLETTER) {
            type = 'BYLETTER';
        }
         return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(DICTIONARY_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', dictionary_number = '', customer_id = '' }) => {

         if (filterStatus || from_date || to_date || dictionary_number || customer_id) {

            if (filterStatus === DICTIONARIES_TABS.ALL)
                this.setState({ activeTab: DICTIONARIES_TABS.ALL });
            else if (filterStatus === DICTIONARIES_TABS.BYLETTER)
                this.setState({ activeTab: DICTIONARIES_TABS.BYLETTER });
 
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    dictionary_number,
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
                dictionary_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    dictionary_number,
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

    onAddDictionary = () => {
        const { navigation } = this.props
        this.setActiveTab(DICTIONARIES_TABS.ALL)
        this.onResetFilter(DICTIONARIES_TABS.ALL)
        navigation.navigate(ROUTES.DICTIONARY, { type: DICTIONARY_ADD })
    }

    render() {
        const {
            language,
            navigation,
            dictionaries,
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

        let dictionaryItem = [];
        typeof dictionaries !== 'undefined' && (dictionaryItem = dictionaries);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("dictionaries.customer", { locale: language }),
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
                label: Lng.t("dictionaries.fromDate", { locale: language }),
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
                label: Lng.t("dictionaries.toDate", { locale: language }),
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
            name: 'dictionary_number',
            hint: Lng.t("dictionaries.dictionaryNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("dictionaries.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_DICTIONARY_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("dictionaries.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.dictionaries", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.dictionaries", { locale: language }),
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
                                Title: DICTIONARIES_TABS.ALL,
                                tabName: TAB_NAME(DICTIONARIES_TABS.ALL, language, Lng),
                                render: (
                                    <All
                                        dictionaries={dictionaryItem}
                                        getDictionaries={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onDictionarySelect={this.onDictionarySelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddDictionary={this.onAddDictionary}
                                        filter={filter}
                                    />
                                ),
                            },
                             {
                                Title: DICTIONARIES_TABS.BYLETTER,
                                tabName: TAB_NAME(DICTIONARIES_TABS.BYLETTER, language, Lng),
                                render: (
                                    <Byletter
                                        dictionaries={dictionaryItem}
                                        getDictionaries={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onDictionarySelect={this.onDictionarySelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddDictionary={this.onAddDictionary}
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
