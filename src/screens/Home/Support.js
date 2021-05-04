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

@inject('AuthStore')
@observer
export default class Support extends Component {
  state = {
    message: '',
    mine:false,
    loading: false,
    errorMessage: ' '
  };

  _Send = async () => {
    try {
      const {mine,message} = this.state;
      const token = await AsyncStorage.getItem('token');
      const {data} = await axios.post(`${SERVER_URL}/users/addSupport`, {
        message,mine
      },{ 'headers': { 'x-access-token': token }});
      console.log(data)
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
            { text: I18n.locale === 'tr-TR' ? 'Tamam' : 'OK' , style: 'cancel'},
          ],
          { cancelable: false }
      );
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
        <KeyboardAwareScrollView style={{flex:1,backgroundColor: '#F9F9F9'}}>
          <SafeAreaView style={{flex: 1, marginHorizontal: 32}}>
          <View
                style={{
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
                    <Text style={{...FONTS.body2, marginLeft: 10,marginTop: Platform.OS === 'ios' ? -8 : 0,}}>{I18n.t('support_t1')}</Text>
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
            style={{...FONTS.h3, marginBottom: Platform.OS === 'ios' ? 0 : 10}}>
            {I18n.t('support_t2')}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
          {I18n.t('support_t3')}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputStyle}>
            <Ionicons
              name="receipt-outline"
              size={hp('3%')}
              style={{color:this.state.message.length>0 ?COLORS.primary:COLORS.gray,marginTop:15}}
            />
            <TextInput
              style={[styles.input,{marginTop:15}]}
              multiline={true}
              selectionColor={COLORS.primary}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
              autoCorrect={false}
              placeholder={I18n.t('support_t4')}
              placeholderTextColor={'#616060'}
              placeholderStyle
              returnKeyType={'done'}
              blurOnSubmit={false}
              autoCapitalize={'none'}
            />
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
              marginTop:20,
              justifyContent: 'center',
              width: wp('85%'),
              height: hp('7%'),
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>{I18n.t('support_t5')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>{I18n.t('support_t6')} </Text>
          <TouchableOpacity onPress= {async()=>{await this.props.AuthStore.getSupport(),this.props.navigation.navigate('SupportList')}}>
            <Text style={[styles.footerText, {color: COLORS.primary}]}>
            {I18n.t('support_t7')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </KeyboardAwareScrollView>
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
  inputContainer: {
    width: wp('85%'),
  },
  inputStyle: {
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
    paddingTop: Platform.OS === 'ios' ? 5 : -15,
    textAlignVertical: Platform.OS === 'ios' ? 'auto' : 'top',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    color: COLORS.gray,
    marginLeft: 15,
    width: wp('60%'),
    height: hp('20%'),
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
