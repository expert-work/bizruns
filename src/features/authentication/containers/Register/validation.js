import { getError } from "../../../../api/validation";

export const validate = (values) => {
    const errors = {};
    const { username, password ,busoness_name, phone} = values;



    errors.username = getError(username, ['required', 'emailFormat']);
    errors.password = getError(password, ['required']);
    errors.busoness_name = getError(busoness_name, ['required']);
    errors.phone = getError(phone, ['required']);


    return errors;
};
