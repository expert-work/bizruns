import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as SubscriptionsAction from '../../actions';
import { colors } from '../../../../styles/colors';
import { Subscriptions } from '../../components/Subscriptions';
import { SUBSCRIPTION_SEARCH } from '../../constants';
import { SvgXml } from 'react-native-svg';
import { PAYMETNS } from '../../../../assets/svg';
import { getCustomers } from '../../../customers/actions';
import { getTitleByLanguage, navigateToMainTabs } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';
import { withNavigationFocus } from 'react-navigation';


const mapStateToProps = (state) => {

    const {
        global: { language },
        customers: { customers },
        subscriptions: {
            subscriptions,
            filterSubscriptions,
            loading: { subscriptionsLoading }
        }
    } = state;

    return {
        subscriptions,
        filterSubscriptions,
        loading: subscriptionsLoading,
        language,
        customers,
        formValues: getFormValues(SUBSCRIPTION_SEARCH)(state) || {},
    };
};


const mapDispatchToProps = {
    getSubscriptions: SubscriptionsAction.getSubscriptions,
    getCustomers: getCustomers
};

//  Redux Forms
const subscriptionSearchReduxForm = reduxForm({
    form: SUBSCRIPTION_SEARCH,
})(Subscriptions);

//  connect
const SubscriptionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(subscriptionSearchReduxForm);

SubscriptionsContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.subscriptions'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={PAYMETNS}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    ),
    tabBarOnPress: () => {
        if (navigation.isFocused()) {
            return;
        }

        navigateToMainTabs(navigation, ROUTES.MAIN_SUBSCRIPTIONS)
    }
});

export default withNavigationFocus(SubscriptionsContainer);
