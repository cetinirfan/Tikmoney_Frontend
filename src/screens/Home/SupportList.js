import React, {Component,useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import I18n from '../../I18n';
import Intro from '../../datas/Intro';
import {inject, observer} from "mobx-react";
import {PANEL_URL,SERVER_URL} from '../../../Constant';
var moment = require('moment');
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
export default class SupportList extends Component {
  state = {
    loading:this.props.AuthStore.supPage,
    taskList:this.props.AuthStore.supportList
  };

  renderTask = ({item, index}) => {
    const messageCount = item.messages.length-1
    const dateLanguage = I18n.locale;
    if(dateLanguage==='tr-TR'){
      require('moment/locale/tr');
    }else{
      require('moment/locale/en-gb');
    }
    const momentDate = moment(item.supportCreated).format('LL');
    return (
      <TouchableOpacity
      onPress = {()=>this.props.navigation.navigate('RequestDetail',{doc:item.messages,docId:item._id})}
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
          height: wp('20%'),
          marginVertical: 10,
          borderRadius: SIZES.radius,
          marginHorizontal: 32,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {item.messages[messageCount].mine===false ? 
          <Image
          source = {{uri:this.props.AuthStore.userData.loginStatus === 1 ? `${SERVER_URL}${this.props.AuthStore.userData.userPhoto}` : this.props.AuthStore.userData.userPhoto}}
          style={{width: wp('10%'), height: wp('10%'),borderRadius:100,marginHorizontal:15}}
          />
          : 
          <Image
          source={icons.support1}
          style={{width: wp('10%'), height: wp('10%'),marginHorizontal:15}}
        />
          }
        <View style={{marginTop: -10}}>
          <Text style={{...FONTS.body4,color:COLORS.primary,marginTop: 10}}>{item.messages[messageCount].mine===false ? 'Me' : 'Support'}</Text>
          <Text numberOfLines={1} style={{...FONTS.body3,width:wp('58%')}}>{item.messages[messageCount].message.length>23 ? item.messages[messageCount].message+'...':item.messages[messageCount].message}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    setTimeout(async() => {
      await this.props.AuthStore.getSupport();
      this.setState({loading: true})}, 2000)
    return (
      <SafeAreaView style={{flex:1,backgroundColor: '#F9F9F9'}} >
        <View
          style={{
            marginHorizontal: 32,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Support')}>
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
            {I18n.t('supportList_t1')}
          </Text>
        </View>
        {
            this.state.loading===false ? 
            <WaveIndicator color={COLORS.primary} size={40} />
            :
            <View style={{flex:1}}>

          <FlatList
            keyExtractor={(item) => item.id}
            data={this.props.AuthStore.supportList}
            renderItem={this.renderTask}
          />
            </View>
        }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({});
