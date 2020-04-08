import React from 'react';
import {
    View,
    Text,
    Alert,
    Linking,
    ScrollView
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
    OBD2_ADD,
    OBD2_DETAIL,
    ITEM_ADD,
    ITEM_EDIT,
    OBD2_FORM,
    OBD2_ACTIONS,
    EDIT_OBD2_ACTIONS,
    MARK_AS_ACCEPT, MARK_AS_REJECT, MARK_AS_SENT
} from '../../constants';
import { BUTTON_TYPE } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import { TemplateField } from '../TemplateField';
import { MOUNT, UNMOUNT, goBack } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { OBD2_DISCOUNT_OPTION } from '../../constants';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '../../../../config';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH } from '../../../../api/global';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    navigation: Object,

}
export class Obd2 extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            taxTypeList: [],
            currency: {},
            itemList: [],
            customerName: 'wefefer',
            code_description:'',
            code_causes:'',
            code_description_expanded:'',
            code_symptoms:'',
            code_warnings:'',
            code:'',
         markAsStatus: null,
        };
    }

    componentDidMount() {

        const {
             navigation,
             
        } = this.props;

        this.setState({code_description:navigation.getParam('code_description')});
        this.setState({code_causes:navigation.getParam('code_causes')});
        this.setState({code_description_expanded:navigation.getParam('code_description_expanded')});
        this.setState({code_symptoms:navigation.getParam('code_symptoms')});
        this.setState({code_warnings:navigation.getParam('code_warnings')});
        this.setState({code:navigation.getParam('code')});
        
 
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
                    leftIconPress: () => navigation.navigate(ROUTES.OBD2_LIST),
                    title: Lng.t("header.detailObd2", { locale: language }) ,
                    titleStyle: headerTitle({ marginLeft: -15, marginRight: -15 }),
                     
                    placement: "center",
                }}
             >
                <ScrollView style={styles.bodyContainer}>
                 

                <Text style={{fontSize:32, marginTop:10,marginBottom:20}}>{this.state.code}</Text>




 

                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Code Description</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.code_description}</Text>
               

                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Code Causes</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.code_causes}</Text>
               

                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Code description Expanded</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.code_description_expanded}</Text>
               

                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Code Symptoms</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.code_symptoms}</Text>
               

                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Code Warnings</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.code_warnings}</Text>
               
                </ScrollView>
            </DefaultLayout>
        );
    }
}
