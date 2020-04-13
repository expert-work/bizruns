import React from 'react';
import {
    View,
    Text,
    Alert,
    Linking,
    ScrollView,
    TouchableOpacity
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
    ESTIMATE_SEARCH_REPAIR_ADD,
    ESTIMATE_SEARCH_REPAIR_DETAIL,
    ITEM_ADD,
    ITEM_EDIT,
    ESTIMATE_SEARCH_REPAIR_FORM,
    ESTIMATE_SEARCH_REPAIR_ACTIONS,
    EDIT_ESTIMATE_SEARCH_REPAIR_ACTIONS,
    MARK_AS_ACCEPT, MARK_AS_REJECT, MARK_AS_SENT
} from '../../constants';
import { BUTTON_TYPE } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import { TemplateField } from '../TemplateField';
import { MOUNT, UNMOUNT, goBack } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { ESTIMATE_SEARCH_REPAIR_DISCOUNT_OPTION } from '../../constants';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '../../../../config';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH } from '../../../../api/global';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    navigation: Object,

}
export class Estimate_search_repair extends React.Component<IProps> {
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
            AssociatedRepair2:navigation.getParam('AssociatedRepair2'),
            associatedRepair:navigation.getParam('associatedRepair'),
            created_at:navigation.getParam('created_at'),
            id:navigation.getParam('id'),
            laborAvg:parseInt(navigation.getParam('laborAvg')),
            laborMax:parseInt(navigation.getParam('laborMax')),
            laborMin:parseInt(navigation.getParam('laborMin')),
            make:navigation.getParam('make'),
            model:navigation.getParam('model'),
            partsList:navigation.getParam('partsList'),            
            partsMax:parseInt(navigation.getParam('partsMax')),
            partsMin:parseInt(navigation.getParam('partsMin')),
            repairAverage:navigation.getParam('repairAverage'),
            repairCauses:navigation.getParam('repairCauses'),
            repairMax:parseInt(navigation.getParam('repairMain')),
            repairMin:parseInt(navigation.getParam('repairMin')),
            repairName:navigation.getParam('repairName'),
            repairRecommendation:navigation.getParam('repairRecommendation'),
            year:navigation.getParam('year'),
            isPartsTab:false,
            isCostsTab:true,
            isInfoTab:false,
            code:'',
         markAsStatus: null,
        };
    }

    componentDidMount() {

        const { navigation} = this.props;
        if(this.state.partsMax=='' || !this.state.partsMax){
           this.setState({partsMax:0, partsMin:0})
        }
     }

   activatePartsTab(){
           this.setState({isPartsTab:true, isCostsTab:false,isInfoTab:false})
   }
   activateCostsTab(){
           this.setState({isPartsTab:false, isCostsTab:true,isInfoTab:false})
   }
   activateInfoTab(){
           this.setState({isPartsTab:false, isCostsTab:false,isInfoTab:true})
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
                    leftIconPress: () => navigation.navigate(ROUTES.ESTIMATE_SEARCH_REPAIR_LIST),
                    title: this.state.Component ,
                    titleStyle: headerTitle({ marginLeft: -15, marginRight: -15 }),
                     
                    placement: "center",
                }}
             >
                <ScrollView style={styles.bodyContainer}>
                 
                   <View style={{backgroundColor:'#eff8fe',marginLeft:-20,marginRight:-20}} >
                      <Text style={{marginLeft:20,fontSize:24,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}>Recall Information</Text>
                   </View>

                   <View>
                      <Text style={{fontSize:20,marginBottom:10,marginTop:10, color:'green'}}>
                        ${this.state.repairMin} - ${this.state.repairMax}
                      </Text>
                      <Text style={{fontSize:20,marginBottom:10,marginTop:10, fontWaight:'bold', color:'black'}}>{this.state.repairName}</Text>
                      <Text style={{fontSize:20,marginBottom:10,marginTop:10, fontWaight:'200',  color:'black'}}>{this.state.year}, {this.state.make}, {this.state.model}</Text>

                   </View>


{/* Costs area start  */}
{this.state.isCostsTab &&     

                <View style={{borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                    <View style={{ 
                         backgroundColor:'#eff8fe',
                         marginLeft:-20,
                         marginRight:-20,
                         flexDirection: 'row',
                         flex:1,
                         marginTop:20,
                         alignItems: "center",
                         justifyContent: "center"
                      }} >
                        <View style={{flex:1, borderBottomColor: "blue"}}>
                                <TouchableOpacity onPress={() => this.activateCostsTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'blue'}}>Costs</Text>
                                </TouchableOpacity>
                         </View>
                         <View style={{flex:1}}>
                                <TouchableOpacity  onPress={() => this.activatePartsTab()}>
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}>Parts</Text>
                                </TouchableOpacity>
                         </View>
                         <View style={{flex:1}}>
                                <TouchableOpacity  onPress={() => this.activateInfoTab()}>
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}>Info</Text>
                                </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row',flex:1,marginTop:20,borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:5}}>
                               Mobile Tech
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:5}}>
                              ${(this.state.repairMin *.65).toFixed(2)} - ${(this.state.repairMax * .65).toFixed(2)}
                            </Text>
                            <Text style={{fontSize:18,marginBottom:5}}>
                             Avg: ${(((this.state.repairMin + this.state.repairMax)/2)*.65).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                      <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Avg Labour Hours
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             {(((this.state.laborMin + this.state.laborMax)/2)/90).toFixed(2)} Hours
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Avg Labour Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${(((this.state.laborMin + this.state.laborMax)/2)*.65).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Avg Parts Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10,color:'gray'}}>
                             ${(((this.state.partsMin + this.state.partsMax)/2)*.65).toFixed(2)}
                            </Text>
                      </View>
                    </View>

            </View>   
  }
 {/* Costs area END  */}



{/* Parts area start  */}
 {this.state.isPartsTab &&     
    
                <View style={{borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                    <View style={{ 
                         backgroundColor:'#eff8fe',
                         marginLeft:-20,
                         marginRight:-20,
                         flexDirection: 'row',
                         flex:1,
                         marginTop:20,
                         alignItems: "center",
                         justifyContent: "center"
                      }} >
                       <View style={{flex:1}}>
                                <TouchableOpacity  onPress={() => this.activateCostsTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}> Costs</Text>
                                </TouchableOpacity>
                         </View>

                        <View style={{flex:1, borderBottomColor: "blue"}}>
                                <TouchableOpacity  onPress={() => this.activatePartsTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'blue'}}> Parts</Text>
                                </TouchableOpacity>
                         </View>

                         <View style={{flex:1}}>
                                <TouchableOpacity  onPress={() => this.activateInfoTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}>Info</Text>
                                </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row',flex:1,marginTop:20,borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:15}}>
                               Potential Parts Needed
                            </Text>
                      </View>
                    </View>

                      <View style={{marginLeft:20,marginRight:20,flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Parts Lists
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             {this.state.partsList}
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10,color:'gray'}}>
                               Avg Customer Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${((this.state.partsMin + this.state.partsMax)/2).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Avg Parts Profit
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${(((this.state.partsMin + this.state.partsMax)/2)*.5).toFixed(2)}
                            </Text>
                      </View>
                    </View>

            </View>   
       }        
 {/* Parts area END  */}


{/* Info area start  */}
 {this.state.isInfoTab &&     
    
                <View style={{borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                    <View style={{ 
                         backgroundColor:'#eff8fe',
                         marginLeft:-20,
                         marginRight:-20,
                         flexDirection: 'row',
                         flex:1,
                         marginTop:20,
                         alignItems: "center",
                         justifyContent: "center"
                      }} >
                       <View style={{flex:1}}>
                                <TouchableOpacity  onPress={() => this.activateCostsTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}> Costs</Text>
                                </TouchableOpacity>
                         </View>

                        <View style={{flex:1}}>
                                <TouchableOpacity  onPress={() => this.activatePartsTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'black'}}> Parts</Text>
                                </TouchableOpacity>
                         </View>
                        <View style={{flex:1, borderBottomColor: "blue"}}>
                                <TouchableOpacity  onPress={() => this.activateInfoTab()} >
                                        <Text style={{marginLeft:20,fontSize:20,marginBottom:15,marginTop:15, fontWaight:'bold', color:'blue'}}>Info</Text>
                                </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row',flex:1,marginTop:20}}>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:22,marginBottom:5}}>
                              Repair Causes
                             </Text>
                            <Text style={{fontSize:18,marginBottom:5, color:'gray'}}>
                               {this.state.repairCauses}
                             </Text>
                      </View>
                    </View>

                   <View style={{flexDirection: 'row',flex:1,marginTop:20}}>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:22,marginBottom:5}}>
                              Repair Recommendation
                             </Text>
                            <Text style={{fontSize:18,marginBottom:15, color:'gray'}}>
                               {this.state.repairRecommendation}
                             </Text>
                      </View>
                    </View>
            </View>   
       }        
 {/* Info area END  */}


   <View style={{borderBottomColor: 'black', borderBottomWidth: 2, marginTop:20}}>
                    
                    <View style={{flexDirection: 'row',flex:1,marginTop:20,borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:5}}>
                               Independent Shop
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:5, color:"green"}}>
                              ${(this.state.repairMin *.82).toFixed(2)} - ${(this.state.repairMax * .82).toFixed(2)}
                            </Text>
                            <Text style={{fontSize:18,marginBottom:5}}>
                             Avg: ${(((this.state.repairMin + this.state.repairMax)/2)*.82).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                      <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Avg Labour Hours
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             {(((this.state.laborMin + this.state.laborMax)/2)/90).toFixed(2)} Hours
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                                Labour Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${(((this.state.laborMin + this.state.laborMax)/2)*.82).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                                Parts Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${(((this.state.partsMin + this.state.partsMax)/2)*.82).toFixed(2)}
                            </Text>
                      </View>
                    </View>

            </View>   


 <View style={{marginBottom:20, marginTop:20}}>
                    
                    <View style={{flexDirection: 'row',flex:1,marginTop:20,borderBottomColor: 'black',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:5}}>
                               Dealership
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:5, color:"green"}}>
                              ${(this.state.repairMin * 1.1).toFixed(2)} - ${(this.state.repairMax * 1.1).toFixed(2)}
                            </Text>
                            <Text style={{fontSize:18,marginBottom:5}}>
                             Avg: ${(((this.state.repairMin + this.state.repairMax)/2)* 1.1).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                      <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                               Avg Labour Hours
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             {(((this.state.laborMin + this.state.laborMax)/2)/90).toFixed(2)} Hours
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10,borderBottomColor: '#E9E7E7',
        borderBottomWidth: 2}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                                Labour Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${(((this.state.laborMin + this.state.laborMax)/2)*1.1).toFixed(2)}
                            </Text>
                      </View>
                    </View>

                   <View style={{marginLeft:20,marginRight:20, flexDirection: 'row',flex:1,marginTop:10}}>
                      <View style={{flex:1}}>
                             <Text style={{fontSize:20,marginBottom:10, color:'gray'}}>
                                Parts Costs
                            </Text>
                      </View>
                      <View style={{flex:1}}>
                            <Text style={{fontSize:18,marginBottom:10, color:'gray'}}>
                             ${(((this.state.partsMin + this.state.partsMax)/2)*1.1).toFixed(2)}
                            </Text>
                      </View>
                    </View>

            </View>                   
                </ScrollView>
            </DefaultLayout>
        );
    }
}
