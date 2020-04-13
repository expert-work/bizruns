import React from 'react';
import { connect } from 'react-redux';
import { Estimate_search_repairs } from '../../components/Estimate_search_repairs';
import { reduxForm, getFormValues } from 'redux-form';
import * as Estimate_search_repairsAction from '../../actions';
import { ESTIMATE_SEARCH_REPAIR_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        estimate_search_repairs: {
            estimate_search_repairs,
            loading: { estimate_search_repairsLoading }
        },
        customers: { customers },
    } = state;

    return {
        estimate_search_repairs,
        customers,
        loading: estimate_search_repairsLoading,
        language,
        formValues: getFormValues(ESTIMATE_SEARCH_REPAIR_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getEstimate_search_repairs: Estimate_search_repairsAction.getEstimate_search_repairs,
    clearEstimate_search_repairs: Estimate_search_repairsAction.clearEstimate_search_repairs,
    getCustomers: getCustomers
};

//  Redux Forms
const estimate_search_repairSearchReduxForm = reduxForm({
    form: ESTIMATE_SEARCH_REPAIR_SEARCH,
})(Estimate_search_repairs);

//  connect
const Estimate_search_repairsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(estimate_search_repairSearchReduxForm);

Estimate_search_repairsContainer.navigationOptions = (props) => ({
    header: null,
});

export default Estimate_search_repairsContainer;
