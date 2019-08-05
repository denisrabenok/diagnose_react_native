import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native'

import TabNavigator from './TabNavigator'
import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadActivityQuestions, addActivity } from '../../../model/controller/activityController'

import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class StartVisualInspection extends Component {
    static router = TabNavigator.router

    static navigationOptions = {
        header: null
    }

    state = {
        ready: false
    }

    activity = {
        date: '',
        comments: '',
        participants: '',
        location: aspectRatio>1.6?this.props.navigation.getParam('locationId'):this.props.defaultSubstation,
        locationName: aspectRatio>1.6?this.props.locations.find(location => location.id == this.props.navigation.getParam('locationId')).name:this.props.locations.find(location => location.id == this.props.defaultSubstation).name,
        answers: {},
        attachments: []
    }

    render() {
        console.warn("here start ***********************************")
        this.activity = {
            date: '',
            comments: '',
            participants: '',
            location: aspectRatio>1.6?this.props.navigation.getParam('locationId'):this.props.defaultSubstation,
            locationName: aspectRatio>1.6?this.props.locations.find(location => location.id == this.props.navigation.getParam('locationId')).name:this.props.locations.find(location => location.id == this.props.defaultSubstation).name,
            answers: {},
            attachments: []
        }
        const { startVisualInspection } = Lang[this.props.language]
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        {aspectRatio>1.6?
                        <IconTouchable onPress={() => this.props.navigation.pop()

} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>:null
                        }
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>{startVisualInspection}</Text></View>
                    </View>

                    <TabNavigator
                        navigation={this.props.navigation}
                        screenProps={this.activity}
                        addActivity={() => { console.log(this.activity); this.props.addActivity(this.props.token, this.activity) }}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        companyId: state.companyId,
        language: state.language,
        activityQuestions: state.activityQuestions,
        locations: state.childLocations,
        units: state.units,
        defaultSubstation: state.defaultSubstation,
        locationId: state.defaultSubstation
    }
}

export default connect(mapStateToProps, { loadActivityQuestions, addActivity })(StartVisualInspection)