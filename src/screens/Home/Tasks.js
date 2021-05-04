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
import {PANEL_URL} from '../../../Constant';

@inject("AuthStore")
@observer
export default class Tasks extends Component {
  state = {
    focusedTask: this.props.AuthStore.firstTitle,
    taskList:this.props.AuthStore.firstTask.content
  };
  renderTitle = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress={()=>[this.setState({focusedTask:item.title,taskList:item.content})]}
        style={{
          marginVertical:24,
          marginHorizontal:5,
          flexDirection: 'row',
          justifyContent:'center',
          alignItems:'center'
        }}>
        <View style={{marginTop: -20}}>
          {
            this.state.focusedTask===item.title ?
            <View>
              <Text style={{...FONTS.body3, marginTop: 10, color: COLORS.primary}}>
            {item.title}
            </Text>
            <View
            style={{
              borderBottomColor: COLORS.primary,
              borderBottomWidth: 2
            }}
            />
            </View>
          :
          <Text style={{...FONTS.body3, marginTop: 10, color: COLORS.gray}}>
            {item.title}
          </Text>
          }
          
        </View>
      </TouchableOpacity>
    );
  };
  async componentDidMount(){
    await this.props.AuthStore.getTask();
  }

  renderTask = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress={()=>this.props.navigation.navigate('TaskDetail',{taskDoc: item,taskName:this.state.focusedTask})}
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
          {item.description}
          </Text>
          <View style={{flexDirection: 'row',marginTop: Platform.OS === 'ios' ? 0 : 10}}>
            <Text style={{...FONTS.body3}}>+{item.tikmoney} Tikmoney</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    console.log(this.state.taskList)
    return (
      <SafeAreaView style={{flex:1,backgroundColor: '#F9F9F9'}} >
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
            {I18n.t('task_t1')}
          </Text>
        </View>
        
        {this.props.AuthStore.taskList.length === 0  ? 
        <View style={{justifyContent: 'center',alignItems: 'center',marginTop:hp('3%')}}>
        <Image
        source={icons.search}
        style={{width: wp('15%'), height: wp('15%'),marginVertical:15}}
        />
        <Text style={{...FONTS.body4,color:COLORS.gray}}>{I18n.t('notFound_t2')}</Text>
      </View>
          
          :
          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
            keyExtractor={(item) => item.id}
            ref={(ref) => (this.flatlist = ref)}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            data={this.props.AuthStore.taskList}
            renderItem={this.renderTitle}
          />
        </View >
        <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.taskList}
            renderItem={this.renderTask}
          />
          </View>
            }
          

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({});
