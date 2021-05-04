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
import I18n from '../../I18n';
import axios from "axios";
import {SERVER_URL} from "../../../Constant";
import {StackActions} from '@react-navigation/native';


export default class Verification extends Component {
  state = {
    userMailCode: '',
    loading: false,
  };

  _Verify = async () => {
    try {
        const mail = this.props.route.params.mail;
        const userMailCode = this.state.userMailCode;
        console.log(mail)
        const {data} = await axios.post(`${SERVER_URL}/users/code`,{mail,userMailCode});
        console.log(data)
        if(!data.status)
        {
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
            return false;
        }

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
                {text: I18n.locale === 'tr-TR' ? 'Tamam' : 'OK',onPress: () => this.props.navigation.dispatch(StackActions.replace('LogIn')), style: 'cancel'},
            ],
            { cancelable: false }
        );

    }catch (e) {
        console.log(e);
    }
    this.setState({loading:false})
}

_Resend = async () => {
    try {
        const mail = this.props.route.params.mail;
        const {data} = await axios.post(`${SERVER_URL}/users/changeCode`,{mail});
        if (data.status) {
            Alert.alert(
                'Başarılı',
                data.message,
                [
                    {text: 'Tamam', style: 'cancel'},
                ],
                { cancelable: false }
            );
        }
    }catch (e) {
        console.log(e);
    }
}

  render() {
    return (
      <ImageBackground
        source={images.background}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1, marginHorizontal: 32}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LogIn')}>
              <Ionicons
                name="arrow-back"
                size={35}
                style={{color: COLORS.primary}}
              />
            </TouchableOpacity>
          </View>
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
              {I18n.t('verif_t1')}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>
            {I18n.t('verif_t2')}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <Ionicons
                name="mail-open-outline"
                size={hp('3%')}
                style={{color: COLORS.primary}}
              />
              <TextInput
                style={styles.input}
                onChangeText={(userMailCode) => this.setState({userMailCode})}
                value={this.state.userMailCode}
                autoCorrect={false}
                placeholder={I18n.t('verif_t3')}
                placeholderTextColor={'#616060'}
                returnKeyType={'done'}
                blurOnSubmit={false}
                autoCapitalize={'none'}
              />
            </View>
          </View>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <TouchableOpacity
            onPress={() => this._Resend()}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                  paddingTop: -10,
                  marginBottom:20
                }}>
                {I18n.t('verif_t4')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={() => this._Verify()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: wp('85%'),
                height: hp('7%'),
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>{I18n.t('verif_t5')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
