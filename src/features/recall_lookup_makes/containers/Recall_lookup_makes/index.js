import React from 'react';
import { connect } from 'react-redux';
import { Recall_lookup_makes } from '../../components/Recall_lookup_makes';
import { reduxForm, getFormValues } from 'redux-form';
import * as Recall_lookup_makesAction from '../../actions';
import { RECALL_LOOKUP_MAKE_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        recall_lookup_makes: {
            recall_lookup_makes,
            loading: { recall_lookup_makesLoading }
        },
        customers: { customers },
    } = state;

    return {
        recall_lookup_makes,
        customers,
        loading: recall_lookup_makesLoading,
        language,
        formValues: getFormValues(RECALL_LOOKUP_MAKE_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getRecall_lookup_makes: Recall_lookup_makesAction.getRecall_lookup_makes,
    clearRecall_lookup_makes: Recall_lookup_makesAction.clearRecall_lookup_makes,
    getCustomers: getCustomers
};

//  Redux Forms
const recall_lookup_makeSearchReduxForm = reduxForm({
    form: RECALL_LOOKUP_MAKE_SEARCH,
})(Recall_lookup_makes);

//  connect
const Recall_lookup_makesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(recall_lookup_makeSearchReduxForm);

Recall_lookup_makesContainer.navigationOptions = (props) => ({
    header: null,
});

export default Recall_lookup_makesContainer;
