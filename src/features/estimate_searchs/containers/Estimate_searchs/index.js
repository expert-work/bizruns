import React from 'react';
import { connect } from 'react-redux';
import { Estimate_searchs } from '../../components/Estimate_searchs';
import { reduxForm, getFormValues } from 'redux-form';
import * as Estimate_searchsAction from '../../actions';
import { ESTIMATE_SEARCH_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        estimate_searchs: {
            estimate_searchs,
            loading: { estimate_searchsLoading }
        },
        customers: { customers },
    } = state;

    return {
        estimate_searchs,
        customers,
        loading: estimate_searchsLoading,
        language,
        formValues: getFormValues(ESTIMATE_SEARCH_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getEstimate_searchs: Estimate_searchsAction.getEstimate_searchs,
    clearEstimate_searchs: Estimate_searchsAction.clearEstimate_searchs,
    getCustomers: getCustomers
};

//  Redux Forms
const estimate_searchSearchReduxForm = reduxForm({
    form: ESTIMATE_SEARCH_SEARCH,
})(Estimate_searchs);

//  connect
const Estimate_searchsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(estimate_searchSearchReduxForm);

Estimate_searchsContainer.navigationOptions = (props) => ({
    header: null,
});

export default Estimate_searchsContainer;
