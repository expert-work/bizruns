import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { estimate_search_repair_date, estimate_search_repair_number, expiry_date, estimate_search_repair_template_id, items, user_id } = values;

    errors.estimate_search_repair_date = getError(estimate_search_repair_date, ['required']);
    errors.expiry_date = getError(expiry_date, ['required']);
    errors.estimate_search_repair_number = getError(estimate_search_repair_number, ['requiredField']);

    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
        { fieldName: 'Customer' },
    );

    errors.estimate_search_repair_template_id = getError(
        estimate_search_repair_template_id,
        ['requiredField'],
        { fieldName: 'Template' },
    );


    return errors;
};
