import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
const homeStack = createStackNavigator(screens);
// import Focus from './Focus';

const screens = {
    Home: {
        screen: Home,
    },
    // Focus: {
    //     screen: Focus,
    // },
};

export default createAppContainer(homeStack);
