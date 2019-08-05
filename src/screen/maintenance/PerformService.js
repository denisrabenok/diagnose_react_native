import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import TabNavigator from './TabNavigator'
import IconTouchable from '../../component/IconTouchable'
import styles from '../../styles'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class Activities extends Component {
    static router = TabNavigator.router

    static navigationOptions = {
        header: null
    }

    //UNCOMMENT LATER
    // inspection = this.props.navigation.getParam('maintenance')

    //MOCKED
    maintenance = {
        siteInfo: {
            unit: 'S1-T1',
            date: '10.10.2018',
            participants: 'Emil Palonto',
            gasSamples: false,
            oilSamples: true,
            comments: 'Graffiti on the door entrance to substation'
        },
        protocol: {
            thermoCamera: false,
            addingInhibitor: false,
            temperatureGauges: false,
            buchholzRelay: false,
            coolingEquipment: false,
            oilLevelIndicator: false,
            onlineMonitoring: false,
            explosionValve: false,
            conservator: false,
            corrosion: false,
            oilLevel: false,
            cleaning: false,
            drainWater: false,
            lubrication: false,
            bushings: false,
            connections: false,
            noOilLeakage: false,
            overhaulCoolingEquipment: false,
            tapChangerNumber: 0,
            transformerTest: false
        },
        documents: [
            {name: 'Document 1', url: 'doc url1'},
            {name: 'Document 2', url: 'doc url2'},
            {name: 'Document 3', url: 'doc url3'}
        ]
    }

    render() {
        return (
            <GestureRecognizer backgroundColor='#2730D0' onSwipeRight={(state) => aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')}>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <IconTouchable onPress={() => aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')} left>
                            <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                            </IconTouchable>
                            <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>Maintenance</Text></View>
                        </View>

                        <TabNavigator navigation={this.props.navigation} screenProps={this.maintenance} />

                    </SafeAreaView>
            </GestureRecognizer>
        )
    }
}

export default Activities