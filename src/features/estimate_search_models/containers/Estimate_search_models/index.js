import React from 'react';
import { connect } from 'react-redux';
import { Estimate_search_models } from '../../components/Estimate_search_models';
import { reduxForm, getFormValues } from 'redux-form';
import * as Estimate_search_modelsAction from '../../actions';
import { ESTIMATE_SEARCH_MODEL_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        estimate_search_models: {
            estimate_search_models,
            loading: { estimate_search_modelsLoading }
        },
        customers: { customers },
    } = state;

    return {
        estimate_search_models,
        customers,
        loading: estimate_search_modelsLoading,
        language,
        formValues: getFormValues(ESTIMATE_SEARCH_MODEL_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getEstimate_search_models: Estimate_search_modelsAction.getEstimate_search_models,
    clearEstimate_search_models: Estimate_search_modelsAction.clearEstimate_search_models,
    getCustomers: getCustomers
};

//  Redux Forms
const estimate_search_modelSearchReduxForm = reduxForm({
    form: ESTIMATE_SEARCH_MODEL_SEARCH,
})(Estimate_search_models);

//  connect
const Estimate_search_modelsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(estimate_search_modelSearchReduxForm);

Estimate_search_modelsContainer.navigationOptions = (props) => ({
    header: null,
});

export default Estimate_search_modelsContainer;
