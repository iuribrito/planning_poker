import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Hall from './pages/Hall';
import Room from './pages/Room';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createSwitchNavigator({
        Profile,
        Room,
        Hall, 
    })
);

export default Routes;