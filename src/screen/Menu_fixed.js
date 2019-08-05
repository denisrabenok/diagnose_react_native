import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, ScrollView, Image, BackHandler, Alert, Dimensions } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom';
import { NAVIGATE } from '../model/actionTypes'
import Lang from '../localization/lang'
import styles from '../styles'

class Menu_fixed extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activeItem: ''
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        const stringConstants = Lang[this.props.language];

        Alert.alert(
            stringConstants.exitApp,
            stringConstants.doYouWantToExit,
            [
                { text: stringConstants.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: stringConstants.yes, onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    renderCloseButton = () => {
        return (
            <View style={{ height: 45 }} />
        )
    }

    getCurrentStation = () => {
        const stringConstant = Lang[this.props.language];

        if (this.props.childLocations && this.props.defaultSubstation)
            return stringConstant.defaultSubstation + ': ' + this.props.childLocations.find(location => location.id == this.props.defaultSubstation).name
        else
            return stringConstant.noDefaultSubstation
    }

    render() {
        const toggleHandle = (sectionName) => {
            this.state.activeItem === sectionName ?
                this.setState({ fontLoaded: this.state.fontLoaded, activeItem: '' }) :
                this.setState({ fontLoaded: this.state.fontLoaded, activeItem: sectionName })
        }
        const renderIcon = (sectionName) => {
            return this.state.activeItem === sectionName ?
                (<Image source={require('../../assets/png/expanded.png')} style={{ width: 13, height: 7 }} />) :
                (<Image source={require('../../assets/png/not_expanded.png')} style={{ width: 13, height: 7 }} />)
        }

        const {
            visualInspection,
            visualInspectionHistory,
            planning,
            startVisualInspection,
            maintenance,
            maintenanceHistory,
            performService,
            qrCode,
            scanQrCode,
            newQrCode,
            logBook,
            openLogBook,
            addNewLog,
            substationInformation,
            stationsInformation,
            unitsInformation,
            listSubstation,
            sendMessage,
            documentationOfUnits
        } = Lang[this.props.language];

        const stringConstant = Lang[this.props.language];

        return (
            <ScrollView style={styles.menuContainer}>
                <StatusBar barStyle="light-content" />
                <View>
                    {this.renderCloseButton()}
                    <View style={styles.topPanel}>
                        <Text style={styles.title}>{stringConstant.menu}</Text>
                        <TouchableOpacity style={styles.settingsLink} onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            // this.props.navigation.navigate('Settings', { from: '' });
                            this.props.dispatch({
                                type: NAVIGATE,
                                target: "Settings"
                            })

                        }}>
                            <Text style={styles.settingsText}>{stringConstant.settings}</Text>
                            <Image source={require('../../assets/png/settings.png')} style={{ width: 28, height: 28 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.menuSubText, { flex: 1 }]}>{this.getCurrentStation()}</Text>
                        <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            // this.props.navigation.navigate('ChooseSubstation');
                            this.props.dispatch({
                                type: NAVIGATE,
                                target: "ChooseSubstation"
                            })
                        }}>
                            <Text style={[{ marginRight: 10 }, styles.menuSubText]}>{stringConstant.change}</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.menu}>

                        <Collapse onToggle={() => toggleHandle('inspection')}
                            isCollapsed={this.state.activeItem === 'inspection'}>
                            <CollapseHeader>
                                <View style={styles.menuItem}>
                                    <Image source={require('../../assets/png/inspection.png')}
                                        style={{ width: 22, height: 20 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{visualInspection}</Text>
                                    {renderIcon('inspection')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "History"
                                        });
                                    }}>
                                        <Text style={styles.expandedText}>{visualInspectionHistory}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "Planning"
                                        });
                                    }}>
                                        <Text style={styles.expandedText}>{planning}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.defaultSubstation ?
                                            this.props.dispatch({
                                                type: NAVIGATE,
                                                target: "StartVisualInspection"
                                            })
                                            :
                                            this.props.dispatch({
                                                type: NAVIGATE,
                                                target: "LocationChoice"
                                            })
                                    }}>
                                        <Text style={styles.expandedText}>{startVisualInspection}</Text>
                                    </TouchableOpacity>
                                </View>
                            </CollapseBody>
                        </Collapse>

                        <Collapse onToggle={() => toggleHandle('maintenance')}
                            isCollapsed={this.state.activeItem === 'maintenance'}>
                            <CollapseHeader>
                                <View style={styles.menuItem}>
                                    <Image source={require('../../assets/png/maintenance.png')}
                                        style={{ width: 24, height: 12 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{maintenance}</Text>
                                    {renderIcon('maintenance')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "UnitChoice"
                                        })
                                    }}>
                                        <Text style={styles.expandedText}>{performService}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "Activities"
                                        })
                                    }}>
                                        <Text style={styles.expandedText}>{maintenanceHistory}</Text>
                                    </TouchableOpacity>
                                </View>
                            </CollapseBody>
                        </Collapse>

                        <Collapse onToggle={() => toggleHandle('qr')} isCollapsed={this.state.activeItem === 'qr'}>
                            <CollapseHeader>
                                <View style={styles.menuItem}>
                                    <Image source={require('../../assets/png/qr.png')} style={{ width: 24, height: 28 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{qrCode}</Text>
                                    {renderIcon('qr')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "ScanQR"
                                        })
                                    }}>
                                        <Text style={styles.expandedText}>{scanQrCode}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.expandedText}>{newQrCode}</Text>
                                    </TouchableOpacity>
                                </View>
                            </CollapseBody>
                        </Collapse>

                        {/* <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.dispatch({
                                type: NAVIGATE,
                                target: "DocumentationOfUnits"
                            })
                        }}>
                            <View style={styles.menuItem}>
                                <Image source={require('../../assets/png/document.png')}
                                    style={{ width: 20, height: 20 }} />
                                <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{documentationOfUnits}</Text>
                            </View>
                        </TouchableOpacity> */}

                        <Collapse onToggle={() => toggleHandle('log')} isCollapsed={this.state.activeItem === 'log'}>
                            <CollapseHeader>
                                <View style={styles.menuItem}>
                                    <Image source={require('../../assets/png/book.png')}
                                        style={{ width: 22, height: 22 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{logBook}</Text>
                                    {renderIcon('log')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "LogBook"
                                        })
                                    }}>
                                        <Text style={styles.expandedText}>{openLogBook}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "AddNewLog"
                                        })
                                    }}>
                                        <Text style={styles.expandedText}>{addNewLog}</Text>
                                    </TouchableOpacity>
                                </View>
                            </CollapseBody>
                        </Collapse>

                        <Collapse onToggle={() => toggleHandle('substation')}
                            isCollapsed={this.state.activeItem === 'substation'}>
                            <CollapseHeader>
                                <View style={styles.menuItem}>
                                    <Image source={require('../../assets/png/info.png')}
                                        style={{ width: 24, height: 24 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{substationInformation}</Text>
                                    {renderIcon('substation')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.dispatch({
                                            type: NAVIGATE,
                                            target: "StationList"
                                        })
                                    }}>
                                        <Text style={styles.expandedText}>{stationsInformation}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.defaultSubstation ?
                                            this.props.dispatch({
                                                type: NAVIGATE,
                                                target: "UnitList"
                                            }) :
                                            this.props.dispatch({
                                                type: NAVIGATE,
                                                target: "ChooseSite"
                                            })
                                    }
                                    }>
                                        <Text style={styles.expandedText}>{unitsInformation}</Text>
                                    </TouchableOpacity>
                                </View>
                            </CollapseBody>
                        </Collapse>

                        <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.dispatch({
                                type: NAVIGATE,
                                target: "SiteList"
                            })
                        }}>
                            <View style={styles.menuItem}>
                                <Image source={require('../../assets/png/list.png')} style={{ width: 25, height: 18 }} />
                                <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{listSubstation}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.dispatch({
                                type: NAVIGATE,
                                target: "SendMessage"
                            })
                        }}>
                            <View style={styles.menuItem}>
                                <Image source={require('../../assets/png/message.png')}
                                    style={{ width: 26, height: 20 }} />
                                <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{sendMessage}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

mapStateToProps = state => ({
    defaultSubstation: state.defaultSubstation,
    language: state.language,
    childLocations: state.childLocations,
    locationId: state.defaultSubstation,
    s: state.defaultSubstation
})

export default connect(mapStateToProps)(Menu_fixed)