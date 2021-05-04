import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../constants';

export default class AnnounceCard extends Component {
  render() {
    return (
      <TouchableOpacity style={{width:wp('85%'),height:wp('33%'),borderRadius:SIZES.radius,marginHorizontal:32,backgroundColor:COLORS.white}}>
        <Text>asfas</Text>
      </TouchableOpacity>
    );
  }
}
