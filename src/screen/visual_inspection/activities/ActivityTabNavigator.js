import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import React, { Component, View } from 'react'

import SiteInfo from './SiteInfo'
import TabInfo from './TabInfo'
import DatePicker from '../../util/DatePicker'

class Navigator extends Component {
    render() {
        activity = this.props.screenProps

        siteInfoNavigator = createStackNavigator(
            {
                SiteInfo,
                DatePicker
            },
            {
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                }
            }
        )

        tabs = {}
        for (unit in activity.answers)
            tabs[unit] = TabInfo

        const Tabs = createMaterialTopTabNavigator(
            {
                'Site Info': siteInfoNavigator,
                ...tabs
            },
            {
                tabBarOptions: {
                    scrollEnabled: true,
                    activeTintColor: '#fff',
                    inactiveTintColor: '#fff',
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
                        // borderBottomColor: "#14FFD5",
                        // borderBottomWidth: 5
                    },
                    labelStyle: {
                        fontFamily: 'SF_Pro_Semibold',
                        fontSize: 16
                    }
                }
            })

        TabNavigator = createAppContainer(Tabs)

        return (
            <TabNavigator screenProps={this.props.screenProps}>                
            </ TabNavigator>
        )
    }
}

export default Navigator