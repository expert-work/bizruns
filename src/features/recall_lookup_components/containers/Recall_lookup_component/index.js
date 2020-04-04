import React from 'react';
import { connect } from 'react-redux';
import { Recall_lookup_component } from '../../components/Recall_lookup_component';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as Recall_lookup_componentsAction from '../../actions';
import { RECALL_LOOKUP_COMPONENT_FORM, RECALL_LOOKUP_COMPONENT_DETAIL } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { language, taxTypes },
        recall_lookup_components: { loading, recall_lookup_componentItems, recall_lookup_componentData, items },
        customers: { customers },
    } = state;

    const { recall_lookup_component = null, nextRecall_lookup_componentNumber, recall_lookup_componentTemplates } = recall_lookup_componentData;

    let type = navigation.getParam('type')

    let isLoading = loading.initRecall_lookup_componentLoading || (type === RECALL_LOOKUP_COMPONENT_DETAIL && !recall_lookup_component)
        || !nextRecall_lookup_componentNumber

    return {
        initLoading: isLoading,
        loading: loading.recall_lookup_componentLoading,
        recall_lookup_componentItems,
        recall_lookup_componentData,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        language,
        formValues: getFormValues(RECALL_LOOKUP_COMPONENT_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            expiry_date: moment().add(7, 'days'),
            recall_lookup_component_date: moment(),
            recall_lookup_component_number: nextRecall_lookup_componentNumber,
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            recall_lookup_component_template_id: recall_lookup_componentTemplates[0] && recall_lookup_componentTemplates[0].id,
            ...recall_lookup_component,
            customer: recall_lookup_component && recall_lookup_component.user,
            template: recall_lookup_component && recall_lookup_component.recall_lookup_component_template,
        } : null
    };
};

const mapDispatchToProps = {
    getCreateRecall_lookup_component: Recall_lookup_componentsAction.getCreateRecall_lookup_component,
    createRecall_lookup_component: Recall_lookup_componentsAction.createRecall_lookup_component,
    getItems: Recall_lookup_componentsAction.getItems,
    getEditRecall_lookup_component: Recall_lookup_componentsAction.getEditRecall_lookup_component,
    detailRecall_lookup_component: Recall_lookup_componentsAction.detailRecall_lookup_component,
    removeRecall_lookup_componentItems: Recall_lookup_componentsAction.removeRecall_lookup_componentItems,
    removeRecall_lookup_component: Recall_lookup_componentsAction.removeRecall_lookup_component,
    convertToInvoice: Recall_lookup_componentsAction.convertToInvoice,
    clearRecall_lookup_component: Recall_lookup_componentsAction.clearRecall_lookup_component,
    convertToInvoice: Recall_lookup_componentsAction.convertToInvoice,
    changeRecall_lookup_componentStatus: Recall_lookup_componentsAction.changeRecall_lookup_componentStatus,
    getCustomers: CustomersAction.getCustomers,
};

//  Redux Forms
const addRecall_lookup_componentReduxForm = reduxForm({
    form: RECALL_LOOKUP_COMPONENT_FORM,
    validate,
})(Recall_lookup_component);

//  connect
const Recall_lookup_componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addRecall_lookup_componentReduxForm);

Recall_lookup_componentContainer.navigationOptions = () => ({
    header: null,
});

export default Recall_lookup_componentContainer;
