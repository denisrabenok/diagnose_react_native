import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native'

import ActivityTabNavigator from './ActivityTabNavigator'
import IconTouchable from '../../../component/IconTouchable'

import styles from '../../../styles'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'

import { connect } from 'react-redux'
import { loadActivityDetails, endEditing } from '../../../model/controller/activityController'
import { loadMaintenanceDetails } from '../../../model/controller/maintenanceController'
import { ACTIVITY_TYPE } from '../../../model/constants'

import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class Activities extends Component {
    static router = ActivityTabNavigator.router

    state = {
        loading: true
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount = () => {
        console.log('entered activity details')
        this.activity = this.props.navigation.getParam('activity')
        console.log(this.activity)
        if (this.activity.type === ACTIVITY_TYPE[1])
            this.props.loadActivityDetails(this.props.token, this.activity.id, this.props.language)
            .then(() => {this.setState({ loading: false }); console.log(this.props.activityDetails)})
            .catch(error => console.log(error))

        else if (this.activity.type === ACTIVITY_TYPE[2]) {
            this.props.loadMaintenanceDetails(this.props.token, this.activity, this.props.language).then(() => this.setState({ loading: false }))
        }
        console.log('exit activity details')
    }

    _goBack(){
        this.props.endEditing()
        this.props.navigation.pop()


    }

    render() {
        const { activities } = Lang[this.props.language]
        const stringConstants = Lang[this.props.language]
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this._goBack()} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>{activities}</Text></View>
                    </View>

                    <PrimaryLoadingView loading={this.state.loading}>
                        {!this.state.loading && this.props.activityDetails !== undefined && <ActivityTabNavigator navigation={this.props.navigation} screenProps={this.props.activityDetails} />}
                        { this.props.activityDetails === undefined && <Text style={[styles.dividerText, { marginTop: 20, marginLeft: 20 }]}>{stringConstants.visualInspectionUnavailable}</Text> }
                    </PrimaryLoadingView>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        language: state.language,
        activityDetails: state.activityDetails,
    }
}

export default connect(mapStateToProps, { loadActivityDetails, loadMaintenanceDetails, endEditing })(Activities)