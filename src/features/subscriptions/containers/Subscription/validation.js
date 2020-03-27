import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const {
        subscription_date,
        subscription_number,
        user_id,
        amount,
        due,
    } = values;

    errors.subscription_date = getError(subscription_date, ['required']);
    errors.subscription_number = getError(subscription_number, ['required']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
    );

    errors.amount = getError(
        amount,
        ['requiredField', 'isNumberFormat'],
    );

    if (amount > due)
        errors.amount = getError(
            amount,
            ['moreThanDue'],
        );

    return errors;
};
