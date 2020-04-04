import React from 'react';
import { connect } from 'react-redux';
import { Recall_lookup_components } from '../../components/Recall_lookup_components';
import { reduxForm, getFormValues } from 'redux-form';
import * as Recall_lookup_componentsAction from '../../actions';
import { RECALL_LOOKUP_COMPONENT_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        recall_lookup_components: {
            recall_lookup_components,
            loading: { recall_lookup_componentsLoading }
        },
        customers: { customers },
    } = state;

    return {
        recall_lookup_components,
        customers,
        loading: recall_lookup_componentsLoading,
        language,
        formValues: getFormValues(RECALL_LOOKUP_COMPONENT_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getRecall_lookup_components: Recall_lookup_componentsAction.getRecall_lookup_components,
    clearRecall_lookup_components: Recall_lookup_componentsAction.clearRecall_lookup_components,
    getCustomers: getCustomers
};

//  Redux Forms
const recall_lookup_componentSearchReduxForm = reduxForm({
    form: RECALL_LOOKUP_COMPONENT_SEARCH,
})(Recall_lookup_components);

//  connect
const Recall_lookup_componentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(recall_lookup_componentSearchReduxForm);

Recall_lookup_componentsContainer.navigationOptions = (props) => ({
    header: null,
});

export default Recall_lookup_componentsContainer;
