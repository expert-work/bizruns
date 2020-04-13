import React from 'react';
import { connect } from 'react-redux';
import { Estimate_search_makes } from '../../components/Estimate_search_makes';
import { reduxForm, getFormValues } from 'redux-form';
import * as Estimate_search_makesAction from '../../actions';
import { ESTIMATE_SEARCH_MAKE_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        estimate_search_makes: {
            estimate_search_makes,
            loading: { estimate_search_makesLoading }
        },
        customers: { customers },
    } = state;

    return {
        estimate_search_makes,
        customers,
        loading: estimate_search_makesLoading,
        language,
        formValues: getFormValues(ESTIMATE_SEARCH_MAKE_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getEstimate_search_makes: Estimate_search_makesAction.getEstimate_search_makes,
    clearEstimate_search_makes: Estimate_search_makesAction.clearEstimate_search_makes,
    getCustomers: getCustomers
};

//  Redux Forms
const estimate_search_makeSearchReduxForm = reduxForm({
    form: ESTIMATE_SEARCH_MAKE_SEARCH,
})(Estimate_search_makes);

//  connect
const Estimate_search_makesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(estimate_search_makeSearchReduxForm);

Estimate_search_makesContainer.navigationOptions = (props) => ({
    header: null,
});

export default Estimate_search_makesContainer;
