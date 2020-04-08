import React from 'react';
import { connect } from 'react-redux';
import { DictionaryItem } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as DictionariesAction from '../../actions';
import { ITEM_FORM } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        dictionaries: { loading },
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
    addItem: DictionariesAction.addItem,
    setDictionaryItems: DictionariesAction.setDictionaryItems,
    removeDictionaryItem: DictionariesAction.removeDictionaryItem,
};

//  Redux Forms
const addItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate,
})(DictionaryItem);

//  connect
const DictionaryItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addItemReduxForm);

DictionaryItemContainer.navigationOptions = () => ({
    header: null,
});

export default DictionaryItemContainer;

