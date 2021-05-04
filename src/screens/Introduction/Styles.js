import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

    headerText:{
        color:COLORS.gray,
        marginTop:10,
        ...FONTS.body2,
      },
      introContainer:{
        width:wp('100%'),
        justifyContent:'center',
        alignItems:'center'
      },
      introImage:{
        marginBottom:10,
        marginTop:-170,
        resizeMode:'contain',
        width:wp('80%'),
        height:hp('30%')
      },
      introImage1:{
        marginBottom:10,
        resizeMode:'contain',
        width:200,
        height:170
      },

      introText:{
        ...FONTS.body2,
        color:COLORS.primary
      },
      bottomContainer:{
          flexDirection:'row',
          justifyContent:'space-between',
          marginHorizontal:32,
          marginVertical:32,
      },
      bottomIcon:{
        marginTop:15
      },
      nextIcon:{
          borderRadius:SIZES.radius,
          paddingHorizontal:6,
          paddingVertical:4,
          backgroundColor:COLORS.primary
      }
})
