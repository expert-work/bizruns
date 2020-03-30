import React from 'react';
import { connect } from 'react-redux';
import { Dictionary } from '../../components/Dictionary';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as DictionariesAction from '../../actions';
import { DICTIONARY_FORM, DICTIONARY_DETAIL } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { language, taxTypes },
        dictionaries: { loading, dictionaryItems, dictionaryData, items },
        customers: { customers },
    } = state;

    const { dictionary = null, nextDictionaryNumber, dictionaryTemplates } = dictionaryData;

    let type = navigation.getParam('type')

    let isLoading = loading.initDictionaryLoading || (type === DICTIONARY_DETAIL && !dictionary)
        || !nextDictionaryNumber

    return {
        initLoading: isLoading,
        loading: loading.dictionaryLoading,
        dictionaryItems,
        dictionaryData,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        language,
        formValues: getFormValues(DICTIONARY_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            expiry_date: moment().add(7, 'days'),
            dictionary_date: moment(),
            dictionary_number: nextDictionaryNumber,
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            dictionary_template_id: dictionaryTemplates[0] && dictionaryTemplates[0].id,
            ...dictionary,
            customer: dictionary && dictionary.user,
            template: dictionary && dictionary.dictionary_template,
        } : null
    };
};

const mapDispatchToProps = {
    getCreateDictionary: DictionariesAction.getCreateDictionary,
    createDictionary: DictionariesAction.createDictionary,
    getItems: DictionariesAction.getItems,
    getEditDictionary: DictionariesAction.getEditDictionary,
    detailDictionary: DictionariesAction.detailDictionary,
    removeDictionaryItems: DictionariesAction.removeDictionaryItems,
    removeDictionary: DictionariesAction.removeDictionary,
    convertToInvoice: DictionariesAction.convertToInvoice,
    clearDictionary: DictionariesAction.clearDictionary,
    convertToInvoice: DictionariesAction.convertToInvoice,
    changeDictionaryStatus: DictionariesAction.changeDictionaryStatus,
    getCustomers: CustomersAction.getCustomers,
};

//  Redux Forms
const addDictionaryReduxForm = reduxForm({
    form: DICTIONARY_FORM,
    validate,
})(Dictionary);

//  connect
const DictionaryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addDictionaryReduxForm);

DictionaryContainer.navigationOptions = () => ({
    header: null,
});

export default DictionaryContainer;
