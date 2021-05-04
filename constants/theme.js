import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary:'#5100FF',
    secondary:'#F5006A',

    gray:'#8F8F8F',
    white:'#ffffff',
    black:'#000',
    red:'#BB6881'
}

export const SIZES = {
     // global sizes
     base: 8,
     font: 14,
     radius: 10,
     padding: 24,
     padding2: 36,
 
     // font sizes
     largeTitle: 50,
     h1: 30,
     h2: 22,
     h3: 16,
     h4: 14,
     h5: 19,
     h2:12,
     body1: 30,
     body2: 20,
     body3: 16,
     body4: 14,
     body5: 22,
     body6:11,
 
     // app dimensions
     width,
     height
}

export const FONTS = {
    largeTitle: { fontFamily: "Gilroy-Medium", fontSize: SIZES.largeTitle,paddingTop: Platform.OS === 'ios' ? 10 : 0},
    h1: { fontFamily: "Gilroy-Bold", fontSize: SIZES.h1, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    h5: { fontFamily: "Gilroy-Bold", fontSize: SIZES.h5, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    h2: { fontFamily: "Gilroy-Bold", fontSize: SIZES.h2, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    h3: { fontFamily: "Gilroy-Bold", fontSize: SIZES.h3, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    h4: { fontFamily: "Gilroy-Bold", fontSize: SIZES.h4, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    body1: { fontFamily: "Gilroy-Medium", fontSize: SIZES.body1, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    body2: { fontFamily: "Gilroy-Medium", fontSize: SIZES.body2, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    body3: { fontFamily: "Gilroy-Medium", fontSize: SIZES.body3, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    body4: { fontFamily: "Gilroy-Medium", fontSize: SIZES.body4, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    body5: { fontFamily: "Gilroy-Medium", fontSize: SIZES.body5, paddingTop: Platform.OS === 'ios' ? 10 : 0},
    body6: { fontFamily: "Gilroy-Medium", fontSize: SIZES.body6, paddingTop: Platform.OS === 'ios' ? 10 : 0},
}

const appTheme = { COLORS,FONTS,SIZES};

export default appTheme;