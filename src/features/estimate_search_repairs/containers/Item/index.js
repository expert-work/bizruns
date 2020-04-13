import React from 'react';
import { connect } from 'react-redux';
import { Estimate_search_repairItem } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as Estimate_search_repairsAction from '../../actions';
import { ITEM_FORM } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        estimate_search_repairs: { loading },
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
    addItem: Estimate_search_repairsAction.addItem,
    setEstimate_search_repairItems: Estimate_search_repairsAction.setEstimate_search_repairItems,
    removeEstimate_search_repairItem: Estimate_search_repairsAction.removeEstimate_search_repairItem,
};

//  Redux Forms
const addItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate,
})(Estimate_search_repairItem);

//  connect
const Estimate_search_repairItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addItemReduxForm);

Estimate_search_repairItemContainer.navigationOptions = () => ({
    header: null,
});

export default Estimate_search_repairItemContainer;

