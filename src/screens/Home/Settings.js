import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import I18n from '../../I18n';
import MyModalize from '../Introduction/Modalize';
import LanguageModalize from './LanguageModalize';
import {StackActions} from '@react-navigation/native';
import {inject, observer} from "mobx-react";
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

@inject('AuthStore')
@observer
export default class Settings extends Component {
  handleLanguage = async () => {
    this.props.navigation.dispatch(
      StackActions.replace('LogStack')
    )
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1,backgroundColor: '#F9F9F9'}}>
        <View
          style={{
              marginHorizontal:32,
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
              <Text style={{...FONTS.body2, marginLeft: 10,marginTop: Platform.OS === 'ios' ? -8 : 0,}}>{I18n.t('setting_t1')}</Text>
        </View>
          <View style={{marginHorizontal:32}}>
            {
              this.props.AuthStore.userData.loginStatus === 1 ? 
              <TouchableOpacity
              style={styles.modalizeButton} onPress={() => this.props.navigation.navigate('EditProfile')} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={icons.edit} style={{width:wp('10%'),height:hp('5%'),resizeMode:'contain',marginRight:10}} />
                    <View>
                        <Text style={{...FONTS.body3, color: COLORS.black}}>
                        {I18n.t('setting_t2')}
                        </Text>
                    </View>
                  </View>
                  <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
            </TouchableOpacity>
            :
            null
            }
            <TouchableOpacity
            
              style={styles.modalizeButton} onPress={() => this.modalize.onOpen()} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={icons.language} style={{width:wp('10%'),height:hp('5%'),resizeMode:'contain',marginRight:10}} />
                    <View>
                        <Text style={{...FONTS.body3, color: COLORS.black}}>
                        {I18n.t('setting_t3')}
                        </Text>
                    </View>
                  </View>
                  <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
            </TouchableOpacity>
            <TouchableOpacity
            
              style={styles.modalizeButton} onPress={() => this.props.navigation.navigate('Support')} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={icons.support} style={{width:wp('10%'),height:hp('5%'),resizeMode:'contain',marginRight:10}} />
                    <View>
                        <Text style={{...FONTS.body3, color: COLORS.black}}>
                        {I18n.t('setting_t4')}
                        </Text>
                    </View>
                  </View>
                  <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
            </TouchableOpacity>
            <TouchableOpacity
            
              style={styles.modalizeButton} onPress= { async () => [await this.props.AuthStore.refreshFirebaseToken('a'),
              this.props.navigation.dispatch(
                StackActions.replace('LogStack')
              ),this.props.AuthStore.saveToken(''),this.signOut()]} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={icons.logout} style={{width:wp('10%'),height:hp('5%'),resizeMode:'contain',marginRight:10}} />
                    <View>
                        <Text style={{...FONTS.body3, color: COLORS.black}}>
                        {I18n.t('setting_t5')}
                        </Text>
                    </View>
                  </View>
                  <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
            </TouchableOpacity>
          </View>
           
          <LanguageModalize
          ref={(ref) => (this.modalize = ref)}
          onPressButton={() => this.handleLanguage()}
        />
 
      </SafeAreaView>
      
    );
  }
}
const styles = StyleSheet.create({
    modalizeButton:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        width: wp('85%'),
        height: hp('7%'),
        paddingHorizontal:15,
        marginTop:hp('2%'),
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        shadowColor: 'gray',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }
});
