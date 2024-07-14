import { useFonts } from 'expo-font';

export default function useLoadFonts() {
    const [loaded] = useFonts({
        BonaNova_bold: require('../Fonts/BonaNovaSC-Bold.ttf'),
        BonaNova_regular: require('../Fonts/BonaNovaSC-Regular.ttf'),
        RobotoSlab_light: require('../Fonts/RobotoSlab-Light.ttf'),
        RobotoSlab_semiBold: require('../Fonts/RobotoSlab-SemiBold.ttf'),
        RobotoSlab_regular: require('../Fonts/RobotoSlab-Regular.ttf'),
    });

    return loaded;
}
