// @flow

import React, { Component } from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
import { Field } from 'redux-form';
import styles from './styles';
import { InputField, CtButton, AssetImage, CtDivider, CtGradientButton,CtHeader } from '../../../../components';
// import * as Google from 'expo-google-app-auth';
import { env, IMAGES } from '../../../../config';
import { colors } from '../../../../styles/colors';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    navigation: Object,
    register: Function,
    handleSubmit: Function,
    loading: Boolean,
    socialLoading: Boolean,
    language: String,
}


export class Register extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }


    onRegister = (values) => {
        const { navigation, register } = this.props;
       let _URL='https://crater.misdotdot.com/api/register?busoness_name='+values.busoness_name+'&password='+values.password+'&phone='+values.phone+'&username='+values.username;
      fetch(_URL, {
        method: 'GET',
          headers: { 
                'Content-Type': 'multipart/form-data',
           } 
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.errorCode=='200'){
            Alert.alert(responseJson.msg);
            const { navigation} = this.props;
            navigation.navigate(ROUTES.MAINSCREEN)

        }else{
          Alert.alert(responseJson.msg);
        }
      })
      .catch((error) => {
        console.error(error);
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

        let registerRefs = {}

        return (

            <View style={styles.container}>
            <CtHeader
                leftIcon="angle-left"
                leftIconPress={() => navigation.goBack(null)}
                title={Lng.t("header.back", { locale: language })}
                titleOnPress={() => navigation.goBack(null)}
                titleStyle={{ marginLeft: 0, marginTop: Platform.OS === 'ios' ? -1 : 2 }}
                placement="left"
                noBorder
                transparent
            />
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    translucent={true}
                />

                <ScrollView
                    style={{ paddingTop: '24%' }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flex: 1 }}
                        keyboardVerticalOffset={0}
                        behavior="height"
                    >
                        <View style={styles.main}>
                            <View style={styles.logoContainer}>
                                <AssetImage
                                    imageSource={IMAGES.LOGO_DARK}
                                    imageStyle={styles.imgLogo}
                                />
                            </View>

                            <View style={styles.registerContainer}>


                              <Field
                                  name="username"
                                  component={InputField}
                                  inputProps={{
                                      returnKeyType: 'next',
                                      autoCapitalize: 'none',
                                      placeholder: Lng.t("login.email", { locale: language }),
                                      autoCorrect: true,
                                      keyboardType: 'email-address',
                                      onSubmitEditing: () => {
                                          registerRefs.password.focus();
                                      }
                                  }}
                                  placeholderColor={colors.white5}
                                  inputContainerStyle={styles.inputField}
                              />
                              <Field
                                  refLinkFn={(ref) => {
                                      passwordInput = ref;
                                  }}
                                  name="password"
                                  component={InputField}
                                  inputProps={{
                                      returnKeyType: 'go',
                                      autoCapitalize: 'none',
                                      placeholder: Lng.t("login.password", { locale: language }),
                                      autoCorrect: true,
                                      onSubmitEditing: this.props.handleSubmit(this.onRegister),
                                  }}
                                  inputContainerStyle={styles.inputField}
                                  secureTextEntry
                                  refLinkFn={(ref) => {
                                      registerRefs.password = ref;
                                  }}
                              />
 
                              <Field
                                  name="busoness_name"
                                  component={InputField}
                                  inputProps={{
                                      returnKeyType: 'next',
                                      autoCapitalize: 'none',
                                      placeholder: 'Enter Your Business Name',
                                      autoCorrect: true,
                                      keyboardType: 'email-address',
                                      onSubmitEditing: () => {
                                          registerRefs.password.focus();
                                      }
                                  }}
                                  placeholderColor={colors.white5}
                                  inputContainerStyle={styles.inputField}
                            />
                              <Field
                                  name="phone"
                                  component={InputField}
                                  inputProps={{
                                      returnKeyType: 'next',
                                      autoCapitalize: 'none',
                                      placeholder: 'Enter Your Phone',
                                      autoCorrect: true,
                                      keyboardType: 'email-address',
                                      onSubmitEditing: () => {
                                          registerRefs.password.focus();
                                      }
                                  }}
                                  placeholderColor={colors.white5}
                                  inputContainerStyle={styles.inputField}
                            />

                            </View>

                            <View style={{ marginTop: 25 }}>
                                <CtGradientButton
                                    onPress={this.props.handleSubmit(this.onRegister)}
                                    btnTitle='SIGN UP'
                                    loading={loading}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}
