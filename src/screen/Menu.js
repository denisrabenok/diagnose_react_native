import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, ScrollView, Image, BackHandler, Alert, Dimensions } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import { connect } from 'react-redux'

import Lang from '../localization/lang'
import styles from '../styles'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class Menu extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activeItem: ''
    }

    componentDidMount() {
        console.log("Token", this.props.token);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if (aspectRatio > 1.6)
            this.props.navigation.addListener('didFocus', () => {
                BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
            });
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
        aspectRatio > 1.6 ?
            this.props.navigation.state.params.from === 'login'
                ? <View style={{ height: 45 }} />
                : <TouchableOpacity onPress={() => this.props.navigation.pop()

                }>
                    <Image source={require('../../assets/png/close.png')} style={[styles.closeIcon, { width: 22, height: 22 }]} />
                </TouchableOpacity> : <View style={{ height: 45 }} />
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
                    {/* <View style={[styles.menuItem, {paddingBottom: 33 }]}>
                        <TouchableOpacity style={styles.settingsLink} onPress={() => this.props.navigation.navigate('menu')}>
                            <Image source={require('../../assets/png/close.png')} style={{ width: 18, height: 18 }} />
                        </TouchableOpacity>
                    </View>  */}
                    <View style={styles.topPanel}>
                        <Text style={styles.title}>{stringConstant.menu}</Text>
                        <TouchableOpacity style={styles.settingsLink} onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.navigation.navigate('Settings', { from: '' });
                        }}>
                            <Text style={styles.settingsText}>{stringConstant.settings}</Text>
                            <Image source={require('../../assets/png/settings.png')} style={{ width: 28, height: 28 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.menuSubText, { flex: 1 }]}>{this.getCurrentStation()}</Text>
                        <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.navigation.navigate('ChooseSubstation');
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
                                        style={{ width: 24, height: 21 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 22 }]}>{visualInspection}</Text>
                                    {renderIcon('inspection')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.navigation.navigate('History');
                                    }}>
                                        <Text style={styles.expandedText}>{visualInspectionHistory}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.navigation.navigate('Planning');
                                    }}>
                                        <Text style={styles.expandedText}>{planning}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.defaultSubstation ?
                                            this.props.navigation.navigate('StartVisualInspection', { locationId: this.props.defaultSubstation })
                                            : this.props.navigation.navigate('LocationChoice')
                                        //console.warn("location: ",defaultSubstation)
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
                                        style={{ width: 26, height: 12 }} />
                                    <Text style={styles.menuItemText}>{maintenance}</Text>
                                    {renderIcon('maintenance')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.navigation.navigate('UnitChoice');
                                    }}>
                                        <Text style={styles.expandedText}>{performService}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.navigation.navigate('Activities', { isMaintenance: true });
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
                                        this.props.navigation.navigate('ScanQR', { language: this.props.language });
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
                            this.props.navigation.navigate('DocumentationOfUnits');
                        }}>
                            <View style={styles.menuItem}>
                                <Image source={require('../../assets/png/document.png')}
                                       style={{width: 19, height: 20}}/>
                                <Text style={styles.menuDocument}>{documentationOfUnits}</Text>
                            </View>
                        </TouchableOpacity> */}

                        <Collapse onToggle={() => toggleHandle('log')} isCollapsed={this.state.activeItem === 'log'}>
                            <CollapseHeader>
                                <View style={styles.menuItem}>
                                    <Image source={require('../../assets/png/book.png')}
                                        style={{ width: 22, height: 22 }} />
                                    <Text style={[styles.menuItemText, { marginLeft: 24 }]}>{logBook}</Text>
                                    {renderIcon('log')}
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.expandedItem}>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.navigation.navigate('LogBook');
                                    }}>
                                        <Text style={styles.expandedText}>{openLogBook}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.navigation.navigate('AddNewLog');
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
                                        this.props.navigation.navigate('StationList', { s: this.props.defaultSubstation });
                                    }}>
                                        <Text style={styles.expandedText}>{stationsInformation}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                                        this.props.defaultSubstation ?
                                            this.props.navigation.navigate('UnitList', { locationId: this.props.defaultSubstation })
                                            : this.props.navigation.navigate('ChooseSite')
                                        console.warn("++++++++++++++++++")
                                    }
                                    }>
                                        <Text style={styles.expandedText}>{unitsInformation}</Text>
                                    </TouchableOpacity>
                                </View>
                            </CollapseBody>
                        </Collapse>

                        <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.navigation.navigate('SiteList');
                        }}>
                            <View style={styles.menuItem}>
                                <Image source={require('../../assets/png/list.png')} style={{ width: 25, height: 18 }} />
                                <Text style={[styles.menuItemText, { marginLeft: 21 }]}>{listSubstation}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
                            this.props.navigation.navigate('SendMessage');
                        }}>
                            <View style={[styles.menuItem, { paddingBottom: 40 }]}>
                                <Image source={require('../../assets/png/message.png')}
                                    style={{ width: 26, height: 20 }} />
                                <Text style={styles.menuItemText}>{sendMessage}</Text>
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
    token: state.token,
    s: state.defaultSubstation
})

export default connect(mapStateToProps)(Menu)