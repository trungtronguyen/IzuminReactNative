import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { SecondScreen } from './screens/SecondScreen';
import { ThirdScreen } from './screens/ThirdScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
