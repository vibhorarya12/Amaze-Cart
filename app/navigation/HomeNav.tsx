import { CommonActions } from "@react-navigation/native";
import { Cart, Home, Profile, Wishlist } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Homenav = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors, insets }) => {
            const visibleState = {
              ...state,
              routes: state.routes.filter(route => route.name !== 'Cart')
            };
            
            return (
              <BottomNavigation.Bar
                navigationState={visibleState}
                safeAreaInsets={insets}
                onTabPress={({ route, preventDefault }) => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
      
                  if (event.defaultPrevented) {
                    preventDefault();
                  } else {
                   navigation.dispatch({
                      ...CommonActions.navigate(route.name, route.params),
                      target: state.key,
                    });
                  }
                }}
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                  }
      
                  return null;
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.title;
      
                  return label;
                }}
              />
            );
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="home" size={size} color={"#433eb6"} />;
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="account" size={size} color={"#433eb6"} />;
              },
            }}
          />
          <Tab.Screen
            name="Wishlist"
            component={Wishlist}
            options={{
              tabBarLabel: 'Wishlist',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="heart" size={size} color={"#433eb6"} />;
              },
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="cart" size={size} color={"#433eb6"} />;
              },
            }}
          />
        </Tab.Navigator>
    );
}

export default Homenav;