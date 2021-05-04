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
import {SERVER_URL} from '../../../Constant';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from 'react-native-check-box'
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

@inject('AuthStore')
@observer
export default class SignUp extends Component {
  state = {
    userName: '',
    language: '',
    mail: '',
    password: '',
    passwordValue: false,
    loading: false,
    errorMessage:' ',
    isChecked:false,
    taskLoading:false,
  };
  _SignUp = async () => {
    try {
      if(!this.state.isChecked){
        I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: 'Gizlilik sözleşmesini okuyup kabul ediniz'})
        :
        this.setState({errorMessage: 'Accept the Privacy Terms'})
        this.setState({loading:false})
        return false;
      }
      const {userName, password, mail} = this.state;
      const language = await AsyncStorage.getItem('language');
      const {data} = await axios.post(`${SERVER_URL}/users/register`, {
        language,
        userName,
        mail,
        password,
      });
      if (!data.status) {
        I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: data.message[0]})
        :
        this.setState({errorMessage: data.message[1]})
        this.setState({loading:false})
        return false;
      } else {
        this.setState({loading:true})
        this.props.navigation.navigate('Verification', {mail: mail});
      }
      this.setState({loading:false})
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      
      <ImageBackground
        source={images.background}
        style={{flex:1,width: '100%', height: '100%'}}>
          <KeyboardAwareScrollView style={{flex:1}}>
        <SafeAreaView style={{ marginHorizontal: 32}}>
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
              style={{
                ...FONTS.h3,
                marginBottom: Platform.OS === 'ios' ? 0 : 10,
              }}>
              {I18n.t('signup_t1')}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>
            {I18n.t('signup_t2')}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <Ionicons
                name="person-outline"
                size={hp('3%')}
                style={{color:this.state.userName.length>0 ?COLORS.primary:COLORS.gray}}
              />
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(userName) => this.setState({userName})}
                value={this.state.userName}
                autoCorrect={false}
                placeholder={I18n.t('signup_t3')}
                placeholderTextColor={'#616060'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.mail.focus();
                }}
                blurOnSubmit={false}
                autoCapitalize={'words'}
              />
            </View>
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
                placeholder={I18n.t('signup_t4')}
                placeholderTextColor={'#616060'}
                returnKeyType={'next'}
                ref={(ref) => (this.mail = ref)}
                onSubmitEditing={() => {
                  this.password.focus();
                }}
                blurOnSubmit={false}
                autoCapitalize={'none'}
              />
            </View>
            <View style={styles.inputStyle}>
              <Ionicons
                name="lock-open-outline"
                size={hp('3%')}
                style={{color:this.state.password.length>0 ?COLORS.primary:COLORS.gray}}
              />
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                autoCorrect={false}
                placeholder={I18n.t('signup_t5')}
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
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center'}}>
							<TouchableOpacity style={[styles.checkBox,{borderWidth:1,borderColor:COLORS.primary,backgroundColor:this.state.isChecked ? COLORS.primary : COLORS.white}]} onPress={() => this.setState({isChecked:!this.state.isChecked})}>
								{
									this.state.isChecked &&
									<Text style={styles.checkBoxText,{color:this.state.isChecked ? COLORS.white : COLORS.primary}}>✓</Text>
								}
							</TouchableOpacity>
							<View style={{flexDirection:'row',flex:1,marginLeft:10}}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate("Terms")}>
                <Text style={{...FONTS.body4, color: COLORS.primary}}>{I18n.t('signup_t10')}</Text>
								</TouchableOpacity>
                <Text style={{...FONTS.body4, color: COLORS.black}}>{I18n.t('signup_t11')}</Text>
							</View>
						</View>
          </View>
          <View style={styles.errorMessageContainer}>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this._SignUp()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: wp('85%'),
                height: hp('7%'),
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>{I18n.t('signup_t7')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>{I18n.t('signup_t8')} </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LogIn')}>
                {
              !this.state.loading ?
              <Text style={[styles.footerText, {color: COLORS.primary}]}>
              {I18n.t('signup_t9')}
              </Text>
              :
              <MaterialIndicator color='white' size={40} />
            }
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
  checkBox:{
		width:wp("6%"),
		height:wp("6%"),
		borderRadius:wp("2"),
		alignItems:"center",
    justifyContent:"center"
	},
	checkBoxText:{
		fontSize:wp("5")
	},
});
