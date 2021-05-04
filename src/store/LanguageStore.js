import {observable, action} from  'mobx';
import AsyncStorage from '@react-native-community/async-storage';

class Language{
    @observable language = 'tr-TR';

    @action  saveLanguage = async (language)=>{
        try {
            await  AsyncStorage.setItem('language', language);
        } catch (error) {
            console.log(error)
        }
    }
} 

export default new Language();