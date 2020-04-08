import React from 'react';
import { connect } from 'react-redux';
import { Obd2Item } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as Obd2sAction from '../../actions';
import { ITEM_FORM } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        obd2s: { loading },
        global: { language, taxTypes },
    } = state;

    const item = navigation.getParam('item', {});

    const type = navigation.getParam('type');
    const discountPerItem = navigation.getParam('discount_per_item');
    const taxPerItem = navigation.getParam('tax_per_item');

    const isLoading = loading.editItemLoading || loading.removeItemLoading

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId: item && (item.item_id || item.id),
        taxTypes,
        currency: navigation.getParam('currency'),
        language: language,
        discountPerItem,
        taxPerItem,
        type,
        initialValues: {
            price: 0,
            quantity: 1,
            discount_type: 'none',
            discount: 0,
            taxes: [],
            ...item
        },
    };
};

const mapDispatchToProps = {
    addItem: Obd2sAction.addItem,
    setObd2Items: Obd2sAction.setObd2Items,
    removeObd2Item: Obd2sAction.removeObd2Item,
};

//  Redux Forms
const addItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate,
})(Obd2Item);

//  connect
const Obd2ItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addItemReduxForm);

Obd2ItemContainer.navigationOptions = () => ({
    header: null,
});

export default Obd2ItemContainer;

