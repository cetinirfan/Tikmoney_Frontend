import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  FlatList,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Intro from '../../datas/Intro';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import I18n from '../../I18n';
import TaskModalize from './TaskModalize';
import {PANEL_URL,SERVER_URL} from '../../../Constant';
import {observer, inject} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


@inject("AuthStore")
@observer
export default class RejectedTask extends Component {
  state = {
  };

  renderTask = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress={()=>this.props.navigation.navigate('RejectedDetail',{taskDoc: item})}
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
          height: wp('33%'),
          marginVertical: 10,
          borderRadius: SIZES.radius,
          marginHorizontal: 32,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri:`${PANEL_URL}${item.taskImage}`}}
          style={{width: wp('18%'), height: wp('18%'),marginHorizontal:15}}
        />
        <View style={{marginTop: -10}}>
          <Text numberOfLines={2} ellipsizeMode="middle" style={{...FONTS.body3, marginTop: 10,}}>{this.state.focusedTask} {I18n.t('task_t1')}</Text>
          <Text numberOfLines={2} ellipsizeMode="middle" style={{...FONTS.body6, width: wp('55%'),marginTop: Platform.OS === 'ios' ? 0 : 10}}>
          {item.taskDescription}
          </Text>
          <View style={{flexDirection: 'row',marginTop: Platform.OS === 'ios' ? 0 : 10}}>
            <Text style={{...FONTS.body3}}>+{item.tikmoney} Tikmoney</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#F9F9F9'}}>
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
            {I18n.t('rejectedTask_t1')}
          </Text>
        </View>
        <View style={{flex:1,alignItems: 'center',marginTop:20}}>
        {this.props.AuthStore.myRejectedTask.length === 0 ?
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
            source={icons.search}
            style={{width: wp('15%'), height: wp('15%'),marginVertical:15}}
            />
            <Text style={{...FONTS.body4,color:COLORS.gray}}>{I18n.t('rejectedTask_t2')}</Text>
          </View> 
            
          :
          <FlatList
            keyExtractor={(item) => item.id} 
            data={this.props.AuthStore.myRejectedTask}
            horizontal={false}
            renderItem={this.renderTask}
          />
            }
        
          </View>
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({

});
