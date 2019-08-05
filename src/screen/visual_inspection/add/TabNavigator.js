import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import React, { Component } from 'react'

import SiteInfo from './SiteInfo'
import TabInfo from './TabInfo'
import AttachDocument from './AttachDocument'
import DatePicker from '../../util/DatePicker'

import { connect } from 'react-redux'

class Navigator extends Component {

    componentWillMount = () => {
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
        tabs[this.props.screenProps.locationName] = TabInfo

        if (this.props.defaultSubstation) {
            this.props.units.filter(unit => unit.locationId === this.props.defaultSubstation).map(unit => tabs[unit.name] = TabInfo)
        } else {
            this.props.units.filter(unit => unit.locationId === this.props.screenProps.location).map(unit => tabs[unit.name] = TabInfo)
        }

        this.tabs = createMaterialTopTabNavigator(
            {
                'Site Info': siteInfoNavigator,
                ...tabs,
                'Attachment': AttachDocument
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
    };

    render() {
        TabNavigator = createAppContainer(this.tabs);

        return (
            <TabNavigator screenProps={{
                activity: this.props.screenProps,
                navigation: this.props.navigation,
                addActivity: this.props.addActivity,
                date: { date: '' }
            }} />
        )
    }
}

mapStateToProps = state => {
    return {
        units: state.units,
        defaultSubstation: state.defaultSubstation
    }
}

export default connect(mapStateToProps)(Navigator)