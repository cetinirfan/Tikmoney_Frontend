import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import {observer, inject} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_URL} from '../../../Constant';
import axios from 'axios';
import I18n from '../../I18n';


@inject('LanguageStore')
@observer
export default class LanguageModalize extends Component {

  modalize = React.createRef();
  onOpen = () => {
    this.modalize.current.open();
  };
  onClose = () => {
    if (this.modalize.current) {
      this.modalize.current.close();
    }
  };

  _Send = async () => {
    try {
      const language = I18n.locale;
      const token = await AsyncStorage.getItem('token');
      const {data} = await axios.post(`${SERVER_URL}/users/setLanguage`, {
        language
      },{ 'headers': { 'x-access-token': token }});
      if (!data.status) {
        this.setState({errorMessage: data.message});
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
      <Modalize
        ref={this.modalize}
        onClosed={this.onClosed}
        adjustToContentHeight>
        <SafeAreaView
          style={{
            height: hp('30%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: '#FAFAFA',
          }}>
            <View
            style={{
              marginHorizontal: 32,
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.body2,color:COLORS.gray,marginBottom:15}}>{I18n.t('language')}</Text>
          </View>
          <TouchableOpacity
            style={styles.languageStyle}
            onPress={() => {
              this.setState({language:'tr-TR'});
              I18n.locale = 'tr-TR';
              this.props.LanguageStore.saveLanguage('tr-TR');
              this._Send()
              this.props.onPressButton && this.props.onPressButton();
              this.onClose();
              
            }}>
            <Image
              style={{
                width: hp('5%'),
                height: wp('10%'),
                resizeMode: 'contain',
                marginLeft: 15,
                position: 'absolute',
              }}
              source={icons.turkey}
            />
            <Text style={{...FONTS.body3, color: COLORS.black, marginLeft: 70}}>
              Türkçe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageStyle}
            onPress={() => {
              this.setState({language:'en-Us'});
              I18n.locale = 'en-Us';
              this.props.LanguageStore.saveLanguage('en-Us');
              this._Send()
              this.props.onPressButton && this.props.onPressButton();
              this.onClose();
              
            }}>
            <Image
              style={{
                width: hp('5%'),
                height: wp('10%'),
                resizeMode: 'contain',
                marginLeft: 15,
                position: 'absolute',
              }}
              source={icons.uk}
            />
            <Text style={{...FONTS.body3, color: COLORS.black, marginLeft: 70}}>
              English
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modalize>
    );
  }
}
const styles = StyleSheet.create({
  languageStyle: {
    justifyContent: 'center',
    width: wp('85%'),
    backgroundColor: COLORS.white,
    marginBottom: SIZES.radius,
    height: hp('7%'),
    borderRadius: SIZES.radius,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
