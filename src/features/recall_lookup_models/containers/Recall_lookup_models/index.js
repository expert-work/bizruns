import React from 'react';
import { connect } from 'react-redux';
import { Recall_lookup_models } from '../../components/Recall_lookup_models';
import { reduxForm, getFormValues } from 'redux-form';
import * as Recall_lookup_modelsAction from '../../actions';
import { RECALL_LOOKUP_MODEL_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        recall_lookup_models: {
            recall_lookup_models,
            loading: { recall_lookup_modelsLoading }
        },
        customers: { customers },
    } = state;

    return {
        recall_lookup_models,
        customers,
        loading: recall_lookup_modelsLoading,
        language,
        formValues: getFormValues(RECALL_LOOKUP_MODEL_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getRecall_lookup_models: Recall_lookup_modelsAction.getRecall_lookup_models,
    clearRecall_lookup_models: Recall_lookup_modelsAction.clearRecall_lookup_models,
    getCustomers: getCustomers
};

//  Redux Forms
const recall_lookup_modelSearchReduxForm = reduxForm({
    form: RECALL_LOOKUP_MODEL_SEARCH,
})(Recall_lookup_models);

//  connect
const Recall_lookup_modelsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(recall_lookup_modelSearchReduxForm);

Recall_lookup_modelsContainer.navigationOptions = (props) => ({
    header: null,
});

export default Recall_lookup_modelsContainer;
