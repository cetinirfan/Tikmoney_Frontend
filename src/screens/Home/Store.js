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
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import I18n from '../../I18n';
import StoreModalize from './StoreModalize';
import Intro from '../../datas/Intro';
import {inject, observer} from "mobx-react";
import {SERVER_URL,PANEL_URL} from '../../../Constant';

@inject("AuthStore")
@observer
export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tikmoney:this.props.AuthStore.userData.tikmoney
    };
  }
  renderTikMoney = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: wp('30%'),
          height: wp('27%'),
          marginVertical: 10,
          borderRadius: SIZES.radius,
          marginLeft: 32,
          backgroundColor: COLORS.white,
          alignItems: 'center',
        }}>
          <Text style={{...FONTS.body4,marginTop: Platform.OS === 'ios' ? 0 : 10}}>+30 Tikmoney</Text>
        <Image
          source={images.tikmoneylogo}
          style={{marginTop: 5, width: wp('12%'), height: wp('12%')}}
        />
        <Text style={{...FONTS.body4, color: COLORS.gray,marginTop: Platform.OS === 'ios' ? 0 : 5}}>3,99 TL</Text>
      </TouchableOpacity>
    );
  };
  renderStore= ({item, index}) => {
    return (
      <View>
        <Text style={styles.FirstTitle}>{item.title}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {item.content.map(doc=>{
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
          width: wp('45%'),
          height: wp('50%'),
          marginVertical: 10,
          borderRadius: SIZES.radius,
          marginLeft: 32,
          backgroundColor: COLORS.white,
          justifyContent:'space-between'
        }}>
        
        <View style={{marginHorizontal:20}}>
        <Image
          source={{uri:`${PANEL_URL}${doc.contentImage}`}}
          style={{marginTop: 15, width: wp('15%'), height: wp('15%')}}
        />
        <Text style={{...FONTS.body4,marginTop: Platform.OS === 'ios' ? 0 : 10}}>{doc.purchased}</Text>
        <Text style={{...FONTS.body3, color: COLORS.gray,marginTop: Platform.OS === 'ios' ? 0 : 5}}>{doc.tikmoney} Tikmoney</Text>  
        </View>
        <View style={{alignItems:"center",marginBottom:20}}>
        <TouchableOpacity
          onPress={() => this.modalize.onOpen(doc)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('35%'),
              height: hp('5%'),
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>{I18n.t('store_t3')}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
          )
        })}
        </ScrollView>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#F9F9F9'}}>
        <View
          style={{
            marginHorizontal: 32,
            paddingTop:Platform.OS === 'ios' ? 32 : 16,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
            <View style={{flexDirection:'row'}}>
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
              marginTop: Platform.OS === 'ios' ? 0 : 5,
            }}>
            {I18n.t('store_t1')}
          </Text>
            </View>
            <View>
              <TouchableOpacity>
              <Image
                source={icons.video}
                style={{marginTop: Platform.OS === 'ios' ? -3 : 0,marginLeft:5,width: wp('14%'), height: wp('13%'),resizeMode:'contain'}}
              />
              </TouchableOpacity>
            </View>
        </View>
        <ScrollView > 
          <View style={styles.CategoryContainer}>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              <Text style={{...FONTS.body1}}>Tikmoney:</Text>
              <Text style={{...FONTS.h1}}> {this.state.tikmoney}</Text>
              <Image
                source={images.tikmoneylogo}
                style={{marginTop: Platform.OS === 'ios' ? -3 : 0,marginLeft:5,width: wp('7%'), height: wp('7%')}}
              />
            </View>

            <Text style={styles.PageTitle}>
            {I18n.t('store_t2')}
            </Text>
          </View>
          <Text style={styles.FirstTitle}>Tikmoney</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
              keyExtractor={(item) => item.id}
              ref={(ref) => (this.flatlist = ref)}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={Intro}
              renderItem={this.renderTikMoney}
            />
          </View>
          <View>
            <FlatList
              keyExtractor={(item) => item._id}
              ref={(ref) => (this.flatlist = ref)}
              data={this.props.AuthStore.storeList}
              renderItem={this.renderStore}
            />
          </View>
          </ScrollView>
          <StoreModalize
          ref={(ref) => (this.modalize = ref)}
          lastTikmoney={(doc) => {this.setState({tikmoney: doc})}}
        />
      </View>
      

      
    );
  }
}
const styles = StyleSheet.create({
  PageTitle: {
    textAlign:'center',
    marginHorizontal: 32,
    ...FONTS.body4,
    marginVertical: 15,
    color: COLORS.gray,
  },
  CategoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    width: '100%',
  },
  FirstTitle: {
    marginHorizontal: 32,
    ...FONTS.body3,
    marginVertical: 5,
  },
});
