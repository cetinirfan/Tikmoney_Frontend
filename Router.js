import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {COLORS, FONTS, SIZES, icons, images} from './constants';
import CustomTab from './src/components/Tab';
import I18n from './src/I18n';
import {Intro_p1,LogIn,StoreHistory,SignUp,Support,TaskControl,SupportList,ForgetPassword,RejectedTask,RejectedDetail,Verification,Terms,HomePage,Store,Profile,Tasks,Settings,TaskDetail,RequestDetail,EditProfile,AnnoDetail,Splash} from './src/screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppStack = createStackNavigator();
const LogStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () =>{
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#5100FF',
    }}>
      <Tab.Screen name="HomePage" component={HomePage} options={{tabBarLabel:I18n.t('tabBar_t1'),
      tabBarVisible: true,tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )}}/>
      <Tab.Screen name="Tasks"  component={Tasks} options={{tabBarLabel:I18n.t('tabBar_t2'),tabBarVisible: true,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="ios-clipboard-outline" color={color} size={size} />
    )}}/>
      <Tab.Screen name="Store" component={Store} options={{tabBarLabel:I18n.t('tabBar_t3'),tabBarVisible: true,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="ios-cart-outline" color={color} size={size} />
    )}}/>
      <Tab.Screen name="Profile" listeners={({navigation,route})=>({
        tabPress: async (e) => {
          await this.props.AuthStore.getMyTask();
        }
      })} component={Profile} options={{tabBarLabel:I18n.t('tabBar_t4'),
      tabBarVisible: true,tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-outline" color={color} size={size} />
          )}}/>
    </Tab.Navigator>
  );
}

function LogStackScreen() {
	return (
		<LogStack.Navigator initialRouteName="Splash">
          <LogStack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
			    <LogStack.Screen
            name="Intro_p1"
            component={Intro_p1}
            options={{headerShown: false}}
          />
          <LogStack.Screen
            name="LogIn"
            component={LogIn}
            options={{headerShown: false}}
          />
          <LogStack.Screen
            name="Verification"
            component={Verification}
            options={{headerShown: false}}
          />
          <LogStack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <LogStack.Screen
            name="Terms"
            component={Terms}
            options={{headerShown: false}}
          />
          <LogStack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{headerShown: false}}
          />
		</LogStack.Navigator>
	);
}

function HomeStackScreen() {
	return (
		<HomeStack.Navigator initialRouteName="HomePage">
			<HomeStack.Screen
            name="HomePage"
            component={TabNav}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Store"
            component={Store}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Tasks"
            component={Tasks}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="TaskDetail"
            component={TaskDetail}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="AnnoDetail"
            component={AnnoDetail}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="TaskControl"
            component={TaskControl}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="StoreHistory"
            component={StoreHistory}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Support"
            component={Support}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="SupportList"
            component={SupportList}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="RequestDetail"
            component={RequestDetail}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="RejectedTask"
            component={RejectedTask}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="RejectedDetail"
            component={RejectedDetail}
            options={{headerShown: false}}
          />
		</HomeStack.Navigator>
	);
}

const MyStack = () => {
  return (
      <NavigationContainer >
        <AppStack.Navigator >
          <AppStack.Screen name={"LogStack"} component={LogStackScreen} options={{headerShown: false}}/>
				  <AppStack.Screen name={"HomeStack"} component={HomeStackScreen} options={{headerShown: false}}/>
        </AppStack.Navigator>
      </NavigationContainer>
  );
};

export default MyStack;