import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
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
import ImagePicker from 'react-native-image-crop-picker';
import {SERVER_URL} from '../../../Constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
var moment = require('moment');


@inject("AuthStore")
@observer
export default class TaskModalize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null,
    };
  }

  pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    const data1 = new FormData();
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        this.setState({path:image.path,change:true});
        data1.append("image",{
          uri: image.path,
          type: "image/jpeg",
          name: `${this.props.AuthStore.userData.userName}.jpg`
        });
        this.props.selectedTaskPhoto(image);
        this.onClose();
      })
      .catch((e) => alert(e));
  };

  pickSingle(cropit, circular = false, mediaType) {
    const data1 = new FormData();
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.3,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        this.setState({path:image.path,change:true});
      data1.append("image",{
        uri: image.path,
        type: "image/jpeg",
        name: `${this.props.AuthStore.userData.userName}.jpg`
      });
        this.props.selectedTaskPhoto(image);
        this.onClose();
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  renderAsset = (image) => {
    return this.renderImage(image);
  };

  renderImage = (image) => {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  };

  modalize = React.createRef();
  onOpen = () => {
    this.modalize.current.open();
  };
  onClose = () => {
    if (this.modalize.current) {
      this.modalize.current.close();
    }
  };

  render() {
    return (
      <Modalize
        ref={this.modalize}
        onClosed={this.onClosed}
        adjustToContentHeight>
        <SafeAreaView
          style={{
            height: hp('30%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: '#FAFAFA',
          }}>
          <View
            style={{
              marginHorizontal: 32,
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.body2, color: COLORS.gray, marginLeft: 10}}>
              {I18n.t('photo_t1')}
            </Text>
          </View>
          <View style={{marginHorizontal: 32}}>
            <TouchableOpacity
              style={styles.modalizeButton}
              onPress={() => this.pickSingle(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.library}
                  style={{
                    width: wp('10%'),
                    height: hp('5%'),
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text style={{...FONTS.body3, color: COLORS.black}}>
                    {I18n.t('photo_t2')}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="arrow-forward"
                size={35}
                style={{color: COLORS.black}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalizeButton}
              onPress={() => this.pickSingleWithCamera(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.photo}
                  style={{
                    width: wp('10%'),
                    height: hp('5%'),
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text style={{...FONTS.body3, color: COLORS.black}}>
                    {I18n.t('photo_t3')}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="arrow-forward"
                size={35}
                style={{color: COLORS.black}}
              />
            </TouchableOpacity>
          </View>
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
});
