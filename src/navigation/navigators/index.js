import React from "react";
import { createStackNavigator } from "react-navigation";
import MainNavigator from "./main";

import { ROUTES } from "../routes";
import { PaymentNavigator } from "./payment";
import { CustomerNavigator } from "./customer";
import AuthNavigator from "./auth";
import { InvoiceNavigator } from "./invoice";
import { EstimateNavigator } from "./estimate";
import { ExpenseNavigator } from "./expense";
import { SettingNavigator } from "./settings";
import { DictionaryNavigator } from "./dictionaries";
import { Obd2Navigator } from "./obd2s";
import { Recall_lookupNavigator } from "./recall_lookups";

import { Recall_lookup_makeNavigator } from "./recall_lookup_makes";
import { Recall_lookup_modelNavigator } from "./recall_lookup_models";

import { Recall_lookup_componentNavigator } from "./recall_lookup_components";



import { MoreNavigator } from "./more";

const appNavigator = createStackNavigator(
    {
        // Auth
        [ROUTES.AUTH]: {
            screen: AuthNavigator
        },

        // MainTab
        [ROUTES.MAIN_TABS]: {
            screen: MainNavigator
        },

        // Invoice
        ...InvoiceNavigator,

        //  Estimate
        ...EstimateNavigator,

        // Expense
        ...ExpenseNavigator,

        // Setting
        ...SettingNavigator,

        // Customer
        ...CustomerNavigator,

        // Payments
        ...PaymentNavigator,

        // More
        ...MoreNavigator,

        ...DictionaryNavigator,

        ...Obd2Navigator,

        ...Recall_lookupNavigator,

        ...Recall_lookup_makeNavigator,

        ...Recall_lookup_modelNavigator,

        ...Recall_lookup_componentNavigator,
    },
    {
        initialRouteName: ROUTES.AUTH,
        navigationOptions: {
            header: null,
            headerTransparent: true,
            gesturesEnabled: false,
            headerTitleAllowFontScaling: false,
        },
    },
);

export default appNavigator;
