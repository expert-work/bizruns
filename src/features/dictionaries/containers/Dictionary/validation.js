import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { dictionary_date, dictionary_number, expiry_date, dictionary_template_id, items, user_id } = values;

    errors.dictionary_date = getError(dictionary_date, ['required']);
    errors.expiry_date = getError(expiry_date, ['required']);
    errors.dictionary_number = getError(dictionary_number, ['requiredField']);

    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
        { fieldName: 'Customer' },
    );

    errors.dictionary_template_id = getError(
        dictionary_template_id,
        ['requiredField'],
        { fieldName: 'Template' },
    );


    return errors;
};
