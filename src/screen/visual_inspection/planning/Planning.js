import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Dimensions } from 'react-native'

import Panel from './Panel'
import IconTouchable from '../../../component/IconTouchable'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'
import styles from '../../../styles'

import { connect } from 'react-redux'
import { loadPlannedActivities } from '../../../model/controller/activityController'

import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class Planning extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activities: [],
        searching: false,
        search: '',
        loading: true
    }

    handleSearch = () => {
        query = this.state.search
        filteredActivities = this.props.activities
            .filter(activity => activity.type.includes(query) || activity.unit.includes(query))
        this.setState({ activities: filteredActivities })
    }

    componentWillMount = () => {
        this.props.loadPlannedActivities(this.props.token, this.props.companyId, this.props.defaultSubstation)
            .then(() => this.setState({ activities: this.props.activities, loading: false }))
    }

    render() {
        const { planning } = Lang[this.props.language]
        const stringConstants = Lang[this.props.language]
        return (

            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>


                    <View>
                        {
                            this.state.searching ?
                                (
                                    <View style={styles.searchBar}>
                                        <IconTouchable onPress={() => this.setState({ searching: false, search: '' }, this.handleSearch)} left>
                                            <Image source={require('../../../../assets/png/search_back.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>

                                        <View style={styles.searchWrapper}><TextInput style={styles.searchInput} placeholder={stringConstants.typeHere} autoFocus returnKeyType='search' onChangeText={text => this.setState({ search: text }, this.handleSearch)} /></View>

                                        <IconTouchable onPress={this.handleSearch} right>
                                            <Image source={require('../../../../assets/png/search_black.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                ) : (aspectRatio > 1.6 ? (
                                    <View>
                                        <View style={styles.header}>
                                            <IconTouchable onPress={() => aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')} left>
                                                <Image source={require('../../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                                            </IconTouchable>
                                            <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                                <Image source={require('../../../../assets/png/search.png')}
                                                    style={{ width: 24, height: 24 }} />
                                            </IconTouchable>
                                        </View>
                                        <Text style={{
                                            fontFamily: 'SF_Pro_Text',
                                            fontSize: 34,
                                            color: '#fff',
                                            backgroundColor: '#2730D0',
                                            paddingLeft: 20
                                        }}>{planning}</Text>
                                    </View>
                                ) : (

                                        <View style={styles.header}>
                                            {/* <IconTouchable left onPress={() => this.props.navigation.pop()

}>
                                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                                        </IconTouchable> */}
                                            <Text style={{
                                                fontFamily: 'SF_Pro_Text',
                                                fontSize: 34,
                                                color: '#fff',
                                            }}>{planning}</Text>
                                            <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                                <Image source={require('../../../../assets/png/search.png')} style={{ width: 24, height: 24 }} />
                                            </IconTouchable>
                                        </View>
                                    ))
                        }
                    </View>

                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView style={[styles.centerContainer, { backgroundColor: '#2730D0' }]}>
                            {aspectRatio > 1.6 ? <View style={{
                                backgroundColor: '#2730D0',
                            }}>
                                {/* <Text style={styles.expandedText}>{planning}</Text> */}
                            </View> : null}
                            <View style={{ marginBottom: 15, backgroundColor: '#2730D0' }} />

                            {
                                this.state.activities.map((activity, ind) => (
                                    <Panel stringConstants={stringConstants} key={ind} activity={activity} />
                                ))
                            }

                            <View style={{ marginBottom: 15 }} />
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        companyId: state.companyId,
        activities: state.plannedActivities,
        language: state.language,
        defaultSubstation: state.defaultSubstation
    }
}

export default connect(mapStateToProps, { loadPlannedActivities })(Planning)