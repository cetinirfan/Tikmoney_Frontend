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
export default class HomePage extends Component {
  state = {
    description: '',
    taskPhoto: null,
    image: [],
    errorMessage: ' '
  };
  _Send = async () => {
    try {
      if(this.state.image.length===0){
        I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: 'Resim yükleme alanı zorunludur'})
        :
        this.setState({errorMessage: 'Uploading an image is mandatory'})
      }else{
        const token = await AsyncStorage.getItem('token');
      const _taskId = this.props.route.params.taskDoc._id;
      const formData = new FormData();
      formData.append('tikmoney',this.props.route.params.taskDoc.tikmoney);
      formData.append('taskImage',this.props.route.params.taskDoc.taskImage);
      formData.append('taskDescription',this.props.route.params.taskDoc.description);
      formData.append('taskLink',this.props.route.params.taskDoc.link);
      formData.append('provedDescription',this.state.description);
      formData.append('language',this.props.route.params.taskDoc.language);
      formData.append('userName',this.props.AuthStore.userData.userName);
      formData.append('mail',this.props.AuthStore.userData.mail);
      formData.append('image',{
        uri: this.state.image.path,
        type: "image/jpeg",
        name: `${this.props.AuthStore.userData.userName+_taskId}.jpg`
      });
      const {data} = await axios.post(`${SERVER_URL}/task/provedTask/${_taskId}`, formData ,{ 'headers': { 'x-access-token': token ,'Content-Type': 'multipart/form-data'}});
      if (!data.status) {
        I18n.locale === 'tr-TR' ?
        this.setState({errorMessage: data.message[0]})
        :
        this.setState({errorMessage: data.message[1]})
        return false;
      } else {
        this.props.navigation.goBack()
        await this.props.AuthStore.getMyTask()
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
            { text: I18n.locale === 'tr-TR' ? 'Tamam' : 'OK' ,onPress: async () => console.log(this.props.AuthStore.waiting.length), style: 'cancel'},
          ],
          { cancelable: false }
      );
      }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const taskDoc = this.props.route.params.taskDoc;
    const taskName = this.props.route.params.taskName;
    console.log(this.props.route.params.taskDoc)
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
              {I18n.t('taskDetail_t1')}
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
              source={{uri:`${PANEL_URL}${taskDoc.taskImage}`}}
              style={{width: wp('25%'), height: wp('25%'),marginVertical:15}}
            />
            <View style={{marginTop: -10}}>
              <Text style={{...FONTS.body3, marginTop: 10}}>
              {I18n.t('taskDetail_t1_3')}
              </Text>
              <Text style={{...FONTS.body6, width: wp('75%'),marginVertical:5}}>
                {taskDoc.description}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: hp('1%'),
                }}>
                <Text style={{...FONTS.body3}}>+{taskDoc.tikmoney}</Text>
                <Text style={{...FONTS.body4, marginLeft: 5}}>Tikmoney</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={ ()=> Linking.openURL(`${taskDoc.link}`) }
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wp('75%'),
                    height: hp('6%'),
                    marginBottom: hp('2%'),
                    backgroundColor: COLORS.primary,
                    borderRadius: SIZES.radius,
                  }}>
                  <Text style={{...FONTS.h3, color: COLORS.white}}>
                  {I18n.t('taskDetail_t1_2')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
            <Text style={{...FONTS.body3, marginVertical: 10}}>{I18n.t('taskDetail_t2')}</Text>
            <View style={{marginTop: -10}}>
              <View style={{justifyContent:'center',alignItems:'center',marginVertical:15}}>
              
              <TouchableOpacity onPress={() => this.modalize.onOpen()} style={{justifyContent:'center',width:wp('70%'),borderStyle:'dashed',height:hp('15%'),alignItems:'center',borderWidth:2,borderColor:COLORS.gray,borderRadius:10}}>
              <Image
              source={this.state.taskPhoto ? {uri:this.state.taskPhoto} : icons.library}
              style={{
                height: this.state.taskPhoto ? hp('12%') : hp('7%'),
                width:wp('70%'),
                resizeMode:'contain'
              }}
            />
            {
              this.state.taskPhoto ? null : 
              <Text style={{...FONTS.body6, color: COLORS.primary}}>
              {I18n.t('taskDetail_t3')} 
              </Text>
            }
                
              </TouchableOpacity>
              </View>
              
              <Text style={{...FONTS.body6, color: COLORS.gray,textAlign:'center'}}>
              {taskDoc.inputDescription}
              </Text>
              <View style={styles.inputStyle}>
                <Ionicons
                  name={taskDoc.icon}
                  size={hp('3%')}
                  style={{
                    color:
                      this.state.description.length > 0 ? COLORS.primary : COLORS.gray,
                  }}
                />
                <TextInput
                  style={styles.input}
                  selectionColor={COLORS.primary}
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                  autoCorrect={false}
                  placeholder={taskDoc.input}
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
                  {I18n.t('taskDetail_t6')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </KeyboardAwareScrollView>
          <TaskModalize
          ref={(ref) => (this.modalize = ref)}
          selectedTaskPhoto={(photo) => {this.setState({taskPhoto: photo.path}),this.setState({image:photo})}}
          /> 
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
