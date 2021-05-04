import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import I18n from '../../I18n';
import {inject, observer} from "mobx-react";
import {SERVER_URL} from '../../../Constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
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

@inject("AuthStore")
@observer
export default class SignUp extends Component {
  
  constructor(props) {
    super(props);
    if(props.route.params){
      this.setState({userName:Object.keys(props.route.params)[0]})
    }
    this.state = {
      notStatus: 1,
      userName:this.props.AuthStore.userData.userName,
      values: '',
      mail: '',
      password: '',
      passwordValue: false,
      loading: false,
      waiting: this.props.AuthStore.waiting.length,
      taskLoading:false,
    };
  }
  async componentDidUpdate(){
    this.setState({loading:true})
    await this.props.AuthStore.getProfile();
    console.log('aa')
  }
_Send = async () => {
  try {
    const {notStatus} = this.state;
    console.log(notStatus)
    const token = await AsyncStorage.getItem('token');
    const {data} = await axios.post(`${SERVER_URL}/users/chooseNot`, {
      notStatus,
    },{ 'headers': { 'x-access-token': token }});
    if (!data.status) {
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
    console.log('asfasf')
    return (
      <View style={{flex: 1, backgroundColor: '#F9F9F9', }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            alignItems: 'center',
            marginHorizontal: 32,
            paddingTop:Platform.OS === 'ios' ? 32 : 16,
          }}>
          <View style={{flexDirection: 'row'}}>
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
                marginTop: Platform.OS === 'ios' ? 0 : 8,
              }}>
              {I18n.t('profile_t1')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Ionicons
              name="build-outline"
              size={35}
              style={{color: COLORS.black}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{height:hp('100%')}}>
        <View style={styles.profile}>
          <Image
            source = {{uri:this.props.AuthStore.userData.loginStatus === 1 ? `${SERVER_URL}${this.props.AuthStore.userData.userPhoto}` : this.props.AuthStore.userData.userPhoto}}
            style={{width: 120, height: 120, borderRadius: 60}}
          />
          <Text style={{...FONTS.h1}}>{this.state.userName}</Text>
          <Text style={{...FONTS.body2}}>{this.props.AuthStore.userData.mail}</Text>
        </View>
        <View style={{marginHorizontal: 32}}>
          <Text style={{...FONTS.body4, color: COLORS.gray, marginBottom: 10}}>
            {I18n.t('profile_t2')}
          </Text>
          <View>
          <TouchableOpacity
            onPress = {async()=> [await this.props.AuthStore.getMyTask(), this.props.navigation.navigate('TaskControl',{data:this.props.AuthStore.waiting,title:'Waiting'})]}>
            <View
              style={[
                styles.TaskCard,
                {justifyContent: 'space-between', alignItems: 'center',marginBottom: wp('5%')},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.waiting}
                  style={{
                    height: wp('9%'),
                    width: wp('9%'),
                    resizeMode: 'contain',
                    marginRight: 10, 
                  }}
                />
                <Text style={{...FONTS.body3, color: COLORS.black,marginBottom:Platform.OS === 'ios' ? 5 : 0}}>
                  {I18n.t('profile_t5')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: wp('5%'),
                }}>
                 <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress = {async()=> [await this.props.AuthStore.getMyTask(),this.props.navigation.navigate('TaskControl',{data:this.props.AuthStore.completed,title:'Completed'})]}>
            <View
              style={[
                styles.TaskCard,
                {
                  marginBottom: wp('5%'),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.completed}
                  style={{
                    height: wp('9%'),
                    width: wp('9%'),
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                <Text style={{...FONTS.body3, color: COLORS.black,marginBottom:Platform.OS === 'ios' ? 5 : 0}}>
                  {I18n.t('profile_t3')}
                </Text>
              </View>

              <View style={{alignItems: 'center', marginRight: wp('5%')}}>
              <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress = {()=>this.props.navigation.navigate('RejectedTask')}>
            <View
              style={[
                styles.TaskCard,
                {
                  marginBottom: wp('5%'),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
                
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.rejected}
                  style={{
                    height: wp('9%'),
                    width: wp('9%'),
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                <Text style={{...FONTS.body3, color: COLORS.black,marginBottom:Platform.OS === 'ios' ? 5 : 0}}>
                  {I18n.t('profile_t4')}
                </Text>
              </View>
                  <View
                style={{
                  alignItems: 'center',
                  marginRight: wp('5%'),
                }}>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Ionicons
                  name="arrow-forward"
                  size={25}
                  style={{color: COLORS.gray}}
                />
                  </View>
              </View>
                  </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{...FONTS.body4, color: COLORS.gray, marginBottom: 10}}>
              {I18n.t('profile_t10')}
            </Text>
            <TouchableOpacity
            onPress = {async()=> [await this.props.AuthStore.getStoreHistory(),this.props.navigation.navigate('StoreHistory',{data:this.props.AuthStore.storeHistory})]}>
            <View
              style={[
                styles.TaskCard,
                {justifyContent: 'space-between', alignItems: 'center',marginBottom: wp('5%')},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.shopping_cart}
                  style={{
                    height: wp('9%'),
                    width: wp('9%'),
                    resizeMode: 'contain',
                    marginRight: 10, 
                  }}
                />
                <Text style={{...FONTS.body3, color: COLORS.black,marginBottom:Platform.OS === 'ios' ? 5 : 0}}>
                  {I18n.t('profile_t11')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: wp('5%'),
                }}>
              </View>
            </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{...FONTS.body4, color: COLORS.gray, marginBottom: 10}}>
              {I18n.t('profile_t6')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                [this.setState({
                  notStatus: this.state.notStatus === 1 ? 0 : 1,
                }),this._Send()]
              }
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: wp('85%'),
                height: hp('7%'),
                marginBottom: 30,
                paddingLeft: 15,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                shadowColor: 'gray',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {
                  this.state.notStatus ===1
                  ?
                <Image
                  source={icons.onnot}
                  style={{
                    width: wp('10%'),
                    height: hp('5%'),
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                :
                <Image
                  source={icons.offnot}
                  style={{
                    width: wp('10%'),
                    height: hp('5%'),
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                }
                <Text style={{...FONTS.body3, color: COLORS.black}}>
                  {I18n.t('profile_t7')}
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginRight: wp('5%')}}>
                <Text style={{...FONTS.body3, color: COLORS.gray}}>{this.state.notStatus ===1 ? I18n.t('profile_t8') : I18n.t('profile_t9')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  button: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: COLORS.white,
  },
  TaskCard: {
    alignItems: 'center',
    paddingLeft: 15,
    width: wp('85%'),
    height: hp('7%'),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
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
