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
export default class StoreHistory extends Component {
  state = {
    description: '',
    taskPhoto: null,
    title: this.props.route.params.title,
  };

  renderTask = ({item, index}) => {
    return (
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
            }}>
                <View style={{alignItems:'center'}}>
                <Image
              source={{uri:`${PANEL_URL}${item.contentImage}`}}
              style={{width: wp('25%'), height: wp('25%'),marginVertical:15}}
            />
                </View>
            
            <View style={{marginTop: -10,marginLeft: 32}}>
                <Text style={{...FONTS.body4}}>{I18n.t('storeHistory_t3')}: {item.tikmoney} Tikmoney</Text>
                <Text style={{...FONTS.body4}}>{I18n.t('storeHistory_t4')}: {item.product}</Text>
                <Text style={{...FONTS.body4}}>{I18n.t('storeHistory_t5')}: {item.requestCreated.slice(0, 10)} {item.requestCreated.slice(11, 16)}</Text>
                <Text style={{...FONTS.body4,textAlign:'center',marginBottom:32,marginTop:5,color:item.status===0 ? COLORS.primary : item.status===1 ? COLORS.red : 'green' }}>{item.status===0 ? I18n.t('storeHistory_t6') : item.status===1 ? I18n.t('storeHistory_t7') : I18n.t('storeHistory_t8')}</Text>
            </View>
          </View>
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
        {I18n.t('storeHistory_t1')}
      </Text>
    </View>
    <View style={{flex:1,alignItems: 'center',marginTop:20}}>
    { this.props.route.params.data.length === 0 ?
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
        source={icons.search}
        style={{width: wp('15%'), height: wp('15%'),marginVertical:15}}
        />
        <Text style={{...FONTS.body4,color:COLORS.gray}}>{I18n.t('storeHistory_t2')}</Text>
      </View> 
        
      :
      <FlatList
        style={{ width:"100%"}}
        keyExtractor={(item) => item.id} 
        data={this.props.AuthStore.storeHistory}
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
  inputStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    marginVertical: 15,
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
    ...FONTS.body4,
    paddingTop: Platform.OS === 'ios' ? -10 : 10,
    justifyContent: 'center',
    color: COLORS.gray,
    marginLeft: 15,
    width: wp('55%'),
    height: hp('6%'),
  },
  errorMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.body4,
    color: COLORS.red,
  },
});
