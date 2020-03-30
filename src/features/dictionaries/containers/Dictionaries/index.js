import React from 'react';
import { connect } from 'react-redux';
import { Dictionaries } from '../../components/Dictionaries';
import { reduxForm, getFormValues } from 'redux-form';
import * as DictionariesAction from '../../actions';
import { DICTIONARY_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        dictionaries: {
            dictionaries,
            loading: { dictionariesLoading }
        },
        customers: { customers },
    } = state;

    return {
        dictionaries,
        customers,
        loading: dictionariesLoading,
        language,
        formValues: getFormValues(DICTIONARY_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getDictionaries: DictionariesAction.getDictionaries,
    clearDictionaries: DictionariesAction.clearDictionaries,
    getCustomers: getCustomers
};

//  Redux Forms
const dictionarySearchReduxForm = reduxForm({
    form: DICTIONARY_SEARCH,
})(Dictionaries);

//  connect
const DictionariesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(dictionarySearchReduxForm);

DictionariesContainer.navigationOptions = (props) => ({
    header: null,
});

export default DictionariesContainer;
