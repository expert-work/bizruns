import React from 'react';
import { connect } from 'react-redux';
import { Estimate_search_repair } from '../../components/Estimate_search_repair';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as Estimate_search_repairsAction from '../../actions';
import { ESTIMATE_SEARCH_REPAIR_FORM, ESTIMATE_SEARCH_REPAIR_DETAIL } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { language, taxTypes },
        estimate_search_repairs: { loading, estimate_search_repairItems, estimate_search_repairData, items },
        customers: { customers },
    } = state;

    const { estimate_search_repair = null, nextEstimate_search_repairNumber, estimate_search_repairTemplates } = estimate_search_repairData;

    let type = navigation.getParam('type')

    let isLoading = loading.initEstimate_search_repairLoading || (type === ESTIMATE_SEARCH_REPAIR_DETAIL && !estimate_search_repair)
        || !nextEstimate_search_repairNumber

    return {
        initLoading: isLoading,
        loading: loading.estimate_search_repairLoading,
        estimate_search_repairItems,
        estimate_search_repairData,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        language,
        formValues: getFormValues(ESTIMATE_SEARCH_REPAIR_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            expiry_date: moment().add(7, 'days'),
            estimate_search_repair_date: moment(),
            estimate_search_repair_number: nextEstimate_search_repairNumber,
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            estimate_search_repair_template_id: estimate_search_repairTemplates[0] && estimate_search_repairTemplates[0].id,
            ...estimate_search_repair,
            customer: estimate_search_repair && estimate_search_repair.user,
            template: estimate_search_repair && estimate_search_repair.estimate_search_repair_template,
        } : null
    };
};

const mapDispatchToProps = {
    getCreateEstimate_search_repair: Estimate_search_repairsAction.getCreateEstimate_search_repair,
    createEstimate_search_repair: Estimate_search_repairsAction.createEstimate_search_repair,
    getItems: Estimate_search_repairsAction.getItems,
    getEditEstimate_search_repair: Estimate_search_repairsAction.getEditEstimate_search_repair,
    detailEstimate_search_repair: Estimate_search_repairsAction.detailEstimate_search_repair,
    removeEstimate_search_repairItems: Estimate_search_repairsAction.removeEstimate_search_repairItems,
    removeEstimate_search_repair: Estimate_search_repairsAction.removeEstimate_search_repair,
    convertToInvoice: Estimate_search_repairsAction.convertToInvoice,
    clearEstimate_search_repair: Estimate_search_repairsAction.clearEstimate_search_repair,
    convertToInvoice: Estimate_search_repairsAction.convertToInvoice,
    changeEstimate_search_repairStatus: Estimate_search_repairsAction.changeEstimate_search_repairStatus,
    getCustomers: CustomersAction.getCustomers,
};

//  Redux Forms
const addEstimate_search_repairReduxForm = reduxForm({
    form: ESTIMATE_SEARCH_REPAIR_FORM,
    validate,
})(Estimate_search_repair);

//  connect
const Estimate_search_repairContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addEstimate_search_repairReduxForm);

Estimate_search_repairContainer.navigationOptions = () => ({
    header: null,
});

export default Estimate_search_repairContainer;
