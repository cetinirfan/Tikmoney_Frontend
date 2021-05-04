// Import react
import React, {Component} from 'react';

// Import react-native components
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList
} from 'react-native'
import MessageBubble from './MessageBubble'
import { SafeAreaView } from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import I18n from '../../I18n';
import Intro from '../../datas/Intro';
import {inject, observer} from "mobx-react";
import {SERVER_URL} from '../../../Constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

@inject("AuthStore")
@observer

export default class RequestDetail extends Component {
  state = {
    mail: '',
    password: '',
    passwordValue: false,
    loading: false,
    errorMessage: ' ',
    userInfo: null,
    message:'',
    messages:this.props.route.params.doc,
    mine: false,
  };
  renderMessage = ({item, index}) => {
    return (
      <View style={{flex:1}}>
        <MessageBubble
         mine={item.mine}
         text={item.message}/>
      </View>
    );
  };
  _Send = async () => {
    let newMessage = this.state.messages.concat({mine:false,message:this.state.message})
    this.setState({messages:newMessage})
    this.setState({message:''})
    try {
      const {mine,message} = this.state;
      const token = await AsyncStorage.getItem('token');
      const _id = this.props.route.params.docId;
      const {data} = await axios.post(`${SERVER_URL}/support/sendMessage/${_id}`, {
        message,mine
      },{ 'headers': { 'x-access-token': token }});
      await this.props.AuthStore.getSupport()
    } catch (error) {
      console.log(error);
    }
  }
  render(){
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
     <SafeAreaView style={{backgroundColor: '#F9F9F9',flex:1}}>
       <View >
       <View
          style={{
            marginHorizontal: 32,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress= {async()=>{await this.props.AuthStore.getSupport(),this.props.navigation.push('SupportList')}}>
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
            {I18n.t('request_t1')}
          </Text>
    </View>
    <View style={{height:hp('80%')}}>
        <FlatList
            keyExtractor={(item) => item.id}
            ref={(ref) => (this.flatlist = ref)}
            showsHorizontalScrollIndicator={false}
            data={this.state.messages}
            renderItem={this.renderMessage}
          />
    </View>
       </View>
       

          
     </SafeAreaView> 
     <View style={styles.inputContainer}>
          <View style={styles.inputStyle}>
              <TextInput
                style={styles.input}
                selectionColor={COLORS.primary}
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
                autoCorrect={false}
                multiline={true}
                placeholder='Mesaj...'
                placeholderTextColor={'#616060'}
                returnKeyType={'send'}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
                onPress={() => this._Send()}>
                <Ionicons
                  name={'paper-plane'}
                  size={25}
                  style={{color: COLORS.primary, marginTop: 3}}
                />
              </TouchableOpacity>
            </View>
          </View>
     </KeyboardAvoidingView>
     
    ) 
  }
}
const styles = StyleSheet.create({
  
  inputContainer: {
    alignItems:'center',
    justifyContent:'flex-end',
  },
  inputStyle: {
    bottom:Platform.OS === "ios" ? 20 : 30,
    position:'absolute',
    alignItems: 'center',
    width: wp('80%'),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginVertical:5,
    borderRadius: 100,
    paddingHorizontal: 15,
    borderWidth:1,
    borderColor:COLORS.primary
  },
  input: {
    ...FONTS.body3,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    justifyContent: 'center',
    color: COLORS.gray,
    marginLeft: 15,
    width: wp('60%'),
    height: hp('6%'),
  },
});
