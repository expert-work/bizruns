import { connect } from "react-redux";
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import { MainScreen } from "../../components/MainScreen"; //imports the feature's mainscreen component.
import * as AuthAction from '../../actions';
import { MAINSCREEN_FORM } from "../../constants";

const mapStateToProps = ({
    auth,
    global,
    settings: { account }

}) => ({
    loading: auth.loading && auth.loading.mainscreenLoading,
    socialLoading: auth.loading && auth.loading.socialMainScreenLoading,
    language: global.language,
    initialValues: {
        username: (typeof account !== 'undefined' && account !== null) ? account.email ? account.email : '' : '',
    }
});

const mapDispatchToProps = {
    mainscreen: AuthAction.mainscreen,
    socialMainScreen: AuthAction.socialMainScreen,
};

//  Redux Forms
const mainscreenReduxForm = reduxForm({
    form: MAINSCREEN_FORM,
    validate,
})(MainScreen);

// Connects the mainscreen-component.
const MainScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(mainscreenReduxForm);

MainScreenContainer.navigationOptions = {
    header: null,
};

export default MainScreenContainer;

