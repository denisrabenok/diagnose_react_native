import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Dimensions } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import PrimaryLoadingView from '../../component/PrimaryLoadingView'
import styles from '../../styles'

import { connect } from 'react-redux'
import { loadActivities } from '../../model/controller/activityController'

import ExpansionPanel from '../../component/ExpansionPanel'
import IconTouchable from '../../component/IconTouchable'

import Lang from '../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class History extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activities: [],
        searching: false,
        search: '',
        loading: true
    }

    componentWillMount = () => {
        let fromScreen = this.props.navigation.getParam('from')
        if (aspectRatio > 1.6) {
            if (fromScreen === 'chooseSubstation' || fromScreen === 'login')
                this.leftIcon = (
                    <IconTouchable onPress={() => aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')} left>
                        <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                    </IconTouchable>
                )
            else this.leftIcon = (
                <IconTouchable onPress={() => this.props.navigation.pop()

                } left>
                    <Image source={require('../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                </IconTouchable>
            )
        }
        if (aspectRatio < 1.6) {
            var isMaintenance = this.props.isMaintenance
            this.setState({ isMaintenance });
        };
        //console.warn("isMaintenance: ", isMaintenance)
        isMaintenance = this.props.navigation.getParam('isMaintenance')
        this.props.loadActivities(this.props.token, this.props.companyId, isMaintenance, this.props.defaultSubstation)
            .then(() => this.setState({ activities: this.props.activities, loading: false }))
    }

    componentDidUpdate = () => {
        console.warn("Target: ", this.props.target);
        // this.props.dispatch({
        //     type: "NAVIGATE",
        //     target: this.props.target
        // })
        if (this.props.target)
            this.props.navigation.navigate(this.props.target);
    }

    handleSearch = () => {
        query = this.state.search
        filteredActivities = this.props.activities
            .filter(activity => activity.type.includes(query) || activity.unit.includes(query) || activity.site.includes(query)
                || activity.stationId.includes(query) || activity.area.includes(query)
                || activity.responsible.includes(query) || activity.participants.includes(query)
                || activity.comments.includes(query))
        this.setState({ activities: filteredActivities })
    }

    showActivity = activity => {
        this.props.navigation.navigate('ActivityDetails', { activity })
    }

    render() {
        const { visualInspectionHistory, maintenanceHistory } = Lang[this.props.language];
        const stringConstant = Lang[this.props.language];
        return (
            <GestureRecognizer backgroundColor='#2730D0'
                onSwipeRight={(state) => aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')}>
                <SafeAreaView backgroundColor='#2730D0'></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>

                    <View>
                        {
                            this.state.searching ?
                                (
                                    <View style={styles.searchBar}>
                                        <IconTouchable onPress={() => this.setState({
                                            searching: false,
                                            search: ''
                                        }, this.handleSearch)} left>
                                            <Image source={require('../../../assets/png/search_back.png')}
                                                style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>

                                        <View style={styles.searchWrapper}><TextInput style={styles.searchInput}
                                            placeholder={stringConstant.typeHere + '...'}
                                            autoFocus returnKeyType='search'
                                            onChangeText={text => this.setState({ search: text }, this.handleSearch)} /></View>

                                        <IconTouchable onPress={this.handleSearch} right>
                                            <Image source={require('../../../assets/png/search_black.png')}
                                                style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                ) : (aspectRatio > 1.6 ? (
                                    <View>
                                        <View style={styles.header}>
                                            <IconTouchable onPress={() => aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')} left>
                                                <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                                            </IconTouchable>
                                            <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                                <Image source={require('../../../assets/png/search.png')}
                                                    style={{ width: 24, height: 24 }} />
                                            </IconTouchable>
                                        </View>
                                        <Text style={{
                                            fontFamily: 'SF_Pro_Text',
                                            fontSize: 34,
                                            color: '#fff',
                                            backgroundColor: '#2730D0',
                                            paddingLeft: 20
                                        }}>{this.props.navigation.getParam('isMaintenance') ? maintenanceHistory : visualInspectionHistory}</Text>
                                    </View>
                                ) : (
                                        <View style={styles.header}>
                                            {this.leftIcon}
                                            <Text style={{
                                                fontFamily: 'SF_Pro_Text',
                                                fontSize: 34,
                                                color: '#fff',
                                            }}>{this.state.isMaintenance ? maintenanceHistory : visualInspectionHistory}</Text>
                                            <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                                <Image source={require('../../../assets/png/search.png')}
                                                    style={{ width: 24, height: 24 }} />
                                            </IconTouchable>
                                        </View>
                                    ))
                        }
                    </View>
                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView style={{
                            padding: bigSpacing,
                            paddingBottom: 0,
                            paddingTop: 0, backgroundColor: '#2730D0'
                        }}>
                            {/* {aspectRatio > 1.6 ? <View style={{
                                backgroundColor: '#2730D0',
                            }}>
                                <Text style={{
                                    fontFamily: 'SF_Pro_Text',
                                    fontSize: 34,
                                    color: '#fff',
                                }}>{this.props.navigation.getParam('isMaintenance') ? maintenanceHistory : visualInspectionHistory}</Text>
                            </View> : null} */}
                            <View style={{ marginBottom: 15 }} />
                            {
                                this.state.activities.map((activity, ind) => {
                                    if (aspectRatio > 1.6 ? this.props.navigation.getParam('isMaintenance') : this.state.isMaintenance) {
                                        return <ExpansionPanel language={this.props.language} key={ind} activity={activity}
                                            handlePress={() => this.showActivity(activity)} />
                                    }
                                    else {
                                        if (activity.type != 'Maintenance') {
                                            return <ExpansionPanel language={this.props.language} key={ind} activity={activity}
                                                handlePress={() => this.showActivity(activity)} />
                                        }

                                    }
                                })
                            }
                            <View style={{ marginBottom: 20 }} />
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </GestureRecognizer >
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        companyId: state.companyId,
        target: state.target,
        activities: state.activities,
        language: state.language,
        defaultSubstation: state.defaultSubstation,
        isMaintenance: state.isMaintenance
    }
}

export default connect(mapStateToProps, { loadActivities })(History)