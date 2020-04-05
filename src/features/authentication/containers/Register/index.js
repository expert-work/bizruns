import { connect } from "react-redux";
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import { Register } from "../../components/Register"; //imports the feature's register component.
import * as AuthAction from '../../actions';
import { REGISTER_FORM } from "../../constants";

const mapStateToProps = ({
    auth,
    global,
    settings: { account }

}) => ({
    loading: auth.loading && auth.loading.registerLoading,
    socialLoading: auth.loading && auth.loading.socialRegisterLoading,
    language: global.language,
    initialValues: {
        username: (typeof account !== 'undefined' && account !== null) ? account.email ? account.email : '' : '',
    }
});

const mapDispatchToProps = {
    register: AuthAction.register,
    socialRegister: AuthAction.socialRegister,
};

//  Redux Forms
const registerReduxForm = reduxForm({
    form: REGISTER_FORM,
    validate,
})(Register);

// Connects the register-component.
const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(registerReduxForm);

RegisterContainer.navigationOptions = {
    header: null,
};

export default RegisterContainer;

