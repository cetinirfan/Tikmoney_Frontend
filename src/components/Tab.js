import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Tab = ({label,accessibilityState,onPress})=>{
    //const focused = accessibilityState.selected;
    //const icon = !focused ? icons[label] : icons[`${label}_check`]
    return (
        <TouchableOpacity  style={{alignItems:'center',justifyContent:'center',width:wp('25%')}} onPress={onPress}>
                <View style={{borderRadius:20,flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                <Image style={{height:hp('3%'),width:wp('6%'),resizeMode:'contain'}} source={icons.Home} />
                </View>
        </TouchableOpacity>
      );
}
const styles = StyleSheet.create({
    labelText:{
        ...FONTS.body3,
        color:COLORS.primary,
        marginLeft:5
    },
});
    
export default Tab;