import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'

import SiteInfo from './SiteInfo'
import Protocol from './Protocol'
import Documents from './Documents'

const Tabs = createMaterialTopTabNavigator(
    {
        'Site info': SiteInfo,
        'Protocol': Protocol,
        'Documents': Documents
    },
    {
        tabBarOptions: {
            scrollEnabled: true,
            activeTintColor: '#fff',
            inactiveTintColor: '#91B6FB',
            style: {
                backgroundColor: '#2730D0',
            },
            indicatorStyle: {
                backgroundColor: '#fff',
                borderBottomColor: "#14FFD5",
                borderBottomWidth: 5
            },
            tabStyle: {
                height: 50,
                width: 140,
                // borderBottomColor: '#14FFD5',
                // borderBottomWidth: 5
            },
            labelStyle: {
                fontFamily: 'SF_Pro_Semibold',
                fontSize: 16
            }
        }
    })


export default createAppContainer(Tabs)