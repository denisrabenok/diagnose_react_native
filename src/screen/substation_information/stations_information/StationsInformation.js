import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image,BackHandler, Dimensions } from 'react-native'

import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class StationsInformation extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount = () => {
        this.setState({ defaultId:this.props.navigation.getParam('defaultId',''),station: this.props.navigation.getParam('station'), language: this.props.navigation.getParam('language') })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        if(this.state.defaultId==''){
            this.props.navigation.pop()

;
        }else{
            aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History');
        }
        return true;
    }

    render() {
        const { stationInformation } = Lang[this.state.language];
        const stringConstants = Lang[this.state.language];

        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                    <SafeAreaView style={styles.grayContainer}>
                        <View style={styles.header}>
                            {aspectRatio>1.6?
                            <IconTouchable onPress={() => {
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                if(this.state.defaultId==''){
                                    this.props.navigation.pop()


                                }else{
                                    aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')
                                }
                            }} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                            </IconTouchable>:<View></View>}
                            <Text style={styles.headerTextLeft}>{stationInformation}</Text>
                            <View />
                        </View>

                        <ScrollView style={styles.centerContainer}>
                            <View style={{ marginBottom: 15 }} />

                            <View style={styles.panel}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.stationId}:</Text>
                                    <Text style={styles.valueText}>{this.state.station.stationId}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.area}:</Text>
                                    <Text style={styles.valueText}>{this.state.station.area}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.city}:</Text>
                                    <Text style={styles.valueText}>{this.state.station.city}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.address}:</Text>
                                    <Text style={styles.valueText}>{this.state.station.address}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.systemVoltage} 1:</Text>
                                    <Text style={styles.valueText}>{this.state.station.systemVoltage1}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.systemVoltage} 2:</Text>
                                    <Text style={styles.valueText}>{this.state.station.systemVoltage2}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.systemVoltage} 3:</Text>
                                    <Text style={styles.valueText}>{this.state.station.systemVoltage3}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>QR:</Text>
                                    <Text style={styles.valueText}>{this.state.station.qr}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>{stringConstants.other}:</Text>
                                    <Text style={styles.valueText}>{this.state.station.other}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.itemPanel, { marginTop: 10, borderTopWidth: 1, borderTopColor: '#E5E5E5' }]}
                                onPress={() => this.props.navigation.navigate('StationDocuments', { documents: this.state.station.documents })}>
                                <Text style={styles.valueText}>{stringConstants.Documents}</Text>
                                <View><Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.itemPanel}
                                onPress={() => this.props.navigation.navigate('StationContact', { contact: this.state.station.contact })}>
                                <Text style={styles.valueText}>{stringConstants.Contact}</Text>
                                <View><Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                            </TouchableOpacity>

                            <View style={{ marginBottom: 25 }} />
                        </ScrollView>
                    </SafeAreaView>
            </View>
        )
    }
}

export default StationsInformation