import React, { useState } from 'react';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Cart, Category, Checkout, Home, Login, Profile, ViewProduct, Wishlist } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, View } from "react-native";
import { useSelector } from 'react-redux';
import AuthNav from './Authnav';

const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const Homenav = () => {
    const navigation = useNavigation();
    const cartItems = useSelector((state) => state.products.cartItems);

    return (
        <Tab.Navigator
            backBehavior={'history'}
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => {
                const focusedRouteName = state.routes[state.index].name;

                const visibleState = {
                    ...state,
                    routes: state.routes.filter(route => 
                        route.name !== 'Category' && 
                        route.name !== 'ViewProduct' && 
                        route.name !== 'Checkout' && 
                        route.name !== 'AuthNav'
                    ),
                };

                return (
                    focusedRouteName !== 'AuthNav' && (
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
                    )
                );
            }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <Home {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="Wishlist"
                options={{
                    tabBarLabel: 'Wishlist',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="heart" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <Wishlist {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="account" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <Profile {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="Cart"
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View>
                                <Icon name="cart" size={size} color={"#433eb6"} />
                                {cartItems.length > 0 && (
                                    <Badge size={size * 0.85} style={{ position: 'absolute', top: -height * 0.02, zIndex: 1, right: -width * 0.03 }}>
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </View>
                        );
                    },
                }}
            >
                {props => <Cart {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="Category"
                options={{
                    tabBarLabel: 'Category',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <Category {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="ViewProduct"
                options={{
                    tabBarLabel: 'ViewProduct',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <ViewProduct {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="Checkout"
                options={{
                    tabBarLabel: 'Checkout',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <Checkout {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="AuthNav"
                options={{
                    tabBarLabel: 'AuthNav',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={"#433eb6"} />;
                    },
                }}
            >
                {props => <AuthNav {...props} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default Homenav;
