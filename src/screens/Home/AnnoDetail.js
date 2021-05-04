import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import I18n from '../../I18n';
var moment = require('moment');

export default class AnnoDetail extends Component {
  state = {
    name: '',
  };
  render() {
    const dateLanguage = I18n.locale;
    if(dateLanguage==='tr-TR'){
      require('moment/locale/tr');
    }else{
      require('moment/locale/en-gb');
    }
    const annoDoc = this.props.route.params.annoDoc;
    const momentDate = moment(annoDoc.annoCreated).format('ll');
    return (
      
        <SafeAreaView style={{flex: 1,backgroundColor: '#F9F9F9'}}>
          <KeyboardAwareScrollView >
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
              {I18n.t('annoDetail_t1')}
            </Text>
          </View>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              width: wp('85%'),
              marginVertical: 10,
              borderRadius: SIZES.radius,
              marginHorizontal: 32,
              backgroundColor: COLORS.white,
              alignItems: 'center',
            }}>
            <Image
              source={images.announce}
              style={{width: wp('25%'), height: wp('25%')}}
            />
            <View style={{marginTop: -10}}>
              <Text style={{...FONTS.body3, marginTop: 10}}>
              {annoDoc.title}
              </Text>
              <Text style={{...FONTS.body6, width: wp('80%')}}>
              {annoDoc.description}
              </Text>
              <View
                style={{
                  marginVertical:10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: hp('1%'),
                }}>
                <Text style={{...FONTS.body4,color:COLORS.gray}}>{momentDate}</Text>
              </View>
            </View>
          </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
        
      
      
    );
  }
}
