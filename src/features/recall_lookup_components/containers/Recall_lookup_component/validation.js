import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { recall_lookup_component_date, recall_lookup_component_number, expiry_date, recall_lookup_component_template_id, items, user_id } = values;

    errors.recall_lookup_component_date = getError(recall_lookup_component_date, ['required']);
    errors.expiry_date = getError(expiry_date, ['required']);
    errors.recall_lookup_component_number = getError(recall_lookup_component_number, ['requiredField']);

    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
        { fieldName: 'Customer' },
    );

    errors.recall_lookup_component_template_id = getError(
        recall_lookup_component_template_id,
        ['requiredField'],
        { fieldName: 'Template' },
    );


    return errors;
};
