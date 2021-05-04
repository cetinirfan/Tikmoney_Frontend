import I18n, {getLanguages} from '../../node_modules/react-native-i18n';

import tr from './tr';
import en from './en';

I18n.fallbacks = true;
I18n.translations = {
  en,
  tr,
};

getLanguages()
  .then((languages) => {
    // I18nManager.forceRTL(true);
    console.log('getLanguages', languages); // ['en-US', 'en']
  })
  .catch((error) => {
    console.log('getLanguages error : ', error);
  });
export default I18n;
