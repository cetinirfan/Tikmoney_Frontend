import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import I18n from '../../I18n';
import { ScrollView } from 'react-native-gesture-handler';

export default class Terms extends Component {

  render() {
    return (
          <SafeAreaView style={{flex: 1, marginHorizontal: 32,backgroundColor: '#F9F9F9'}}>
          <View
                style={{
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
                    <Text style={{...FONTS.body2, marginLeft: 10,marginTop: Platform.OS === 'ios' ? -8 : 0,}}>{I18n.t('terms_t1')}</Text>
            </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{...FONTS.body4}}>Burada belirtilen gizlilik politikası ve kullanım koşulları; TikMoney'in Google Play Store ve IOS App Store'da yayınlanan bütün mobil uygulamaları için geçerlidir. Bu uygulamaları mobil cihazınıza yükleyerek, bu metinde yer alan gizlilik politikasını ve kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız bu uygulamaları mobil cihazınıza yüklemeyiniz.

Uygulamalarımızda, Girilen Veriler şifreli sunucularda sadece sizlerin görebileceği şekilde depolanır ve 3. şahıs yada kurumlar ile paylaşılmaz.


İnternet Kullanım İzinleri,Uygulamımızdan Verilerin Şifreli sunuculara gönderilebilmesi için gerekli olan izindir ve kullanıcıların bunu tanımlaması gerekir. bu izinler telefonunuzdan isteğiniz dışında bir bilgiyi transfer etmek için kullanılmaz. Verilen internet erişim izni sadece uygulama içersinde dolduracağınız formlara ait veri ve fotoğraf transferi için kullanılmaktadır.


Kamera Kullanımı: Mobil Uygulamalarımızda kamera kullanımı sadece uygulama içersinden göndermek istediğiniz fotoğraflar için kullanılmaktadır. kullanıcı bilgisi dışında kullanımı söz konusu değildir. Mobil uygulamada çekilen fotoğraflar kullanıcıya ait şifreli ortamda saklanır ve sadece kendisinin ve bağlı olduğu kurumun erişimine açıktır. Fotoğraflar 3. şahıs yada kurumlar ile kullanıcı bilgisi dışında paylaşılmaz.


Uygulamalarımız, size ait herhangi bir kişisel bilgiyi toplamaz ve sizden bu yönde bir talepte bulunmaz.

TikMoney, kaliteli ve yararlı uygulamalar yayınlamak için her zaman gereken özeni ve duyarlılığı gösterecektir. Buna rağmen, uygulamalarımızda yer alan içeriklerin beklentilerinizi karşılayacağı, size yararlı olacağı veya kesin doğru bilgiler içereceğine dair hiçbir taahhütte bulunmamaktayız. Uygulamaları olduğu gibi sunmaktayız. Bu sebeple, uygulamalarımızdan kaynaklı yaşanacak herhangi bir olumsuz durum için TikMoney'i sorumlu tutamayacağınızı kabul etmektesiniz. 

TikMoney, bu uygulamaların güvenliği konusunda alınabilecek tüm önlemleri almak için gereken ölçüde çaba sarf eder ve Google Play Geliştirici Programı Politikaları sözleşmesi kapsamındaki yükümlülüklerini yerine getirir. Bununla birlikte; internet ve dijital ortamlar yeterli düzeyde güvenli alanlar değildir. Bu yüzden size yüzde yüz güvenli bir hizmet sunacağımız konusunda herhangi bir garantide bulunmamaktayız.
Uygulamalarımız sadece Google Play Store ve IOS App Store'da yer almaktadır. Bu uygulamaların bizim bilgimiz dışında başka bir android yada IOS mağazasında yer alması durumunda, buradan yapılacak yüklemelerden TikMoney sorumlu tutulamaz.

Bu uygulamalarda, üçüncü taraflara ait reklamlar ve linkler yer alabilir. Bu üçüncü taraflara ait reklamların ve linklerin niteliğinden, içeriğinden, güvenliğinden veya bunlardan kaynaklı oluşabilecek zararlardan TikMoney'i sorumlu tutamayacağınızı kabul etmektesiniz. Google tarafından yayınlanan reklamlara ilişkin ayarlarınızı nasıl düzenleyeceğinizi, reklam ayarları sayfasından öğrenebilirsiniz.

Bu uygulamalarda yer alan sesli, yazılı ve görsel öğelerden ve yazılımlardan oluşan bütün içeriğe ilişkin her türlü telif hakkı TikMoney’ne aittir. Herhangi bir uygulamamızı veya bu uygulamaların telif haklarıyla korunan içeriğini; kopyalama, çoğaltma, yeniden yayımlama, parçalarına ayırma, tekrar kamuya sunma vb. eylemlerde bulunmayacağınızı kabul etmektesiniz.

Burada belirtilen koşullarla ilgili görüş ve önerilerinizi, info@tikfreeapp.com mail adresinden bize iletebilirsiniz.

TikMoney; bu Gizlilik Politikası ve Kullanım Koşulları metninde değişiklik yapabilir. Yapılan değişiklikler anında yürürlüğe girecektir. Değişiklik yaptığımız tarihi, "son güncelleme tarihi" olarak en alt kısımda belirtiriz. </Text>
        </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: wp('85%'),
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    marginBottom: 20,
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
    ...FONTS.body3,
    paddingTop: Platform.OS === 'ios' ? 5 : -15,
    textAlignVertical: Platform.OS === 'ios' ? 'auto' : 'top',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    color: COLORS.gray,
    marginLeft: 15,
    width: wp('60%'),
    height: hp('20%'),
  },
  errorMessageContainer: {
    paddingVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.body4,
    color: COLORS.red,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...FONTS.body4,
  },
});
