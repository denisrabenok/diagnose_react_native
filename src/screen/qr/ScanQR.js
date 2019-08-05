import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import BarcodeScanner from 'react-native-barcodescanner'
// import Permissions from 'react-native-permissions'
import { PermissionsAndroid, Platform } from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../styles'
import IconTouchable from '../../component/IconTouchable'

import Lang from '../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
import { connect } from 'react-redux'
class ScanQR extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        hasCameraPermission: null,
        data: null,
        language: 'EN',
        torchMode: 'off',
        cameraType: 'back',
    }

    componentWillMount() {
        // this.setState({ language: this.props.navigation.getParam('language') })
        this.setState({ language: this.props.language })
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.warn('You can use the camera');
                this.setState({ hasCameraPermission: true });
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async componentDidMount() {
        this.requestCameraPermission();
    }

    handleScan = ({ type, data }) => this.setState({ data: data }) //TODO get information from link

    render() {
        const { hasCameraPermission } = this.state
        const { qrCode, siteInformation, lastActivities, plannedActivities } = Lang[this.state.language]

        if (hasCameraPermission === null)
            return <Text>Requesting for camera permission</Text>
        if (hasCameraPermission === false)
            return <Text>No access to camera</Text>


        if (this.state.data) return (
            <GestureRecognizer backgroundColor='#2730D0' onSwipeRight={(state) => aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')}>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')} left>
                            <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>{qrCode}</Text></View>
                    </View>

                    <TouchableOpacity
                        style={styles.itemPanel}
                        onPress={() => this.props.navigation.navigate('StationsInformation', { documents: this.state.data.siteInformation, language: this.props.language })}>
                        <Text style={styles.valueText}>{siteInformation}</Text>
                        <View><Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemPanel}
                        onPress={() => this.props.navigation.navigate('Activities', { documents: this.state.data.lastActivities, from: 'qr' })}>
                        <Text style={styles.valueText}>{lastActivities}s</Text>
                        <View><Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemPanel}
                        onPress={() => this.props.navigation.navigate('Planning', { documents: this.state.data.plannedActivities })}>
                        <Text style={styles.valueText}>{plannedActivities}</Text>
                        <View><Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ margin: 10 }} onPress={() => this.props.navigation.navigate('StartVisualInspection')}><Text style={styles.linkText}>+ Add visual inspection</Text></TouchableOpacity>

                </SafeAreaView>
            </GestureRecognizer>
        )
        else return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')} style={{ position: 'absolute', top: 50, left: 20, zIndex: 100 }}>
                    <Image source={require('../../../assets/png/close.png')} style={{ width: 22, height: 22 }} />
                </TouchableOpacity>

                <BarcodeScanner
                    onBarCodeRead={this.handleScan}
                    // style={StyleSheet.absoluteFill}
                    style={{ flex: 1 }}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}
                />
            </View>
        )
    }
}
mapStateToProps = state => ({
    language: state.language   
})

export default connect(mapStateToProps)(ScanQR)