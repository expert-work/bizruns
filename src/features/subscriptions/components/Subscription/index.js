// @flow

import React from 'react';
import { View, Alert } from 'react-native';
import { Field, change } from 'redux-form';
import moment from 'moment';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout,
    DatePickerField,
    SelectPickerField,
    SelectField,
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { DATE_FORMAT } from '../../../../api/consts/core';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { PAYMENT_ADD, PAYMENT_MODE, PAYMENT_EDIT, PAYMENT_FORM, PAYMENT_ACTIONS, ACTIONS_VALUE } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { IMAGES } from '../../../../config';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { INVOICES_STATUS_BG_COLOR, INVOICES_STATUS_TEXT_COLOR } from '../../../invoices/constants';
import { MAX_LENGTH, alertMe } from '../../../../api/global';

let subscriptionRefs = {}

type IProps = {
    navigation: Object,
    customers: Object,
    getCreateSubscription: Function,
    getEditSubscription: Function,
    getUnpaidInvoices: Function,
    createSubscription: Function,
    editSubscription: Function,
    handleSubmit: Function,
    type: String,
    language: String,
    subscriptionLoading: Boolean,
    initSubscriptionLoading: Boolean,
    getUnpaidInvoicesLoading: Boolean,
    getCustomers: Function,
}

let editSubscriptionData = [
    "subscription_date",
    "subscription_number",
    "user_id",
    "invoice_id",
    "subscription_mode",
    "amount",
    "notes"
]

export class Subscription extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            selectedInvoice: '',
            selectedCustomer: '',
            selectedSubscriptionMode: '',
            isLoading: true,
        };
    }

    componentDidMount() {
        const {
            getCreateSubscription,
            navigation,
            getEditSubscription,
            type,
            hasRecordSubscription,
        } = this.props;

        if (type === PAYMENT_EDIT) {

            let id = navigation.getParam('subscriptionId', null)
            this.setFormField('id', id)

            getEditSubscription({
                id,
                onResult: ({ subscription, invoices }) => {

                    let { user_id, subscription_mode, invoice_id, invoice, amount } = subscription

                    editSubscriptionData.map((field) => {
                        this.setFormField(field, subscription[field])
                    })

                    invoice_id && invoice && this.setFormField('due',
                        (Number(amount) + Number(invoice.due_amount))
                    )

                    this.setState({
                        selectedCustomer: user_id ? subscription.user : '',
                        selectedInvoice: invoice_id ? subscription.invoice.invoice_number : '',
                        selectedSubscriptionMode: subscription_mode,
                    })

                    if (user_id)
                        this.setState({ invoices })

                    this.setState({ isLoading: false })
                }
            });
        }
        else {
            getCreateSubscription({
                onResult: (val) => {
                    this.setFormField('subscription_number', val.nextSubscriptionNumber)
                    this.setFormField('subscription_date', moment())

                    hasRecordSubscription ?
                        this.SetRecordSubscriptionField() :
                        this.setState({ isLoading: false })
                }
            });
        }

        goBack(MOUNT, navigation, { route: hasRecordSubscription ? null : ROUTES.MAIN_PAYMENTS })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }


    SetRecordSubscriptionField = () => {
        const {
            invoice: {
                user,
                user_id,
                due_amount,
                invoice_number,
                id
            },
            getUnpaidInvoices,
        } = this.props

        this.setFormField('user_id', user_id)
        this.setFormField('amount', due_amount)
        this.setFormField('due', due_amount)
        this.setFormField('invoice_id', id)

        this.setState({
            selectedCustomer: user,
            selectedInvoice: invoice_number
        })

        getUnpaidInvoices({
            id: user_id,
            onResult: (invoices) => {
                invoices.length !== 0 ?
                    this.setState({
                        invoices,
                        isLoading: false
                    })
                    : this.setState({ isLoading: false })
            }
        })
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(PAYMENT_FORM, field, value));

        if (field === 'subscription_mode') {
            this.setState({
                selectedSubscriptionMode: value
            })
        }
    };

    onCustomerSelect = (customer) => {
        const { getUnpaidInvoices } = this.props
        let { id } = customer
        this.setFormField('user_id', id)
        this.setState({ selectedCustomer: customer })

        getUnpaidInvoices({
            id,
            onResult: (invoices) => {
                if (invoices.length !== 0) {

                    this.setState({
                        invoices,
                        selectedInvoice: ''
                    })
                    this.setFormField('invoice_id', '')
                }
                else {
                    this.setState({
                        invoices: [],
                        selectedInvoice: ''
                    })
                    this.setFormField('invoice_id', '')
                }
            }
        })
    }

    onSubscriptionSubmit = (values) => {

        const {
            type,
            createSubscription,
            editSubscription,
            navigation,
            hasRecordSubscription,
            language
        } = this.props

        type === PAYMENT_ADD ?
            createSubscription({
                params: values,
                navigation,
                hasRecordSubscription,
                onResult: (val) => {
                    val === 'invalid_amount' &&
                        alertMe({ title: Lng.t("subscriptions.alertAmount", { locale: language }) })
                }
            })
            :
            editSubscription({
                id: navigation.getParam('subscriptionId'),
                params: values,
                navigation
            })
    };


    getInvoicesList = (items) => {
        let invoicesList = []
        if (typeof items !== 'undefined' && items.length != 0) {

            const { selectedCustomer } = this.state
            const { name = '', currency = null } = selectedCustomer

            invoicesList = items.map((item) => {
                const {
                    invoice_number,
                    status,
                    formattedDueDate,
                    due_amount,
                } = item;

                return {
                    title: name,
                    subtitle: {
                        title: invoice_number,
                        label: status,
                        labelBgColor: INVOICES_STATUS_BG_COLOR[status],
                        labelTextColor: INVOICES_STATUS_TEXT_COLOR[status],
                    },
                    amount: due_amount,
                    currency,
                    rightSubtitle: formattedDueDate,
                    fullItem: item,
                };
            });

        }

        return invoicesList
    }

    removeSubscription = () => {
        const { removeSubscription, navigation, language } = this.props

        Alert.alert(
            Lng.t("alert.title", { locale: language }),
            Lng.t("subscriptions.alertDescription", { locale: language }),
            [
                {
                    text: 'OK',
                    onPress: () => removeSubscription({
                        id: navigation.getParam('subscriptionId', null),
                        navigation
                    })
                },
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }

    onOptionSelect = (action) => {

        if (action == ACTIONS_VALUE.REMOVE)
            this.removeSubscription()

    }

    BOTTOM_ACTION = (handleSubmit) => {

        const {
            language,
            subscriptionLoading
        } = this.props

        let buttonTitle = Lng.t("button.save", { locale: language })

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onSubscriptionSubmit)}
                    btnTitle={buttonTitle}
                    loading={subscriptionLoading}
                />
            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            customers,
            language,
            initSubscriptionLoading,
            getUnpaidInvoicesLoading,
            type,
            getCustomers,
            formValues: { due = '', amount = 0 },
            submitFailed = false,
        } = this.props;

        const {
            selectedInvoice,
            selectedCustomer,
            selectedSubscriptionMode,
            invoices,
            isLoading
        } = this.state

        let drownDownProps = type === PAYMENT_EDIT ? {
            options: PAYMENT_ACTIONS(Lng, language),
            onSelect: this.onOptionSelect,
            cancelButtonIndex: 1,
            destructiveButtonIndex: 2
        } : null


        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: type === PAYMENT_EDIT ?
                        Lng.t("header.editSubscription", { locale: language }) :
                        Lng.t("header.addSubscription", { locale: language }),
                    placement: "center",
                    rightIcon: type !== PAYMENT_EDIT ? "save" : null,
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onSubscriptionSubmit),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: isLoading || initSubscriptionLoading
                }}
                dropdownProps={drownDownProps}
            >

                <View style={styles.bodyContainer}>

                    <View style={styles.numberDateFieldContainer}>
                        <View style={styles.numberDateField}>
                            <Field
                                name="subscription_date"
                                component={DatePickerField}
                                dateTimeFormat={DATE_FORMAT}
                                label={Lng.t("subscriptions.date", { locale: language })}
                                icon={'calendar-alt'}
                                onChangeCallback={(val) => {
                                    this.setFormField('subscription_date', val)
                                }}
                                isRequired
                            />
                        </View>

                        <View style={styles.numberDateField}>
                            <Field
                                name="subscription_number"
                                component={InputField}
                                hint={Lng.t("subscriptions.number", { locale: language })}
                                inputProps={{
                                    returnKeyType: 'next',
                                    autoCapitalize: 'none',
                                    autoCorrect: true,
                                }}
                                editable={false}
                                inputContainerStyle={styles.subscriptionNumberField}
                                isRequired
                            />
                        </View>
                    </View>

                    <Field
                        name="user_id"
                        apiSearch
                        hasPagination
                        getItems={getCustomers}
                        items={customers}
                        displayName="name"
                        component={SelectField}
                        label={Lng.t("subscriptions.customer", { locale: language })}
                        icon={'user'}
                        placeholder={selectedCustomer ? selectedCustomer.name : Lng.t("subscriptions.customerPlaceholder", { locale: language })}
                        navigation={navigation}
                        compareField="id"
                        onSelect={(item) => {
                            this.onCustomerSelect(item)
                            this.setFormField('due', '')
                        }}
                        rightIconPress={
                            () => navigation.navigate(ROUTES.CUSTOMER, {
                                type: CUSTOMER_ADD,
                                onSelect: (val) => {
                                    this.onCustomerSelect(val)
                                    this.setFormField('due', '')
                                }
                            })
                        }
                        headerProps={{
                            title: Lng.t("customers.title", { locale: language }),
                        }}
                        listViewProps={{
                            hasAvatar: true,
                        }}
                        emptyContentProps={{
                            contentType: "customers",
                            image: IMAGES.EMPTY_CUSTOMERS,
                        }}
                        isRequired
                        isEditable={type === PAYMENT_ADD}
                        fakeInputProps={{
                            disabled: type !== PAYMENT_ADD
                        }}
                    />

                    <Field
                        name="amount"
                        component={InputField}
                        leftIcon={'dollar-sign'}
                        hint={Lng.t("subscriptions.amount", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            keyboardType: 'numeric',
                        }}
                        isCurrencyInput
                        refLinkFn={(ref) => {
                            subscriptionRefs.amount = ref;
                        }}
                        isRequired
                    />

                    <Field
                        name="invoice_id"
                        items={this.getInvoicesList(invoices)}
                        displayName="invoice_number"
                        component={SelectField}
                        label={Lng.t("subscriptions.invoice", { locale: language })}
                        icon={'file-invoice'}
                        placeholder={selectedInvoice ? selectedInvoice : Lng.t("subscriptions.invoicePlaceholder", { locale: language })}
                        navigation={navigation}
                        fakeInputProps={{
                            loading: getUnpaidInvoicesLoading
                        }}
                        isInternalSearch
                        searchFields={['invoice_number', 'due_amount']}
                        compareField="id"
                        onSearch={
                            ({ searchItems, hasAll }) => {
                                this.setState({ customerList: hasAll ? customers : searchItems })
                            }
                        }
                        onSelect={({ id, due_amount }) => {
                            this.setFormField('invoice_id', id)
                            this.setFormField('amount', due_amount)
                            this.setFormField('due', due_amount)
                            subscriptionRefs.amount.focus();
                        }}
                        headerProps={{
                            title: Lng.t("invoices.title", { locale: language }),
                            rightIconPress: null
                        }}
                        listViewProps={{
                        }}
                        emptyContentProps={{
                            contentType: "invoices",
                            image: IMAGES.EMPTY_INVOICES,
                        }}
                        containerStyle={
                            due && submitFailed && amount > due &&
                            { marginTop: 22 }
                        }
                        isEditable={type === PAYMENT_ADD}
                        fakeInputProps={{
                            disabled: type !== PAYMENT_ADD
                        }}
                    />

                    <Field
                        name="subscription_mode"
                        component={SelectPickerField}
                        label={Lng.t("subscriptions.mode", { locale: language })}
                        fieldIcon='align-center'
                        items={PAYMENT_MODE}
                        selectedItem={selectedSubscriptionMode}
                        onChangeCallback={(val) => {
                            this.setFormField('subscription_mode', val)
                        }}
                        onDonePress={() => subscriptionRefs.notes.focus()}
                        defaultPickerOptions={{
                            label: Lng.t("subscriptions.modePlaceholder", { locale: language }),
                            value: '',
                        }}
                        refLinkFn={(ref) => {
                            subscriptionRefs.mode = ref;
                        }}
                        containerStyle={styles.selectPicker}
                    />

                    <Field
                        name="notes"
                        component={InputField}
                        hint={Lng.t("subscriptions.notes", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            placeholder: Lng.t("subscriptions.notesPlaceholder", { locale: language }),
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={80}
                        autoCorrect={true}
                        refLinkFn={(ref) => {
                            subscriptionRefs.notes = ref;
                        }}
                    />

                </View>
            </DefaultLayout >
        );
    }
}

