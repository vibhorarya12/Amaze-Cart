import React, { useState } from 'react';
import { CommonActions } from "@react-navigation/native";
import { Cart, Category, Home, Profile, ViewProduct, Wishlist } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, View } from "react-native";

const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const Homenav = () => {
    const [cartItemCount, setCartItemCount] = useState(5); // Example initial cart item count

    return (
        <Tab.Navigator
          backBehavior={'history'}
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => {
                const visibleState = {
                    ...state,
                    routes: state.routes.filter(route => route.name !== 'Category' && route.name !== 'ViewProduct')
                };

                return (
                    <BottomNavigation.Bar
                    
                        style={{ height: height * 0.09 }}
                        renderLabel={() => null}
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
                                return options.tabBarIcon({ focused, color, size: height * 0.03 });
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
                name="Cart"
                component={Cart}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View>
                                <Icon name="cart" size={size} color={"#433eb6"} />
                                {cartItemCount > 0 && (
                                    <Badge size={size*0.85} style={{ position: 'absolute', top: -height*0.02, zIndex:1, right:-width*0.03}}>
                                        {cartItemCount}
                                    </Badge>
                                )}
                            </View>
                        );
                    },
                }}
            />
             <Tab.Screen
                name="Category"
                component={Category}
                options={{
                    tabBarLabel: 'Category',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            />
             <Tab.Screen
                name="ViewProduct"
                component={ViewProduct}
                options={{
                    tabBarLabel: 'ViewProduct',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export default Homenav;
