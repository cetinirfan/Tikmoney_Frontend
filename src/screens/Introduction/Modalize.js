import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
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
import I18n from '../../I18n';
import AsyncStorage from '@react-native-community/async-storage';


@inject('LanguageStore')
@observer
export default class MyModalize extends Component {
  modalize = React.createRef();
  onOpen = () => {
    this.modalize.current.open();
  };
  onClose = () => {
    if (this.modalize.current) {
      this.modalize.current.close();
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
              {I18n.locale = 'tr-TR';
              this.props.LanguageStore.saveLanguage('tr-TR');
              this.onClose();
              I18n.locale = 'tr-TR';
              this.props.onPressButton && this.props.onPressButton()}
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
              this.props.LanguageStore.saveLanguage('en-Us');
              this.onClose();
              I18n.locale = 'en-Us';
              this.props.onPressButton && this.props.onPressButton();
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
