import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { DocumentPicker } from 'react-native-document-picker'
import FileSystem from 'react-native-filesystem'
import moment from 'moment'

import ShiftScrollView from '../../../../component/ShiftScrollView'
import PrimaryRadioForm from '../../../../component/PrimaryRadioForm'
import styles from '../../../../styles'

import { connect } from 'react-redux'
import { addMaintenance } from '../../../../model/controller/maintenanceController'

class SiteInfo extends Component {
    // maintenance = this.props.screenProps1
    maintenance = this.props.screenProps

    state = {
        date: ""
    }

    componentWillMount = () => {
        console.log("MAintenance****", this.maintenance)
        unitId = this.props.navigation.getParam('unitId')
        this.setState({ unitName: this.props.units.find(unit => unit.id === unitId).name })
    }


    handleDate = (date) => {
        console.log("Date*****", date)
        this.setState({ date: date.dateString })
        this.maintenance.date = date.dateString
    }

    attachFile = async () => {
        const stringConstants = Lang[this.props.language];

        await DocumentPicker.show({ filetype: ["*/*"] }, (err, res) => {
            console.warn("err :", err, res)
            if (err || !res)
                return
            else
                if (res.type === "cancel") return;
            FileSystem.readAsStringAsync(res.uri)
                .then(data => {
                    // fix - doesnt map file
                    this.maintenance.documents.push({ name: res.fileName, data: { name: res.fileName, filepath: data } });
                    this.forceUpdate()
                })
        });
    };
    // attachFile = async () => {
    //     DocumentPicker.getDocumentAsync({}).then(fileInfo => {
    //         if (fileInfo.type === 'cancel')
    //             return
    //         else if (fileInfo.size < 10 * 8 * 1024)
    //             FileSystem.readAsStringAsync(fileInfo.uri)
    //                 .then(data => {
    //                     // fix - doesnt map file
    //                     this.maintenance.documents.push({ name: fileInfo.name, data: { name: fileInfo.name, filepath: data } });
    //                     this.forceUpdate()
    //                 })
    //         else
    //             Alert.alert('', 'File size has to be less than 10MB')
    //     })
    // }

    // handleAdd = () => {
    //     Alert.alert(
    //         'Save information',
    //         'Are you sure you want to save entered information?',
    //         [
    //             { text: 'Save', onPress: () => {
    //                 this.maintenance.date = this.state.date
    //                 this.maintenance.reporterId = this.props.userId
    //                 this.maintenance.unitId = this.props.navigation.getParam('unitId')

    //                 console.log(this.maintenance)

    //                 if (this.maintenance.date !== '') {
    //                     this.props.addMaintenance(this.props.token, this.maintenance)
    //                     aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')
    //                 }
    //                 else
    //                     Alert.alert('', 'Maintenance date cannot be empty')
    //                 } 
    //             },
    //             { text: 'Cancel', style: 'cancel' }
    //         ],
    //         { cancelable: false }
    //     )  
    // }

    defaultDate() {
        var currentDate = new Date().toLocaleDateString()
        const arrangeInOrder = moment(currentDate).format('YYYY-MM-DD')
        this.setState({ date: arrangeInOrder })
        return arrangeInOrder
    }

    render() {
        // console.log("state date ==================>", this.state.date)
        return (
            <ShiftScrollView>
                <ScrollView style={styles.centerContainer}>

                    <Text style={styles.keyText}>Unit</Text>
                    <View style={styles.valueContainer}>
                        <Text style={styles.valueText}>{this.state.unitName}</Text>
                    </View>

                    <Text style={styles.keyText}>Date</Text>
                    <View style={styles.iconInput}>
                        <TextInput style={styles.dateInput} defaultValue={this.state.date ? this.state.date : this.defaultDate()} />
                        <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => this.props.navigation.navigate('DatePicker', { handleDate: this.handleDate })}>
                            <Image source={require('../../../../../assets/png/calendar.png')} style={[styles.rightIcon, { width: 24, height: 24 }]} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.keyText}>Participants</Text>
                    <View style={styles.valueContainer}>
                        <TextInput onChangeText={text => this.maintenance.participants = text} ref={input => this.participants = input} style={styles.valueText} defaultValue={this.maintenance.participants} />
                    </View>

                    <Text style={styles.keyText}>Gas sample taken</Text>
                    <PrimaryRadioForm
                        flag={this.maintenance.gasSamples}
                        changeFlag={(flag) => { this.maintenance.gasSamples = flag; this.forceUpdate() }}
                        style={styles.radioForm}
                    />

                    <Text style={styles.keyText}>Oil sample taken</Text>
                    <PrimaryRadioForm
                        flag={this.maintenance.oilSamples}
                        changeFlag={(flag) => { this.maintenance.oilSamples = flag; this.forceUpdate() }}
                        style={styles.radioForm}
                    />

                    <Text style={styles.keyText}>Comments</Text>
                    <View style={styles.valueContainer}>
                        <TextInput onChangeText={text => this.maintenance.comments = text} ref={input => this.comments = input} defaultValue={this.maintenance.comments}
                            multiline style={[styles.valueText, { height: 90, textAlignVertical: 'top' }]} blurOnSubmit={true} multiline />
                    </View>

                    {/* <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15 }} onPress={this.attachFile}>
                        <Image source={require('../../../../../assets/png/circle_plus.png')} style={{ width: 24, height: 24 }} />
                        <Text style={styles.linkText}>Attach file</Text>
                    </TouchableOpacity>
                    {
                        this.maintenance.documents.map((file, ind) => (
                            <View key={ind} style={styles.itemContainer}>
                                <Text style={styles.valueText}>{file.name}</Text>
                            </View>
                        ))
                    } */}

                    <View style={{ marginBottom: 80 }} />

                </ScrollView>
                {/* <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#4FC295' }]}
                    onPress={this.handleAdd}
                >
                    <Image source={require('../../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity> */}
            </ShiftScrollView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    units: state.units,
    userId: state.userId
})

export default connect(mapStateToProps, { addMaintenance })(SiteInfo)