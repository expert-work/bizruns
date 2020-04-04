import React from 'react';
import { connect } from 'react-redux';
import { Obd2 } from '../../components/Obd2';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as Obd2sAction from '../../actions';
import { OBD2_FORM, OBD2_DETAIL } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { language, taxTypes },
        obd2s: { loading, obd2Items, obd2Data, items },
        customers: { customers },
    } = state;

    const { obd2 = null, nextObd2Number, obd2Templates } = obd2Data;

    let type = navigation.getParam('type')

    let isLoading = loading.initObd2Loading || (type === OBD2_DETAIL && !obd2)
        || !nextObd2Number

    return {
        initLoading: isLoading,
        loading: loading.obd2Loading,
        obd2Items,
        obd2Data,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        language,
        formValues: getFormValues(OBD2_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            expiry_date: moment().add(7, 'days'),
            obd2_date: moment(),
            obd2_number: nextObd2Number,
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            obd2_template_id: obd2Templates[0] && obd2Templates[0].id,
            ...obd2,
            customer: obd2 && obd2.user,
            template: obd2 && obd2.obd2_template,
        } : null
    };
};

const mapDispatchToProps = {
    getCreateObd2: Obd2sAction.getCreateObd2,
    createObd2: Obd2sAction.createObd2,
    getItems: Obd2sAction.getItems,
    getEditObd2: Obd2sAction.getEditObd2,
    detailObd2: Obd2sAction.detailObd2,
    removeObd2Items: Obd2sAction.removeObd2Items,
    removeObd2: Obd2sAction.removeObd2,
    convertToInvoice: Obd2sAction.convertToInvoice,
    clearObd2: Obd2sAction.clearObd2,
    convertToInvoice: Obd2sAction.convertToInvoice,
    changeObd2Status: Obd2sAction.changeObd2Status,
    getCustomers: CustomersAction.getCustomers,
};

//  Redux Forms
const addObd2ReduxForm = reduxForm({
    form: OBD2_FORM,
    validate,
})(Obd2);

//  connect
const Obd2Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addObd2ReduxForm);

Obd2Container.navigationOptions = () => ({
    header: null,
});

export default Obd2Container;
