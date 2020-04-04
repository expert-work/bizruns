import React from 'react';
import { connect } from 'react-redux';
import { Recall_lookup_componentItem } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as Recall_lookup_componentsAction from '../../actions';
import { ITEM_FORM } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        recall_lookup_components: { loading },
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
    addItem: Recall_lookup_componentsAction.addItem,
    setRecall_lookup_componentItems: Recall_lookup_componentsAction.setRecall_lookup_componentItems,
    removeRecall_lookup_componentItem: Recall_lookup_componentsAction.removeRecall_lookup_componentItem,
};

//  Redux Forms
const addItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate,
})(Recall_lookup_componentItem);

//  connect
const Recall_lookup_componentItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addItemReduxForm);

Recall_lookup_componentItemContainer.navigationOptions = () => ({
    header: null,
});

export default Recall_lookup_componentItemContainer;

