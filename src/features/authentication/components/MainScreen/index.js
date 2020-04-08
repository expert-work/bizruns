// @flow

import React, { Component } from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Image,
    Button,
    Alert,
    Platform
} from 'react-native';
import { Field } from 'redux-form';
import styles, { itemsDescriptionStyle } from './styles';
import { InputField, CtButton, AssetImage, CtDivider, CtGradientButton } from '../../../../components';
// import * as Google from 'expo-google-app-auth';
import { env, IMAGES } from '../../../../config';
import { colors } from '../../../../styles/colors';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    navigation: Object,
    mainscreen: Function,
    handleSubmit: Function,
    loading: Boolean,
    socialLoading: Boolean,
    language: String,
}
export class MainScreen extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }


    onMainScreen = (values) => {

        const { navigation, mainscreen } = this.props;
        mainscreen({
            params: values,
            navigation,
        });
    };

    render() {
        let passwordInput = {};
        const {
            loading,
            socialLoading,
            navigation,
            language,
        } = this.props;

        let mainscreenRefs = {}

        return (

            <View style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    translucent={true}
                />

                <ScrollView
                    style={{ paddingTop: '34%' }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                        <View style={styles.main}>
                            <View style={styles.mainscreenContainer}>
                                <Text  style={{
                                        fontSize:18,
                                        textAlign: "center",
                                        color: "black" ,
                                        fontWeight: "bold",
                                        marginBottom:30
                                      }}
                                >
                                       Tools You Need to Run Your Business
                                </Text>




                                   <View style={{
                                      flexDirection: 'row',
                                      textAlign: 'left',
                                      fontSize: 15,
                                      backgroundColor:'white',
                                      shadowColor: "#000",
                                      shadowOffset: {
                                      width: 3,
                                      height: 3,
                                      },
                                      shadowOpacity: .4,
                                      shadowRadius: 4.65,
                                      elevation: 6,
                                      borderColor: '#eff0f1',
                                      borderWidth: 0.5,
                                      marginBottom:30
                                  }}>
                                    <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                            <Image source={{uri: 'https://crater.misdotdot.com/public/images/bill.png'}} style={{width: 70, height: 70 ,marginTop:10,marginBottom:10}} />
                                     </View>
                                     <View style={{flex:3}}  >
                                           <Text style={{ textAlign: "left",fontSize:"18px",paddingTop:15 }}>Easily Create Invoices</Text>
                                            <Text style={{ textAlign: "left" ,paddingBottom:15}}>Create easy or comples invoices in under a minute </Text>
                                     </View>
                                  </View>


                                <View style={{
                                    flexDirection: 'row',
                                    textAlign: 'left',
                                    fontSize: 15,
                                    backgroundColor:'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                    width: 3,
                                    height: 3,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderColor: '#eff0f1',
                                    borderWidth: 0.5,
                                    marginBottom:30
                                }}>
                                  <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                          <Image source={{uri: 'https://crater.misdotdot.com/public/images/dollar.png'}} style={{width: 70, height: 70 ,marginTop:10,marginBottom:10}} />
                                   </View>
                                   <View style={{flex:3}}  >
                                         <Text style={{ textAlign: "left",fontSize:"18px",paddingTop:15 }}>Repair Costs & Breakdowns</Text>
                                          <Text style={{ textAlign: "left" ,paddingBottom:15}}>Know exactly how much to chnage for any repair </Text>
                                   </View>
                                </View>



                                <View style={{
                                    flexDirection: 'row',
                                    textAlign: 'left',
                                    fontSize: 15,
                                    backgroundColor:'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                    width: 3,
                                    height: 3,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderColor: '#eff0f1',
                                    borderWidth: 0.5,
                                    marginBottom:30
                                }}>
                                  <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                          <Image source={{uri: 'https://crater.misdotdot.com/public/images/question.png'}} style={{width: 70, height: 70 ,marginTop:10,marginBottom:10}} />
                                   </View>
                                   <View style={{flex:3}}  >
                                         <Text style={{ textAlign: "left",fontSize:"18px",paddingTop:15 }}>Repair Information</Text>
                                          <Text style={{ textAlign: "left" ,paddingBottom:15}}>Detailed repair info with parts breakdown & search </Text>
                                   </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    textAlign: 'left',
                                    fontSize: 15,
                                    backgroundColor:'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                    width: 3,
                                    height: 3,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderColor: '#eff0f1',
                                    borderWidth: 0.5,
                                    marginBottom:30
                                }}>
                                  <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                          <Image source={{uri: 'https://crater.misdotdot.com/public/images/tools.png'}} style={{width: 70, height: 70 ,marginTop:10,marginBottom:10}} />
                                   </View>
                                   <View style={{flex:3}}  >
                                         <Text style={{ textAlign: "left",fontSize:"18px",paddingTop:15 }}>The Tools You Need</Text>
                                          <Text style={{ textAlign: "left" ,paddingBottom:15}}>All the tools and info you need to run your business</Text>
                                   </View>
                                </View>

                                <View>

                                </View>
                            </View>




                            <View style={{
                              flexDirection: 'row',
                              textAlign: 'left',
                              elevation: 6,
                              justifyContent: 'space-between',
                              marginTop:20,
                             }}>

                             <TouchableOpacity
                                 onPress={() => navigation.navigate(ROUTES.LOGIN)}
                                style={{
                                      marginTop:10,
                                      paddingTop:10,
                                      paddingBottom:10,
                                      backgroundColor:'#4aaa8f',
                                      borderRadius:5,
                                      width:160,
                                      height:50,
                                      borderWidth: 1,
                                      borderColor: '#fff'
                                  }}
                                 underlayColor='#fff'>
                                 <Text style={{
                                        color:'#fff',
                                        textAlign:'center',
                                        fontSize:20,
                                        paddingLeft : 10,
                                        paddingRight : 10,
                                        fontWeight:600,
                                  }}>LOG IN</Text>
                          </TouchableOpacity>


                          <TouchableOpacity
                          onPress={() => navigation.navigate(ROUTES.REGISTER)}
                             style={{
                                   marginTop:10,
                                   paddingTop:10,
                                   paddingBottom:10,
                                   backgroundColor:'#2b90f7',
                                   borderRadius:5,
                                   width:160,
                                   height:50,

                                   borderWidth: 1,
                                   borderColor: '#fff'
                               }}
                              underlayColor='#fff'>
                              <Text style={{
                                     color:'#fff',
                                     textAlign:'center',
                                     paddingLeft : 10,
                                     paddingRight : 10,
                                     fontSize:20,
                                     fontWeight:600,
                               }}>SIGN UP</Text>
                       </TouchableOpacity>
                             </View>



                        </View>
                 </ScrollView>
            </View>
        );
    }
}
