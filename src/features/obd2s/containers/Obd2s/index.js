import React from 'react';
import { connect } from 'react-redux';
import { Obd2s } from '../../components/Obd2s';
import { reduxForm, getFormValues } from 'redux-form';
import * as Obd2sAction from '../../actions';
import { OBD2_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';

const mapStateToProps = (state) => {

    const {
        global: { language },
        obd2s: {
            obd2s,
            loading: { obd2sLoading }
        },
        customers: { customers },
    } = state;

    return {
        obd2s,
        customers,
        loading: obd2sLoading,
        language,
        formValues: getFormValues(OBD2_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getObd2s: Obd2sAction.getObd2s,
    clearObd2s: Obd2sAction.clearObd2s,
    getCustomers: getCustomers
};

//  Redux Forms
const obd2SearchReduxForm = reduxForm({
    form: OBD2_SEARCH,
})(Obd2s);

//  connect
const Obd2sContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(obd2SearchReduxForm);

Obd2sContainer.navigationOptions = (props) => ({
    header: null,
});

export default Obd2sContainer;
