import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Dimensions } from 'react-native'

import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'
import PlanningPanel from './PlanningPanel'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class PlanningMaintenance extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        reports: [],
        searching: false,
        search: ''
    }

    handleSearch = () => {
        query = this.state.search
        filteredReports = this.reports
            .filter(report => report.type.includes(query))
        this.setState({ reports: filteredReports })
    }

    componentWillMount = () => {
        // this.setState({ reports: this.props.navigation.getParam('reports') })
        // this.reports = this.props.navigation.getParam('reports')
    }
    render() {
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>

                    <View style={{ height: 54 }}>
                        {
                            this.state.searching ?
                                (
                                    <View style={styles.searchBar}>
                                        <IconTouchable onPress={() => this.setState({ searching: false, search: '' }, this.handleSearch)} left>
                                            <Image source={require('../../../../assets/png/search_back.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>

                                        <View style={styles.searchWrapper}><TextInput style={styles.searchInput} placeholder='Type here...' autoFocus returnKeyType='search' onChangeText={text => this.setState({ search: text }, this.handleSearch)} /></View>

                                        <IconTouchable onPress={this.handleSearch} right>
                                            <Image source={require('../../../../assets/png/search_black.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                ) : (

                                    <View style={styles.header}>
                                        <IconTouchable left onPress={() => this.props.navigation.pop()

}>
                                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                                        </IconTouchable>
                                        <Text style={styles.headerText}>Planning</Text>
                                        <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                            <Image source={require('../../../../assets/png/search.png')} style={{ width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                )
                        }
                    </View>

                    <ScrollView style={styles.centerContainer}>
                        <View style={{ marginBottom: 15 }} />
                        {
                            this.state.reports.map(report => (
                                <PlanningPanel key={report.id} report={report} />
                            ))
                        }
                        <View style={{ marginBottom: 30 }} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

export default PlanningMaintenance