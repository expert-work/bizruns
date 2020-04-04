import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { obd2_date, obd2_number, expiry_date, obd2_template_id, items, user_id } = values;

    errors.obd2_date = getError(obd2_date, ['required']);
    errors.expiry_date = getError(expiry_date, ['required']);
    errors.obd2_number = getError(obd2_number, ['requiredField']);

    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
        { fieldName: 'Customer' },
    );

    errors.obd2_template_id = getError(
        obd2_template_id,
        ['requiredField'],
        { fieldName: 'Template' },
    );


    return errors;
};
