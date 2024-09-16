import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const FontContext = createContext({})

export function FontProvider({ children }) {

    const [loaded, error] = useFonts({
        thin: require('../../assets/fonts/AlegreyaSans-ThinItalic.ttf'),
        black: require('../../assets/fonts/AlegreyaSans-Black.ttf'),
        black_italic: require('../../assets/fonts/AlegreyaSans-BlackItalic.ttf'),
        bold: require('../../assets/fonts/AlegreyaSans-Bold.ttf'),
        bold_italic: require('../../assets/fonts/AlegreyaSans-BoldItalic.ttf'),
        bold_extra: require('../../assets/fonts/AlegreyaSans-ExtraBold.ttf'),
        bold_extra_italic: require('../../assets/fonts/AlegreyaSans-ExtraBoldItalic.ttf'),
        italic: require('../../assets/fonts/AlegreyaSans-Italic.ttf'),
        light: require('../../assets/fonts/AlegreyaSans-Light.ttf'),
        light_italic: require('../../assets/fonts/AlegreyaSans-LightItalic.ttf'),
        medium: require('../../assets/fonts/AlegreyaSans-Medium.ttf'),
        medium_italic: require('../../assets/fonts/AlegreyaSans-MediumItalic.ttf'),
        regular: require('../../assets/fonts/AlegreyaSans-Regular.ttf'),
    });

    if (!loaded && !error) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, marginTop: 15}}>CARREGANDO..</Text>
                <ActivityIndicator size={30} color="#202020" />
            </View>
        );
    }

    return <FontContext.Provider value={{loaded}}>{children}</FontContext.Provider>;


    return (
        <FontContext.Provider value={{}}>
            {children}
        </FontContext.Provider>
    );
}

export function useFont() {
    const context = useContext(FontContext)
    if (!context) {
        throw new Error('useFont must be used within a FontProvider')
    }
    return context;
}