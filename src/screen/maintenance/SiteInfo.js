import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'

import ShiftScrollView from '../../component/ShiftScrollView'
import PrimaryRadioForm from '../../component/PrimaryRadioForm'
import styles from '../../styles'
import { connect } from 'react-redux'
import {addActivity, loadActivityQuestions, startEditing} from "../../model/controller/activityController";
import Lang from '../../localization/lang'

class SiteInfo extends Component {
    siteInfo = this.props.screenProps.siteInfo;

    state = {
        editing: false,
        date: this.siteInfo.date
    }

    handleDate = (date) => this.setState({ date: date.day + '.' + date.month + '.' + date.year })

    componentWillReceiveProps(nextProps){
        if(nextProps.isEditng){
            this.setState({editing: nextProps.isEditng})
        }
    }

    handleAction = () => {
        const stringConstants  = Lang[this.props.language]

        this.props.startEditing();

        if (this.state.editing) {
            Alert.alert(
                stringConstants.saveInformation,
                stringConstants.areYouSureYouWantToSave,
                [
                    { text: stringConstants.save, onPress: () => this.setState({ editing: !this.state.editing }) },
                    { text: stringConstants.cancel, style: 'cancel' }
                ],
                { cancelable: false }
            )
        }
        else
            this.setState({ editing: !this.state.editing })
    }

    render() {
        const stringConstants  = Lang[this.props.language]

        let actionIcon
        if (this.state.editing)
            actionIcon = <Image source={require('../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
        else
            actionIcon = <Image source={require('../../../assets/png/edit.png')} style={{ width: 22, height: 22 }} />

        return (
            <ShiftScrollView>
                <ScrollView style={[styles.centerContainer, { opacity: this.state.editing ? 1 : 0.7 }]}>

                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.unit}</Text>
                    <View style={styles.valueContainer}>
                        <TextInput editable={this.state.editing} style={styles.valueText} defaultValue={this.siteInfo.unit} />
                    </View>

                    <Text style={styles.keyText}>{stringConstants.date}</Text>
                    <View style={styles.iconInput}>
                        <TextInput style={styles.dateInput} defaultValue={this.state.date} />
                        <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => this.props.navigation.navigate('DatePicker', { handleDate: this.handleDate })} disabled={!this.state.editing}>
                        <Image source={require('../../../assets/png/calendar.png')} style={[styles.rightIcon, {width: 24, height: 24}]} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.keyText}>{stringConstants.participants}</Text>
                    <View style={styles.valueContainer}>
                        <TextInput editable={this.state.editing} style={styles.valueText} defaultValue={this.siteInfo.participants} />
                    </View>

                    <Text style={styles.keyText}>{stringConstants.gasSamplesTaken}</Text>
                    <PrimaryRadioForm
                        flag={this.siteInfo.gasSamples}
                        disabled={!this.state.editing}
                        changeFlag={(flag) => { this.siteInfo.gasSamples = flag; this.forceUpdate() }}
                        style={styles.radioForm}
                    />

                    <Text style={styles.keyText}>{stringConstants.oilSamplesTaken}</Text>
                    <PrimaryRadioForm
                        flag={this.siteInfo.oilSamples}
                        disabled={!this.state.editing}
                        changeFlag={(flag) => { this.siteInfo.oilSamples = flag; this.forceUpdate() }}
                        style={styles.radioForm}
                    />
                    
                    <Text style={styles.keyText}>{stringConstants.comments}</Text>
                    <View style={styles.valueContainer}>
                        <TextInput editable={this.state.editing} defaultValue={this.siteInfo.comments}
                            multiline style={[styles.valueText, { height: 90, textAlignVertical: 'top' }]} blurOnSubmit={true} multiline />
                    </View>

                    <View style={{ marginBottom: 40 }} />

                </ScrollView>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: this.state.editing ? '#4FC295' : '#2730D0' }]}
                    onPress={this.handleAction}
                >
                    {actionIcon}
                </TouchableOpacity>
            </ShiftScrollView>
        )
    }
}


mapStateToProps = state => {
    return {
        language: state.language,
        isEditng: state.isEditng
    }
}

export default connect(mapStateToProps, { loadActivityQuestions, addActivity, startEditing })(SiteInfo)