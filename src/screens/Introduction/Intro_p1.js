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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from './Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyModalize from './Modalize';
import Intro from '../../datas/Intro';
import LanguageStore from '../../store/LanguageStore';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../I18n';

@observer
export default class Intro_p1 extends Component {
  
  state = {
    index: 1,
    language: 'tr-TR',
  };

  renderIntro = ({item, index}) => {
    return (
      <View style={Styles.introContainer}>
        <Image style={Styles.introImage} source={item.image} />
        <Text style={Styles.introText}>{this.state.language==='tr-TR' ? item.turkishTitle : item.englishTitle}</Text>
        <Text style={{...FONTS.body3,color:COLORS.gray,width:wp('85%'),textAlign:'center'}}>{this.state.language==='tr-TR' ? item.turkishDescription : item.englishDescription}</Text>
      </View>
    );
  };
  handleLanguage = async () => {
    const data = await AsyncStorage.getItem('language');
    this.setState({language: data});
  };

  async componentDidMount(){
    const data = await AsyncStorage.getItem('language');
    this.setState({language: data});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 32,
            marginTop: 15,
          }}>
          <TouchableOpacity onPress={() => this.modal.onOpen()}>
            <Image
              style={{
                width: hp('5%'),
                height: wp('10%'),
                resizeMode: 'contain',
                marginTop: Platform.OS === 'ios' ? 10 : 0,
              }}
              source={
                this.state.language === 'tr-TR'
                  ? images.turkish
                  : images.english
              }
            />
          </TouchableOpacity>
          {this.state.index !== 4 ? (
            <TouchableOpacity
              onPress={() => [
                this.props.navigation.navigate('LogIn'),
                this.flatlist.scrollToIndex({animated: true,index:0}),
                this.setState({index: 1}),
              ]}>
              <Text style={Styles.headerText}>{I18n.t('p1_header')}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ref={ref => {
            this.flatlist = ref;  // <------ ADD Ref for the Flatlist 
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          data={Intro}
          renderItem={this.renderIntro}
        />
        <View style={Styles.bottomContainer}>
          <Image
            style={Styles.bottomIcon}
            source={
              this.state.index === 1
                ? icons.dot1
                : this.state.index === 2
                ? icons.dot2
                : this.state.index === 3
                ? icons.dot3
                : icons.dot4 
            }
          />
          
          <TouchableOpacity
            style={Styles.nextIcon}
            onPress={() =>
              this.state.index === 4
                ? [this.props.navigation.navigate('LogIn'),this.flatlist.scrollToIndex({animated: true,index:0}),this.setState({index: 1}),]
                : [
                    this.flatlist.scrollToIndex({index: this.state.index}),
                    this.setState({index: this.state.index + 1}),
                  ]
            }>
            <Ionicons
              name={this.state.index < 4 ? 'arrow-forward' : 'checkmark-sharp'}
              size={35}
              style={{color: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
        <MyModalize
          ref={(ref) => (this.modal = ref)}
          onPressButton={() => this.handleLanguage()}
        />
      </SafeAreaView>
    );
  }
}
