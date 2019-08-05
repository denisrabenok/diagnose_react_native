import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert, Dimensions } from 'react-native'
import {DocumentPicker} from 'react-native-document-picker'
import ShiftScrollView from '../../../component/ShiftScrollView'
import styles from '../../../styles'
import DocumentPanel from './DocumentPanel'

import { connect } from 'react-redux'
import { addActivity } from '../../../model/controller/activityController'
import Lang from '../../../localization/lang'
import moment from 'moment'
//import console = require('console');

class SiteInfo extends Component {
    activity = this.props.screenProps.activity

    state = {
        date: ''
    }

    handleDate = (date) => {
        date = date.dateString
        this.activity.date = date
        this.props.screenProps.activity.date = date
        this.props.screenProps.date.date = date
        // console.log("*******Visual", date)
        // console.log(this.props.screenProps.activity)
        this.setState({ date: date })
    }

    handleAction = () => {
        const stringConstants = Lang[this.props.language];

        // Alert.alert(
        //     stringConstants.saveInformation,
        //     stringConstants.areYouSureYouWantToSave,
        //     [
        //         {
        //             text: stringConstants.save, onPress: () => {
        //                 this.activity.date = this.state.date

        //                 if (this.activity.date === '')
        //                     Alert.alert('', stringConstants.dateFieldCannotBeEmpty)
        //                 else {
        //                     this.props.screenProps.addActivity()
        //                     Alert.alert('', stringConstants.saved, [{
        //                         text: 'Ok', onPress: () => this.props.screenProps.navigation.navigate('Menu')
        //                     }])
        //                 }
        //             }
        //         },
        //         { text: stringConstants.cancel, style: 'cancel' }
        //     ],
        //     { cancelable: false }
        // )
        Alert.alert(
            stringConstants.saveInformation,
            stringConstants.areYouSureYouWantToSave,
            [
                {
                    text: stringConstants.save, onPress: () => {
                        this.activity.date = this.state.date

                        if (this.activity.date === '')
                            // Alert.alert('', stringConstants.dateFieldCannotBeEmpty)
                            console.log('', stringConstants.dateFieldCannotBeEmpty)
                        else {
                            this.props.screenProps.addActivity()
                            // Alert.alert('', stringConstants.saved, [{
                            //     text: 'Ok', onPress: () => this.props.screenProps.navigation.navigate('Menu')
                            // }])
                            console.log('', stringConstants.saved, [{
                                text: 'Ok', onPress: () => this.props.screenProps.navigation.navigate('Menu')
                                 }])
                        }
                    }, style: 'cancel'
                },
                { text: stringConstants.cancel, style: 'cancel' }
            ],
            { cancelable: false }
        );
    }

    defaultDate() {
        var currentDate = new Date().toLocaleDateString()
        const arrangeInOrder = moment(currentDate).format('YYYY-MM-DD')
        this.setState({ date: arrangeInOrder })
        return arrangeInOrder
    }

    render() {
        const stringConstants = Lang[this.props.language];

        return (
            <ShiftScrollView style={{ height: Dimensions.get('window').height - 110 }}>
                <ScrollView style={[styles.centerContainer, styles.regularTMargin]}>
                    <Text style={styles.keyText}>{stringConstants.date}</Text>
                    <View style={styles.iconInput}>
                        <TextInput style={styles.dateInput} defaultValue={this.state.date ? this.state.date : this.defaultDate()} />
                        <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => { this.props.navigation.navigate('DatePicker', { handleDate: this.handleDate }) }}>
                            <Image source={require('../../../../assets/png/calendar.png')} style={[styles.rightIcon, { width: 24, height: 24 }]} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.keyText}>{stringConstants.participants}</Text>
                    <View style={styles.valueContainer}>
                        <TextInput style={styles.valueText} editable={this.state.editing} onChangeText={text => this.activity.participants = text} />
                    </View>
                    <Text style={styles.keyText}>{stringConstants.comments}</Text>
                    <View style={styles.valueContainer}>
                        <TextInput multiline style={[styles.valueText, { height: 90, textAlignVertical: 'top' }]}
                            blurOnSubmit={true} multiline editable={this.state.editing} onChangeText={text => this.activity.comments = text} />
                    </View>

                    <View style={{ marginBottom: 40 }} />
                </ScrollView>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#4FC295' }]}
                    onPress={this.handleAction}
                >
                    <Image source={require('../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </ShiftScrollView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    language: state.language,

})

export default connect(mapStateToProps, { addActivity })(SiteInfo)