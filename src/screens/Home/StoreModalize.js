import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import {observer, inject} from 'mobx-react';
import I18n from '../../I18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SERVER_URL,PANEL_URL} from '../../../Constant';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

@inject("AuthStore")
@observer
export default class StoreModalize extends Component {
  state = {
    description: '',
    errorMessage: ' ',
    Product:[]
  };
  modalize = React.createRef();
  onOpen = async (item) => {
    this.modalize.current.open();
    this.setState({Product:item})
  };
  onClose = async () => {
    if (this.modalize.current) {
      this.modalize.current.close();
    }
  };

  _Send = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const product = this.state.Product.purchased;
      const tikmoney = this.state.Product.tikmoney;
      const contentImage = this.state.Product.contentImage;
      const userDescription = this.state.description;
      const productDescription = this.state.Product.description;
      const {data} = await axios.post(`${SERVER_URL}/store/buyProduct`, {
        tikmoney,
        product,
        userDescription,
        productDescription,
        contentImage
      },{ 'headers': { 'x-access-token': token }});
      this.props.lastTikmoney(data.message[2]);
      if (!data.status) {
        I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: data.message[0]})
        :
        this.setState({errorMessage: data.message[1]})
        return false;
      } else {
        this.onClose()
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
        scrollViewProps={{showsVerticalScrollIndicator:true}}
        ref={this.modalize}
        onClosed={this.onClosed}
        adjustToContentHeight>
        
        <SafeAreaView
          style={{
            height: hp('45%'),
            borderRadius: 30,
            backgroundColor: '#FAFAFA',
          }}>
          <ScrollView style={{flex:1}}>
          <View style={{alignItems:'center'}}>
              <Image
                source={{uri:`${PANEL_URL}${this.state.Product.contentImage}`}}
                style={{width: wp('25%'), height: wp('25%'),marginVertical:20}}
              />
              <Text style={{...FONTS.body3}}>{this.state.Product.purchased}</Text>
              <Text style={{...FONTS.body4, color: COLORS.gray,textAlign:'center',width:wp('80%')}}>
              {this.state.Product.description}
              </Text>
                
              <View style={styles.inputStyle}>
              <Ionicons
              name="receipt-outline"
              size={hp('3%')}
              style={{color:this.state.description.length>0 ?COLORS.primary:COLORS.gray}}
              />
                <TextInput
                  style={styles.input}
                  selectionColor={COLORS.primary}
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                  autoCorrect={false}
                  placeholder={this.state.Product.input}
                  placeholderTextColor={'#616060'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
              </View>
              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={()=>this._Send()}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wp('75%'),
                    height: hp('6%'),
                    marginVertical: hp('2%'),
                    backgroundColor: COLORS.primary,
                    borderRadius: SIZES.radius,
                  }}>
                  <Text style={{...FONTS.h3, color: COLORS.white}}>
                  {I18n.t('storeModalize_t2')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </ScrollView>
        </SafeAreaView>
      </Modalize>
    );
  }
}
const styles = StyleSheet.create({
  modalizeButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('85%'),
    height: hp('7%'),
    paddingHorizontal: 15,
    marginTop: hp('2%'),
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
  },
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
