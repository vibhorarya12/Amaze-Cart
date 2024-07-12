import { Dimensions } from 'react-native';

export const theme_color = ['#cb1249', '#d23361'];
export const theme_primary = ['#FC1933', '#B00326'];

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const Screen_Width = screenWidth;
export const Screen_Height = screenHeight;

export const Window_Width = windowWidth;
export const Window_Height = windowHeight;
