import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Styles from './Styles';
import LanguageStore from '../../store/LanguageStore';
import {observer, inject} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';

import I18n from '../../I18n';

@inject('AuthStore')
@observer
export default class Intro_p1 extends Component {

    
  render() {
    setTimeout(() => {
        const token = AsyncStorage.getItem('token')
        token.then(async(tokenDoc)=>{
            if(tokenDoc){
              const language = AsyncStorage.getItem('language')
                language.then(async(languageDoc)=>{
                  if(languageDoc){
                    I18n.locale=languageDoc
                  }else{
                    I18n.locale = 'tr-TR'
                  }
                })
                await this.props.AuthStore.getProfile();
                if(this.props.AuthStore.userData===null){
                  this.props.navigation.navigate('LogIn');
                }else{
                await this.props.AuthStore.getAnno();
                await this.props.AuthStore.getStore();
                await this.props.AuthStore.getTask();
                await this.props.AuthStore.getMyTask();
                await this.props.AuthStore.getRejectedTask();
                await this.props.AuthStore.getLastTask();
                await this.props.AuthStore.getSupport();
                this.props.navigation.dispatch(
                    StackActions.replace('HomeStack')
                  );
                }
                
            }else{
                const language = AsyncStorage.getItem('language')
                language.then(async(languageDoc)=>{
                  
                  if(languageDoc){
                    I18n.locale=languageDoc
                    this.props.navigation.navigate('Intro_p1')
                  }else{
                    await  AsyncStorage.setItem('language', 'tr-TR');
                    I18n.locale = 'tr-TR'
                    this.props.navigation.navigate('Intro_p1')
                  }
                })
                
            }
        })
    }, 2000);
    return (
      <View style={{flex: 1, justifyContent: 'center',alignItems:'center'}}>
                <Image style={Styles.introImage1} source={images.icon} />
      </View>
    );
  }
}
