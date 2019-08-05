import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import ColoredRadioForm from '../../component/ColoredRadioForm'
import PrimaryRadioForm from '../../component/PrimaryRadioForm'

import styles from '../../styles'
import {connect} from "react-redux";
import {addActivity, loadActivityQuestions, startEditing} from "../../model/controller/activityController";
import Lang from "../../localization/lang";

class protocol extends Component {
    protocol = this.props.screenProps.protocol

    state = {
        editing: false
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isEditing){
            this.setState({editing: nextProps.isEditing})
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
            actionIcon = <Image source={require('../../../assets/png/save.png')} style={{width: 25, height: 25}}/>
        else
            actionIcon = <Image source={require('../../../assets/png/edit.png')} style={{width: 22, height: 22}} />

        return (
            <View>
                <ScrollView style={[styles.centerContainer, { opacity: this.state.editing ? 1 : 0.7 }]}>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.thermoCamera}</Text>
                        <PrimaryRadioForm
                            flag={this.protocol.thermoCamera}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.thermoCamera = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>


                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.addingInhibitor}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.addingInhibitor}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.addingInhibitor = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.temperatureGauges}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.temperatureGauges}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.temperatureGauges = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.buchholzRelay}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.buchholzRelay}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.buchholzRelay = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.coolingEquipment}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.coolingEquipment}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.coolingEquipment = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.oilLevelIndicator}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.oilLevelIndicator}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.oilLevelIndicator = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.onlineMonitoring}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.onlineMonitoring}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.onlineMonitoring = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.explosionValve}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.explosionValve}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.explosionValve = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.conservator}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.conservator}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.conservator = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.corrosion}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.corrosion}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.corrosion = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <Text style={styles.dividerText}>{stringConstants.overhaul}</Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.oilLevel}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.oilLevel}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.oilLevel = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.Cleaning}</Text>
                        <PrimaryRadioForm
                            flag={this.protocol.cleaning}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.cleaning = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.drainWaterInExpansionTank}</Text>
                        <PrimaryRadioForm
                            flag={this.protocol.drainWater}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.drainWater = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.Lubrication}</Text>
                        <PrimaryRadioForm
                            flag={this.protocol.lubrication}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.lubrication = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.Bushings}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.bushings}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.bushings = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.Connections}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.connections}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.connections = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.noOilLeakage}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.noOilLeakage}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.noOilLeakage = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.coolingEquipment}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.overhaulCoolingEquipment}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.overhaulCoolingEquipment = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.tapChangerNumberOfOperations}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.valueContainer, { flex: 1 }]}>
                                <Text style={styles.valueText}>{this.protocol.tapChangerNumber}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.quantButton}
                                onPress={() => { if (this.state.editing) { this.protocol.tapChangerNumber--; this.forceUpdate() } }}>
                                <Image source={require('../../../assets/png/minus.png')} style={{ width: 18, height: 2 }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.quantButton}
                                onPress={() => { if (this.state.editing) { this.protocol.tapChangerNumber++; this.forceUpdate() } }}>
                                <Image source={require('../../../assets/png/plus.png')} style={{ width: 18, height: 18 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.keyText}>{stringConstants.transformerTestMaintenanceQuestion}</Text>
                        <ColoredRadioForm
                            flag={this.protocol.transformerTest}
                            disabled={!this.state.editing}
                            changeFlag={(flag) => { this.protocol.transformerTest = flag; this.forceUpdate() }}
                            style={styles.radioForm}
                        />
                    </View>

                    <View style={{ marginBottom: 15 }} />
                </ScrollView>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: this.state.editing ? '#4FC295' : '#2730D0' }]}
                    onPress={this.handleAction}
                >
                    {actionIcon}
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.language,
        isEditing: state.isEditing
    }
}

export default connect(mapStateToProps, { loadActivityQuestions, addActivity, startEditing })(protocol)