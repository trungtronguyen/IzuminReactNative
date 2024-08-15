import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { SecondScreen } from './screens/SecondScreen';
import { ThirdScreen } from './screens/ThirdScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SwitchSmileRN, OfferBeaconSelectMode } from 'react-native-rnssbpsdk';

const Tab = createBottomTabNavigator();

export default function App() {

  //Init SDK
  if (Platform.OS === 'ios') {
    console.log('Setup SSBP SDK for iOS');
    setupIOS();
  }

  if (Platform.OS === 'android') {
    console.log('Setup SSBP SDK for Android');
    setupAndroid();
  }

  SwitchSmileRN.setDetectBeacon(true);
  SwitchSmileRN.setUseNotification(true);
  SwitchSmileRN.enablePopup(true, true, true);
  SwitchSmileRN.setOfferBeaconSelectMode(OfferBeaconSelectMode.NEAREST);
  SwitchSmileRN.setLocaleId("kLocaleID");
  console.log('SSBP SDK version =' + SwitchSmileRN.getSDKVersion());

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: (focused, color, size) => {
          let iconName
          switch (route.name) {
            case 'Home':
              iconName = '1'
              break
            case 'Second':
              iconName = '2'
              break
            case 'Third':
              iconName = '3'
              break
            default:
              break
          }
          return <Icon name={iconName} size={20} />
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray'
      })}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Second' component={SecondScreen} />
        <Tab.Screen name='Third' component={ThirdScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const setupAndroid = async () => {
  SwitchSmileRN.init();
  SwitchSmileRN.setSSBPSdkScannerAdapter(OfferBeaconSelectMode.NEAREST);
  SwitchSmileRN.subscribe_ssbpOnSDKReady(
    async (params) => {
      console.log('ssbpOnSDKReady:' + params.success);
      if (params.success) {
        await SwitchSmileRN.getDeviceId().then((value) => console.log("DeviceId: " + value));
      }
    }
  )
  SwitchSmileRN.subscribe_ssbpOnOfferReceive(
    (params) => {
      //Example use
      const isForeground = params.isForeground;
      const offer = params.offer;
      console.log('ssbpOnOfferReceive:\nisForeground: ' + isForeground + '\noffer: ' + JSON.stringify(offer));
    }
  )
  // SwitchSmileRN.subscribe_ssbpScannerChangeBeacons(
  //   (params) => {
  //     //Example use
  //     const regionDatasArray = params.regions;
  //     const beaconDatasArray = params.beacons;
  //     const jsonArray = [];
  //     regionDatasArray.forEach(element => {
  //       jsonArray.push(JSON.stringify(element))
  //     });
  //     beaconDatasArray.forEach(element => {
  //       jsonArray.push(JSON.stringify(element))
  //     });
  //     console.log('Android-ssbpScannerChangeBeacons ' + jsonArray);
  //   }
  // )
  SwitchSmileRN.subscribe_ssbpScannerNeedPermissionRequest(
    (params) => {
      SwitchSmileRN.requestPermission();
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerNeedPermissionBackgroundRequest(
    () => {
      SwitchSmileRN.requestPermission();
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerDidPermissionGranted(
    () => {
      console.log('ssbpScannerDidPermissionGranted');
      SwitchSmileRN.start();
    }
  )
  const start = async () => {
    if (await SwitchSmileRN.requirePermission()) {
      SwitchSmileRN.start();
    }
  }
  start();
}

const setupIOS = async () => {
  SwitchSmileRN.setMaster("ReactNative Master Appname");
  console.log('SSBP SDK isDetectBeacon =' + SwitchSmileRN.isDetectBeacon());
  SwitchSmileRN.registerDisplayOfferAdPopup();
  SwitchSmileRN.registerDidFinishCheckMaster();
  SwitchSmileRN.subscribe_iOSdidFinishCheckMaster(
    async (error) => {
      if (error == null) {
        console.log('didFinishCheckMaster Success');
      } else {
        console.log('didFinishCheckMaster Error = ' + JSON.stringify(params));
      }
    }
  )
  SwitchSmileRN.registerToSsbpOnOfferReceive();
  SwitchSmileRN.subscribe_iOSonOfferReceive(
    async (params) => {
      console.log('subscribe_iOSonOfferReceive:' + JSON.stringify(params));
    }
  )
  SwitchSmileRN.registerToWatchBeaconsDetected();
  // SwitchSmileRN.subscribe_iOSwatchBeaconsDetected(
  //   async (params) => {
  //     console.log('iOS_iOSwatchBeaconsDetected:' + JSON.stringify(params));
  //   }
  // )
  SwitchSmileRN.registerToDidReceiveAds();
  SwitchSmileRN.subscribe_iOSdidReceiveAds(
    async (params) => {
      console.log('subscribe_iOSdidReceiveAds:' + JSON.stringify(params));
    }
  )
  SwitchSmileRN.start();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
