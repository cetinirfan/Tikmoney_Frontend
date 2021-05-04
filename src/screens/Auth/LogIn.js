import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import I18n from '../../I18n';
import {observer, inject} from 'mobx-react';
import axios from 'axios';
import {SERVER_URL} from '../../../Constant';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '721159524899-drmdkr5tjpi35c1pq8dvdiugpc75ju09.apps.googleusercontent.com',
});

@inject('AuthStore')
@observer
export default class Login extends Component {
  state = {
    mail: '',
    password: '',
    passwordValue: false,
    loading: false,
    errorMessage: ' ',
    userInfo: null
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      await this._GoogleLogIn()
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  _GoogleLogIn = async () => {
    try {
      
      const userName = this.state.userInfo.user.name
      const photo = this.state.userInfo.user.photo
      const mail = this.state.userInfo.user.email
      const language = await AsyncStorage.getItem('language') || I18n.locale

      const {data} = await axios.post(`${SERVER_URL}/users/googleLogin`, {
        mail,
        userName,
        language,
        photo
      });
      console.log(data)
      if (!data.status) {
          Alert.alert(
            I18n.locale === 'tr-TR' ?
            'Hata'
            :
            'Alert',
            I18n.locale === 'tr-TR' ?
            data.message[0]
            :
            data.message[1],
            [
              {text: I18n.locale === 'tr-TR' ? 'Tamam' : 'OK', style: 'cancel'},
            ],
            { cancelable: false }
          );
        }else {
          this.setState({loading:true})
          this.props.AuthStore.saveToken(data.token);
          await this.props.AuthStore.getProfile();
          await this.props.AuthStore.getAnno();
          await this.props.AuthStore.getTask();
          await this.props.AuthStore.getLastTask();
          await this.props.AuthStore.getSupport();
          await this.props.AuthStore.getStore();
          await this.props.AuthStore.getMyTask();
          await this.props.AuthStore.getRejectedTask();
          this.props.navigation.dispatch(
            StackActions.replace('HomeStack')
          );
          this.setState({loading:false})
        }
    } catch (error) {
      console.log(error);
    }
  };
  _LogIn = async () => {
    try {
      
      const {password, mail} = this.state;
      const language = await AsyncStorage.getItem('language') || I18n.locale

      const {data} = await axios.post(`${SERVER_URL}/users/login`, {
        mail,
        password,
        language
      });
      console.log(data)
      if (!data.status) {
        if (data.message[0]==="Doğrulanmamış kullanıcı") {
          Alert.alert(
            I18n.locale === 'tr-TR' ?
            'Hata'
            :
            'Alert',
            I18n.locale === 'tr-TR' ?
            data.message[0]
            :
            data.message[1],
            [
              {text: I18n.locale === 'tr-TR' ? 'Tamam' : 'OK'},
              {text: I18n.locale === 'tr-TR' ? 'Doğrula' : 'Verify',onPress: () => this.props.navigation.navigate('Verification', {mail: mail}) , style: 'cancel'}
            ],
            { cancelable: false }
          );
        }else{
          I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: data.message[0]})
        :
        this.setState({errorMessage: data.message[1]})
        this.setState({loading:false})
        return false;
        }
      } else {
        this.setState({loading:true})
        this.props.AuthStore.saveToken(data.token);
        await this.props.AuthStore.getProfile();
        await this.props.AuthStore.getAnno();
        await this.props.AuthStore.getTask();
        await this.props.AuthStore.getLastTask();
        await this.props.AuthStore.getSupport();
        await this.props.AuthStore.getStore();
        await this.props.AuthStore.getMyTask();
        await this.props.AuthStore.getRejectedTask();
        this.props.navigation.dispatch(
          StackActions.replace('HomeStack')
        );
        this.setState({loading:false})
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      
      <ImageBackground source={images.background} style={{width:('100%'),height:('100%')}}>
        <KeyboardAwareScrollView style={{flex:1}}>
          <SafeAreaView style={{flex: 1, marginHorizontal: 32}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
          <Image style={styles.logo} source={images.icon} />
        </View>
        <View style={{marginVertical: 15}}>
          <Text
            style={{...FONTS.h3, marginBottom: Platform.OS === 'ios' ? 0 : 10}}>
            {I18n.t('login_t1')}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
          {I18n.t('login_t2')}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={()=>this.signIn()} style={styles.googleCard}>
            <Image
              style={{marginRight: 15, resizeMode: 'contain', height: '60%'}}
              source={icons.google}
            />
            <Text style={{...FONTS.body3, color: COLORS.gray}}>
            {I18n.t('login_t3')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text style={{...FONTS.body3, color: COLORS.gray}}>{I18n.t('login_t4')}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputStyle}>
            <Ionicons
              name="mail-open-outline"
              size={hp('3%')}
              style={{color:this.state.mail.length>0 ?COLORS.primary:COLORS.gray}}
            />
            <TextInput
              style={styles.input}
              selectionColor={COLORS.primary}
              onChangeText={(mail) => this.setState({mail})}
              value={this.state.mail}
              autoCorrect={false}
              placeholder={I18n.t('login_t5')}
              placeholderTextColor={'#616060'}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.password.focus();
              }}
              blurOnSubmit={false}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
          </View>
          <View style={styles.inputStyle}>
            <Ionicons
              name="lock-open-outline"
              size={hp('3%')}
              style={{color: this.state.password.length>0 ?COLORS.primary:COLORS.gray}}
            />
            <TextInput
              style={styles.input}
              selectionColor={COLORS.primary}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              autoCorrect={false}
              placeholder={I18n.t('login_t6')}
              placeholderTextColor={'#616060'}
              returnKeyType={'done'}
              secureTextEntry={this.state.passwordValue ? false : true}
              ref={(ref) => (this.password = ref)}
              autoCapitalize={'none'}
            />
            <TouchableOpacity
              onPress={() =>
                this.setState({passwordValue: !this.state.passwordValue})
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
        </View>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
            <Text
              style={{...FONTS.body4, color: COLORS.primary, paddingTop: -10}}>
              {I18n.t('login_t7')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          disabled={this.state.loading}
          onPress={() => this._LogIn()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('85%'),
              height: hp('7%'),
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
            }}>{
              !this.state.loading ? 
              <Text style={{...FONTS.h3, color: COLORS.white}}>{I18n.t('login_t9')}</Text>
              :
              <MaterialIndicator color='white' size={25} />
            }
            
          </TouchableOpacity>
        </View>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>{I18n.t('login_t10')} </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
            <Text style={[styles.footerText, {color: COLORS.primary}]}>
            {I18n.t('login_t11')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('7%'),
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
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

    elevation: 5,
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
  errorMessageContainer: {
    paddingVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.body4,
    color: COLORS.red,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...FONTS.body4,
  },
});
