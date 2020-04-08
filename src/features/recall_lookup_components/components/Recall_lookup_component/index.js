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
    RECALL_LOOKUP_COMPONENT_ADD,
    RECALL_LOOKUP_COMPONENT_DETAIL,
    ITEM_ADD,
    ITEM_EDIT,
    RECALL_LOOKUP_COMPONENT_FORM,
    RECALL_LOOKUP_COMPONENT_ACTIONS,
    EDIT_RECALL_LOOKUP_COMPONENT_ACTIONS,
    MARK_AS_ACCEPT, MARK_AS_REJECT, MARK_AS_SENT
} from '../../constants';
import { BUTTON_TYPE } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import { TemplateField } from '../TemplateField';
import { MOUNT, UNMOUNT, goBack } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { RECALL_LOOKUP_COMPONENT_DISCOUNT_OPTION } from '../../constants';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '../../../../config';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH } from '../../../../api/global';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    navigation: Object,

}
export class Recall_lookup_component extends React.Component<IProps> {
    constructor(props) {
        super(props);
        const { navigation} = this.props;

        this.state = {
            taxTypeList: [],
            currency: {},
            itemList: [],
            customerName: 'wefefer',
            code_causes:'',
            code_description_expanded:'',
            code_symptoms:'',
            code_warnings:'',

            Component:navigation.getParam('Component'),
            Conequence:navigation.getParam('Conequence'),
            Make:navigation.getParam('Make'),
            Manufacturer:navigation.getParam('Manufacturer'),
            Model:navigation.getParam('Model'),
            ModelYear:navigation.getParam('ModelYear'),
            NHTSACampaignNumber:navigation.getParam('NHTSACampaignNumber'),
            Remedy:navigation.getParam('Remedy'),
            ReportReceivedDate:navigation.getParam('ReportReceivedDate'),
            Summary:navigation.getParam('Summary'),

            code:'',
         markAsStatus: null,
        };
    }

    componentDidMount() {

        const { navigation} = this.props;

       
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
                    leftIconPress: () => navigation.navigate(ROUTES.RECALL_LOOKUP_COMPONENT_LIST),
                    title: this.state.Component ,
                    titleStyle: headerTitle({ marginLeft: -15, marginRight: -15 }),
                     
                    placement: "center",
                }}
             >
                <ScrollView style={styles.bodyContainer}>
                 

                
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Conequence</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.Conequence}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Make</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.Make}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Manufacturer</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.Manufacturer}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Model</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.Model}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>ModelYear</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.ModelYear}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>NHTSACampaignNumber</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.NHTSACampaignNumber}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Remedy</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.Remedy}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>ReportReceivedDate</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.ReportReceivedDate}</Text>
               
                 <Text style={{fontSize:28, marginTop:50,marginBottom:10, color:'blue'}}>Summary</Text>
                 <Text style={{fontSize:18,color:'gray'}}>{this.state.Summary}</Text>
                               
                
                </ScrollView>
            </DefaultLayout>
        );
    }
}
