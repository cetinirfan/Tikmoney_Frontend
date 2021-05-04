import {observable, action} from  'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {SERVER_URL} from '../../Constant';

class AuthStore{ 
    @observable token= null;
    @observable userData = [];
    @observable annoList = [];
    @observable storeList = [];
    @observable taskList = [];
    @observable supportList = [];
    @observable lastTaskList = [];
    @observable firstTask = [];
    @observable myTaskList = [];
    @observable myRejectedTask = [];
    @observable storeHistory = [];
    @observable waiting = [];
    @observable completed = [];
    @observable rejected = [];
    @observable firstTitle = "";
    @observable userPicture = "";
    @observable loading = false;
    @observable visible = true
    @observable supPage = false

    @action  changeSupPage = async (status)=>{
        this.supPage = status
    }

    @action  saveToken = async (token)=>{
        try {
            await  AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log(error)
        }
    }

    @action saveFirebaseToken = async (savedToken) => {
        const FirebaseToken =  savedToken && savedToken.length>0 &&savedToken[0]
        this.loading = true
		try { 
            const token = await AsyncStorage.getItem('token');
            const {data} = await axios.post(`${SERVER_URL}/users/saveToken`, {
              FirebaseToken,
            },{ 'headers': { 'x-access-token': token }});
            if (!data.status) {
              return false;
            } else {
              console.log('başarılı'+ token)
            }
          } catch (error) {
            console.log(error);
          }
        this.loading = false
    };

    @action refreshFirebaseToken = async (clearToken) => {
        this.loading = true
		try { 
            const token = await AsyncStorage.getItem('token');
            const {data} = await axios.post(`${SERVER_URL}/users/refreshToken`,{clearToken},{ 'headers': { 'x-access-token': token }});
            if (!data.status) {
              return false;
            } else {
              console.log('başarılı')
            }
          } catch (error) {
            console.log(error);
          }
        this.loading = false
    };

    @action getProfile = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
			const {data} = await axios.get(`${SERVER_URL}/users/getProfile`,{ 'headers': { 'x-access-token': token }});
			this.userData=data;
			this.userPicture=data.userPhoto;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };

    @action getAnno = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
			const {data} = await axios.get(`${SERVER_URL}/anno/getAnno`,{ 'headers': { 'x-access-token': token }});
			this.annoList=data;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };

    @action getStore = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
			const {data} = await axios.get(`${SERVER_URL}/store/getStore`,{ 'headers': { 'x-access-token': token }});
			this.storeList=data;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };
    @action getTask = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
            const {data} = await axios.get(`${SERVER_URL}/task/getTask`,{ 'headers': { 'x-access-token': token }});
            this.taskList=data;
            this.firstTask=data[0];
            this.firstTitle=data[0].title;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };
    @action getLastTask = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
            const {data} = await axios.get(`${SERVER_URL}/task/getLastTask`,{ 'headers': { 'x-access-token': token }});
            this.lastTaskList=data;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };
    @action getSupport = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
            const {data} = await axios.get(`${SERVER_URL}/support/getSupport`,{ 'headers': { 'x-access-token': token }});
            this.supportList=data;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    }; 
    @action getMyTask = async () => {
        this.loading = true
		try {
            this.waiting = []
            this.completed = []
            this.rejected = []
			const token = await AsyncStorage.getItem('token');
            const {data} = await axios.get(`${SERVER_URL}/task/getRequest`,{ 'headers': { 'x-access-token': token }});
            this.myTaskList=data;
            data.map(item=>{
                if(item.status===0){
                    this.waiting.push(item)
                }else if (item.status===1){
                    this.completed.push(item)
                }else{
                    this.rejected.push(item)
                }
            })
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };

    @action getRejectedTask = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
            const {data} = await axios.get(`${SERVER_URL}/task/getRejectedTask`,{ 'headers': { 'x-access-token': token }});
            this.myRejectedTask=data;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };

    @action getStoreHistory = async () => {
        this.loading = true
		try {
			const token = await AsyncStorage.getItem('token');
            const {data} = await axios.get(`${SERVER_URL}/store/getStoreHistory`,{ 'headers': { 'x-access-token': token }});
            this.storeHistory=data;
		}catch (e) {
			console.log(e);
        }
        this.loading = false
    };
} 

export default new AuthStore();