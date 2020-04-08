import React from 'react';
import {
    View,
    Text,
    Alert,
    Linking
} from 'react-native';
import { change } from 'redux-form';
import { Field } from 'redux-form';
import styles from './styles';
import { 
    InputField,
    DatePickerField,
    CtDivider,
    CtButton,
    ListView,
    DefaultLayout,
    SelectField,
    SelectPickerField,
    CurrencyFormat,
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import {
    DICTIONARY_ADD,
    DICTIONARY_DETAIL,
    ITEM_ADD,
    ITEM_EDIT,
    DICTIONARY_FORM,
    DICTIONARY_ACTIONS,
    EDIT_DICTIONARY_ACTIONS,
    MARK_AS_ACCEPT, MARK_AS_REJECT, MARK_AS_SENT
} from '../../constants';
import { BUTTON_TYPE } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import { TemplateField } from '../TemplateField';
import { MOUNT, UNMOUNT, goBack } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { DICTIONARY_DISCOUNT_OPTION } from '../../constants';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '../../../../config';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH } from '../../../../api/global';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    navigation: Object,

}
export class Dictionary extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            taxTypeList: [],
            currency: {},
            itemList: [],
            customerName: 'wefefer',

            name:'',
            description:'',
            description:'',
            markAsStatus: null,
        };
    }

    componentDidMount() {

        const {
             navigation,
             
        } = this.props;


        this.setState({name:navigation.getParam('name')});
        this.setState({description:navigation.getParam('description')});

console.log('idstart');
 console.log(navigation.getParam('id'));
  console.log(navigation.getParam('name'));
 console.log(navigation.getParam('description'));

 
    }

 
    render() {
        const {
            navigation,
             language,
             type,
         } = this.props;

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.navigate(ROUTES.DICTIONARY_LIST),
                    title: Lng.t("header.detailDictionary", { locale: language }) ,
                    titleStyle: headerTitle({ marginLeft: -15, marginRight: -15 }),
                     
                    placement: "center",
                }}
             >
                <View style={styles.bodyContainer}>
                <Text style={{fontSize:32, marginTop:50,marginBottom:10}}>{this.state.name}</Text>
                 <Text style={{fontSize:24,color:'gray'}}>{this.state.description}</Text>
                </View>
            </DefaultLayout>
        );
    }
}
