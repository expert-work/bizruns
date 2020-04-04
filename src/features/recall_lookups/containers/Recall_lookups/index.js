import React from 'react';
import { connect } from 'react-redux';
import { Recall_lookups } from '../../components/Recall_lookups';
import { reduxForm, getFormValues } from 'redux-form';
import * as Recall_lookupsAction from '../../actions';
import { RECALL_LOOKUP_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        recall_lookups: {
            recall_lookups,
            loading: { recall_lookupsLoading }
        },
        customers: { customers },
    } = state;

    return {
        recall_lookups,
        customers,
        loading: recall_lookupsLoading,
        language,
        formValues: getFormValues(RECALL_LOOKUP_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getRecall_lookups: Recall_lookupsAction.getRecall_lookups,
    clearRecall_lookups: Recall_lookupsAction.clearRecall_lookups,
    getCustomers: getCustomers
};

//  Redux Forms
const recall_lookupSearchReduxForm = reduxForm({
    form: RECALL_LOOKUP_SEARCH,
})(Recall_lookups);

//  connect
const Recall_lookupsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(recall_lookupSearchReduxForm);

Recall_lookupsContainer.navigationOptions = (props) => ({
    header: null,
});

export default Recall_lookupsContainer;
