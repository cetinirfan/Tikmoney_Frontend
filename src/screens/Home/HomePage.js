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
  Modal,
  Pressable
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Intro from '../../datas/Intro';
import I18n from '../../I18n';
import {inject, observer} from "mobx-react";
import {SERVER_URL,PANEL_URL} from '../../../Constant';
var moment = require('moment');
import CustomTab from '../../components/Tab';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import Firebase from '@react-native-firebase/app';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import io from 'socket.io-client';


@inject("AuthStore")
@observer
export default class HomePage extends Component {

  state = {
    selected: 0,
    date: '',
    index:0,
    annoCount:5,
    modalVisible:false,
    FirebaseToken:''
  };
  circleDot = (index) =>{
    for(index;index!=0;index--){
      return(
        <View style={{height:10,width:10,borderRadius:5,backgroundColor:COLORS.primary}}/>
        )
    }
  }
  renderAnnouncements = ({item, index}) => {
    const dateLanguage = I18n.locale;
    if(dateLanguage==='tr-TR'){
      require('moment/locale/tr');
    }else{
      require('moment/locale/en-gb');
    }
    const momentDate = moment(item.annoCreated).format('ll');
    return (
      <TouchableOpacity
      onPress={()=>this.props.navigation.navigate('AnnoDetail',{annoDoc: item})}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: wp('83%'),
          height: wp('33%'),
          marginVertical: 10,
          marginHorizontal:32,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={images.announce}
          style={{width: wp('18%'), height: wp('18%'),marginHorizontal:15}}
        />
        <View style={{width: wp('50%'),height: wp('25%'),justifyContent:'space-between'}}>
          <Text numberOfLines={2} ellipsizeMode="middle" style={{...FONTS.body3}}>
            {item.title}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="middle" style={{...FONTS.body6, width: wp('50%')}}>
            {item.description}
          </Text>
      <Text style={{...FONTS.body4, color: COLORS.gray}}>{momentDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderStore = ({item, index}) => {
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
  renderTask = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('TaskDetail',{taskDoc: item,taskName:item.title})}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: wp('83%'),
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
        <View style={{marginTop: -10,width: wp('50%'),height: wp('25%'),justifyContent:'space-between'}}>
          <Text style={{...FONTS.body3, marginTop: Platform.OS === 'ios' ? 10 : 20}}>{item.title} {I18n.t('task_t1')}</Text>
          <Text numberOfLines={2} ellipsizeMode="middle" style={{...FONTS.body6, width: wp('50%'),marginTop: Platform.OS === 'ios' ? 0 : 10}}>
            {item.description}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center',marginTop: Platform.OS === 'ios' ? 0 : 10}}>
            <Text style={{...FONTS.body3}}>+{item.tikmoney}</Text>
            <Text style={{...FONTS.body4, marginLeft: 5}}>Tikmoney</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  async componentDidMount (){

    await this.props.AuthStore.getProfile();
    await this.props.AuthStore.getAnno();
    await this.props.AuthStore.getStore();
    await this.props.AuthStore.getTask();
    await this.props.AuthStore.getLastTask();

    Firebase.initializeApp(this)
    const FirebaseToken = []
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (async (token) => {
        const FirebaseToken1 = token.token
        FirebaseToken.push(FirebaseToken1)
        await this.props.AuthStore.saveFirebaseToken(FirebaseToken);
      }),

    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert(notification.data.type)
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  

  render() {
    const dateLanguage = I18n.locale;
    if(dateLanguage==='tr-TR'){
      require('moment/locale/tr');
    }else{
      require('moment/locale/en-gb');
    }
    const date = new Date();
    const momentDate = moment(date).format('ll');

 
    return (
      <View style={{flex:1,backgroundColor:'#F9F9F9',opacity:this.state.modalVisible ===false ? null : .5}} >

        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({modalVisible:false})
        }}
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={styles.modalView}>
          
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setState({modalVisible:false})}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.HomeContainer}>
          <View style={styles.HeaderStyle}>
          <Text style={styles.Title}>{I18n.t('home_t1')} {this.props.AuthStore.userData.userName}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Image style={styles.image} source = {{uri:this.props.AuthStore.userData.loginStatus === 1 ? `${SERVER_URL}${this.props.AuthStore.userData.userPhoto}` : this.props.AuthStore.userData.userPhoto}} />
            </TouchableOpacity>
          </View>
          <Text style={styles.DateStyle}>{momentDate}</Text>
          <TouchableOpacity >
            {/*<View style={{borderRadius:SIZES.radius,alignItems:'center',justifyContent:'center',marginTop:10}}>
          <ImageBackground source={images.bgWheel} imageStyle={{borderRadius:SIZES.radius}} style={{flexDirection:'row',alignItems: 'center',justifyContent:'center',width: wp('83%'),height: wp('20%')}}>
              <Image
                source={icons.wheel}
                style={{width: wp('13%'), height: wp('13%'),resizeMode:'contain',marginRight:32}}
                />
                <Text style={{...FONTS.h5,color:COLORS.white}}>Tikmoney Çarkı</Text>
          </ImageBackground>
      </View>*/}
          </TouchableOpacity>
          
          
          <View style={styles.CategoryContainer}>
            <Text style={styles.FirstTitle}>{I18n.t('home_t3')}</Text> 
          </View>
          
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            
            {this.props.AuthStore.annoList.length === 0 ?
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
            source={icons.search}
            style={{width: wp('15%'), height: wp('15%'),marginVertical:15}}
            />
            <Text style={{...FONTS.body4,color:COLORS.gray}}>{I18n.t('notFound_t1')}</Text>
          </View> 
            
          :
          <FlatList
            keyExtractor={(item) => item.id}
            ref={(ref) => (this.flatlist = ref)}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.props.AuthStore.annoList}
            renderItem={this.renderAnnouncements}
            />
            }
          </View>
          <View style={styles.CategoryContainer}>
            <Text style={styles.FirstTitle}>{I18n.t('home_t4')}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Tasks')}>
              <Text style={styles.DateStyle}>{I18n.t('home_t5')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {this.props.AuthStore.lastTaskList.length === 0 ? 
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
            source={icons.search}
            style={{width: wp('15%'), height: wp('15%'),marginVertical:15}}
            />
            <Text style={{...FONTS.body4,color:COLORS.gray}}>{I18n.t('notFound_t2')}</Text>
          </View>
          :
          <FlatList
          keyExtractor={(item, index) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.props.AuthStore.lastTaskList}
          renderItem={this.renderTask}
        />
            }
            
          </View>
          <View style={styles.CategoryContainer}>
            <Text style={styles.FirstTitle}>{I18n.t('home_t6')}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Store')}>
              <Text style={styles.DateStyle}>{I18n.t('home_t7')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={Intro}
              renderItem={this.renderStore}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },
  HeaderStyle: {
    marginHorizontal: 32,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastNotesStyle: {
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  CategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    width: '100%',
  },
  FirstTitle: {
    marginHorizontal: 32,
    ...FONTS.body3,
  },
  DateStyle: {
    marginHorizontal: 32,
    flexDirection: 'row',
    ...FONTS.body4,
    color: COLORS.gray,
  },
  Title: {
    ...FONTS.body2,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
