import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as SubscriptionAction from '../../actions';
import { SUBSCRIPTION_FORM, SUBSCRIPTION_ADD } from '../../constants';
import { Subscription } from '../../components/Subscription';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {

    const {
        customers: { customers },
        global: { language },
        subscriptions: {
            loading: {
                initSubscriptionLoading,
                subscriptionLoading,
                getUnpaidInvoicesLoading,
            }
        }
    } = state

    let type = navigation.getParam('type', SUBSCRIPTION_ADD)
    let invoice = navigation.getParam('invoice', null)
    let hasRecordSubscription = navigation.getParam('hasRecordSubscription', false)

    return {
        type,
        customers,
        language: language,
        invoice,
        hasRecordSubscription,
        initSubscriptionLoading,
        subscriptionLoading,
        getUnpaidInvoicesLoading,
        formValues: getFormValues(SUBSCRIPTION_FORM)(state) || {},

        initialValues: {
            subscription_mode: null
        }
    };

};

const mapDispatchToProps = {
    getCreateSubscription: SubscriptionAction.getCreateSubscription,
    createSubscription: SubscriptionAction.createSubscription,
    getEditSubscription: SubscriptionAction.getEditSubscription,
    getUnpaidInvoices: SubscriptionAction.getUnpaidInvoices,
    editSubscription: SubscriptionAction.editSubscription,
    removeSubscription: SubscriptionAction.removeSubscription,
    getCustomers: getCustomers
};


//  Redux Forms
const addEditSubscriptionReduxForm = reduxForm({
    form: SUBSCRIPTION_FORM,
    validate: (val) => validate(val),
})(Subscription);

//  connect
const AddEditSubscriptionContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addEditSubscriptionReduxForm);

AddEditSubscriptionContainer.navigationOptions = () => ({
    header: null,
});

export default AddEditSubscriptionContainer;
