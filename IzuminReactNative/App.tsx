import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { SecondScreen } from './screens/SecondScreen';
import { ThirdScreen } from './screens/ThirdScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SwitchSmileRN, OfferBeaconSelectMode } from 'react-native-rnssbpsdk';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Tab.Navigator screenOptions={({route}) => ({
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
        return <Icon name={iconName} size={20}/>
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray'
    })}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Second' component={SecondScreen}/>
      <Tab.Screen name='Third' component={ThirdScreen}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

const setup = async () => {
  //Init SDK
  SwitchSmileRN.init();
  SwitchSmileRN.enableDebug();
  //Enable beacon, gps, ssid Popup
  SwitchSmileRN.enablePopup(true, true, true);

  //Set Scanner Adapter and listener events from SDK
  SwitchSmileRN.setSSBPSdkScannerAdapter(OfferBeaconSelectMode.NEAREST);
  SwitchSmileRN.subscribe_ssbpOnSDKReady(
    async (params) => {
      console.log('ssbpOnSDKReady:' + params.success);
    }
  )
  SwitchSmileRN.subscribe_ssbpOnOfferReceive(
    (params) => {
      //Example use
      const isForegroundMap = params.isForegroundMap;
      const offerMap = params.offerMap;
      console.log('ssbpOnOfferReceive:\nisForegroundMap: ' + isForegroundMap + '\noffer: ' + JSON.stringify(offerMap));
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerChangeBeacons(
    (params) => {
      //Example use
      const regionDatasArray = params.regions;
      const beaconDatasArray = params.beacons;
      const jsonArray = [];

      regionDatasArray.forEach(element => {
        jsonArray.push(JSON.stringify(element))
      });

      beaconDatasArray.forEach(element => {
        jsonArray.push(JSON.stringify(element))
      });

      console.log('ssbpScannerChangeBeacons ' + jsonArray);
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerNeedPermissionRequest(
    (params) => {
      //Example use
      const stringArray = params.permissions;
      console.log('ssbpScannerNeedPermissionRequest ' + stringArray);
      SwitchSmileRN.requestPermission();
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerNeedPermissionBackgroundRequest(
    () => {
      console.log('ssbpScannerNeedPermissionBackgroundRequest');
      SwitchSmileRN.requestPermission();
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerNeedRequestPermissionRationale(
    () => {
      console.log('ssbpScannerNeedRequestPermissionRationale');
    }
  )
  SwitchSmileRN.subscribe_ssbpScannerDidPermissionGranted(
    () => {
      console.log('ssbpScannerDidPermissionGranted');
      SwitchSmileRN.start();
    }
  )

  //Start SDK
  const start = async () => {
    if (await SwitchSmileRN.requirePermission()) {
      SwitchSmileRN.start();
    }
  }
  start();
}
setup();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
