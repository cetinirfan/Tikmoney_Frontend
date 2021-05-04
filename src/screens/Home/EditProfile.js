import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Intro from '../../datas/Intro';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import I18n from '../../I18n';
import {AnnounceCard} from './Components/AnnounceCard';
var moment = require('moment');
import PhotoModalize from './PhotoModalize';
import {inject, observer} from "mobx-react";
import {SERVER_URL} from '../../../Constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
var moment = require('moment');


@inject("AuthStore")
@observer

export default class HomePage extends Component {
  
  state = {
    userName: this.props.AuthStore.userData.userName,
    mail: this.props.AuthStore.userData.mail,
    newPassword: '',
    newPasswordValue: false,
    oldPassword: '',
    oldPasswordValue: false,
    newPassword2: '',
    newPassword2Value: false,
    loading: false,
    userPhoto: null,
    errorMessage: ' '
  };

  _Send = async () => {
    try {
      const {userName,newPassword,oldPassword,newPassword2} = this.state;
      const token = await AsyncStorage.getItem('token');
      const {data} = await axios.post(`${SERVER_URL}/users/setProfile`, {
        userName,
        newPassword2,
        newPassword,
        oldPassword
      },{ 'headers': { 'x-access-token': token }});
      if (!data.status) {
        I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: data.message[0]})
        :
        this.setState({errorMessage: data.message[1]})
        return false;
      } else {
        Alert.alert(
          I18n.locale === 'tr-TR' ?
          'Başarılı'
          :
          'Successful',
          I18n.locale === 'tr-TR' ?
          data.message[0]
          :
          data.message[1],
          [
            { text: I18n.locale === 'tr-TR' ? 'Tamam' : 'OK',onPress: async () => {await this.props.AuthStore.getProfile();this.props.navigation.navigate('Profile')}, style: 'cancel'},
          ],
          { cancelable: false }
      );
      }
    } catch (error) {
      console.log(error);
    }
  };
  getLastProfile = async () => {
    await this.props.AuthStore.getProfile();
    this.props.navigation.navigate('Profile')
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
        <View
          style={{
            marginHorizontal: 32,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={35}
              style={{color: COLORS.black}}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.body2,
              marginLeft: 10,
              marginTop: Platform.OS === 'ios' ? -8 : 0,
            }}>
            {I18n.t('editProfile_t1')}
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => this.modalize.onOpen()}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={this.state.userPhoto ? {uri:this.state.userPhoto} : {uri:`${SERVER_URL}${this.props.AuthStore.userData.userPhoto}`}}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginVertical: hp('5%'),
                opacity: 0.3,
              }}
            />
            <Ionicons
              name="md-camera-reverse-outline"
              size={35}
              style={{color: COLORS.gray, position: 'absolute'}}
            />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <Ionicons
                name="person-outline"
                size={hp('3%')}
                style={{
                  color:
                    this.state.userName.length > 0
                      ? COLORS.primary
                      : COLORS.gray,
                }}
              />
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(userName) => this.setState({userName})}
                value={this.state.userName}
                autoCorrect={false}
                placeholder={this.props.AuthStore.userData.userName}
                placeholderTextColor={'#616060'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.oldPassword.focus();
                }}
                blurOnSubmit={false}
                autoCapitalize={'words'}
              />
            </View>
            <View style={styles.inputStyle}>
              <Ionicons
                name="lock-open-outline"
                size={hp('3%')}
                style={{
                  color:
                    this.state.oldPassword.length > 0
                      ? COLORS.primary
                      : COLORS.gray,
                }}
              />
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(oldPassword) => this.setState({oldPassword})}
                value={this.state.oldPassword}
                autoCorrect={false}
                placeholder={I18n.t('editProfile_t4')}
                placeholderTextColor={'#616060'}
                returnKeyType={'done'}
                secureTextEntry={this.state.oldPasswordValue ? false : true}
                ref={(ref) => (this.newPassword = ref)}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({oldPasswordValue: !this.state.oldPasswordValue})
                }>
                <Ionicons
                  name={
                    this.state.passwordValue ? 'eye-off-outline' : 'eye-outline'
                  }
                  size={25}
                  style={{color: 'gray', marginTop: 3}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputStyle}>
              <Ionicons
                name="lock-open-outline"
                size={hp('3%')}
                style={{
                  color:
                    this.state.newPassword.length > 0
                      ? COLORS.primary
                      : COLORS.gray,
                }}
              />
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(newPassword) => this.setState({newPassword})}
                value={this.state.newPassword}
                autoCorrect={false}
                placeholder={I18n.t('editProfile_t5')}
                placeholderTextColor={'#616060'}
                returnKeyType={'done'}
                secureTextEntry={this.state.newPasswordValue ? false : true}
                ref={(ref) => (this.newPassword2 = ref)}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({newPasswordValue: !this.state.newPasswordValue})
                }>
                <Ionicons
                  name={
                    this.state.newPasswordValue ? 'eye-off-outline' : 'eye-outline'
                  }
                  size={25}
                  style={{color: 'gray', marginTop: 3}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputStyle}>
              <Ionicons
                name="lock-open-outline"
                size={hp('3%')}
                style={{
                  color:
                    this.state.newPassword2.length > 0
                      ? COLORS.primary
                      : COLORS.gray,
                }}
              />
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(newPassword2) => this.setState({newPassword2})}
                value={this.state.newPassword2}
                autoCorrect={false}
                placeholder={I18n.t('editProfile_t6')}
                placeholderTextColor={'#616060'}
                returnKeyType={'done'}
                secureTextEntry={this.state.newPassword2Value ? false : true}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({newPassword2Value: !this.state.newPassword2Value})
                }>
                <Ionicons
                  name={
                    this.state.newPassword2Value ? 'eye-off-outline' : 'eye-outline'
                  }
                  size={25}
                  style={{color: 'gray', marginTop: 3}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.errorMessageContainer}>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={() => this._Send()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('85%'),
              height: hp('7%'),
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {I18n.t('editProfile_t7')}
            </Text>
          </TouchableOpacity>
        </View>
        <PhotoModalize
          ref={(ref) => (this.modalize = ref)}
          selectedPhoto={(photo) => {this.setState({userPhoto: photo.path},()=>console.log('HERE: ',this.state.userPhoto))}}
          onPressProfile={()=>this.getLastProfile()}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: wp('85%'),
  },
  inputStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    ...FONTS.body3,
    paddingTop: Platform.OS === 'ios' ? -10 : 10,
    justifyContent: 'center',
    color: COLORS.gray,
    marginLeft: 15,
    width: wp('60%'),
    height: hp('7%'),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
  },
  errorMessageContainer: {
    paddingVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.body4,
    color: COLORS.red,
  },
});
