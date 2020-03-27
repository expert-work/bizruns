// @flow
import React from 'react';
import { View } from 'react-native';

import { change } from 'redux-form';
import styles from './styles';
import {
    MainLayout,
    ListView
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { SUBSCRIPTION_ADD, SUBSCRIPTION_EDIT, SUBSCRIPTION_SEARCH, SUBSCRIPTION_MODE } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';

let params = {
    search: '',
    subscription_mode: '',
    subscription_number: '',
    customer_id: '',
}

type IProps = {
    navigation: Object,
    getSubscriptions: Function,
    subscriptions: Object,
    loading: Boolean,
    language: String,
    getCustomers: Function,
}

export class Subscriptions extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1,
            },
            search: '',
            selectedSubscriptionMode: '',
            filter: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props
        this.getItems({ fresh: true });
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSubscriptionSelect = (subscription) => {
        const { navigation } = this.props
        navigation.navigate(ROUTES.SUBSCRIPTION,
            { subscriptionId: subscription.id, type: SUBSCRIPTION_EDIT }
        )
        this.onResetFilter()
    }

    onSearch = (search) => {
        this.onResetFilter()
        this.setState({ search })
        this.getItems({ fresh: true, params: { ...params, search } })
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(SUBSCRIPTION_SEARCH, field, value));

        if (field === 'subscription_mode')
            this.setState({ selectedSubscriptionMode: value })
    };

    getItems = ({
        fresh = false,
        onResult,
        params,
        filter = false
    } = {}) => {

        const { getSubscriptions } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getSubscriptions({
            fresh,
            pagination: paginationParams,
            params,
            filter,
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

    onResetFilter = () => {
        this.setState({ filter: false })
    }

    onSubmitFilter = ({ customer_id = '', subscription_mode = '', subscription_number = '' }) => {

        if (customer_id || subscription_mode || subscription_number) {
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    subscription_mode,
                    subscription_number,
                },
                filter: true
            })
        }
        else
            this.onResetFilter()
    }

    getSubscriptionsList = (subscriptions) => {
        let subscriptionList = []
        if (typeof subscriptions !== 'undefined' && subscriptions.length != 0) {
            subscriptionList = subscriptions.map((subscription) => {
                const {
                    notes,
                    formattedSubscriptionDate,
                    amount,
                    subscription_mode,
                    user: { name, currency }
                } = subscription;

                return {
                    title: `${name}`,
                    subtitle: {
                        title: `${subscription_mode ? '(' + subscription_mode + ')' : ''}`,
                    },
                    amount,
                    currency,
                    rightSubtitle: formattedSubscriptionDate,
                    fullItem: subscription,
                };
            });
        }
        return subscriptionList
    }

    loadMoreItems = () => {
        const { search, filter } = this.state

        const {
            formValues: {
                customer_id = '',
                subscription_mode = '',
                subscription_number = ''
            }
        } = this.props



        if (filter) {
            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    subscription_mode,
                    subscription_number,
                },
                filter: true
            })
        }
        else
            this.getItems({ params: { ...params, search } });

    }

    render() {

        const {
            navigation,
            subscriptions,
            filterSubscriptions,
            loading,
            language,
            handleSubmit,
            customers,
            getCustomers
        } = this.props;

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            selectedSubscriptionMode,
            filter,
        } = this.state;

        const canLoadMore = lastPage >= page;


        let subscriptionsItem = this.getSubscriptionsList(subscriptions)
        let filterSubscriptionItem = this.getSubscriptionsList(filterSubscriptions)

        let filterRefs = {}

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("subscriptions.customer", { locale: language }),
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

        let inputFields = [{
            name: 'subscription_number',
            hint: Lng.t("subscriptions.number", { locale: language }),
            leftIcon: 'hashtag',
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            },
            refLinkFn: (ref) => {
                filterRefs.subscriptionNumber = ref;
            }
        }]

        let dropdownFields = [{
            name: "subscription_mode",
            label: Lng.t("subscriptions.mode", { locale: language }),
            fieldIcon: 'align-center',
            items: SUBSCRIPTION_MODE,
            onChangeCallback: (val) => {
                this.setFormField('subscription_mode', val)
            },
            defaultPickerOptions: {
                label: Lng.t("subscriptions.modePlaceholder", { locale: language }),
                value: '',
            },
            selectedItem: selectedSubscriptionMode,
            onDonePress: () => filterRefs.subscriptionNumber.focus(),
            containerStyle: styles.selectPicker
        }]

        let empty = (!filter && !search) ? {
            description: Lng.t("subscriptions.empty.description", { locale: language }),
            buttonTitle: Lng.t("subscriptions.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.SUBSCRIPTION, { type: SUBSCRIPTION_ADD })
                this.onResetFilter()
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
            : (!filter) ? Lng.t("subscriptions.empty.title", { locale: language }) :
                Lng.t("filter.empty.filterTitle", { locale: language })

        let isLoading = navigation.getParam('loading', false)

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.SUBSCRIPTION, { type: SUBSCRIPTION_ADD })
                            this.onResetFilter()
                        },
                        title: Lng.t("header.subscriptions", { locale: language })
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        selectFields: selectFields,
                        inputFields: inputFields,
                        dropdownFields: dropdownFields,
                        clearFilter: this.props,
                        language: language,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    loadingProps={{ is: isLoading || (loading && fresh) }}
                >

                    <View style={styles.listViewContainer}>

                        <ListView
                            items={!filter ? subscriptionsItem : filterSubscriptionItem}
                            onPress={this.onSubscriptionSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!filter ? subscriptionsItem.length <= 0 :
                                filterSubscriptionItem.length <= 0
                            }
                            canLoadMore={canLoadMore}
                            getFreshItems={(onHide) => {
                                this.onResetFilter()
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    params: { ...params, search }
                                });
                            }}
                            getItems={() => {
                                this.loadMoreItems()
                            }}
                            contentContainerStyle={{ flex: 0 }}
                            bottomDivider
                            emptyContentProps={{
                                title: emptyTitle,
                                image: IMAGES.EMPTY_SUBSCRIPTIONS,
                                ...empty
                            }}
                        />

                    </View>
                </MainLayout>
            </View >
        );
    }
}
