import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import Focus from './Focus';

const screens = {
    Home: {
        screen: Home,
    },
    // Focus: {
    //     screen: Focus,
    // },
};
const homeStack = createStackNavigator(screens);
export default createAppContainer(homeStack);
