import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Dimensions } from 'react-native'

import ExpansionPanel from './ExpansionPanel'
import styles from '../../styles'
import IconTouchable from '../../component/IconTouchable'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;


class ListSubstation extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        components: [],
        searching: false,
        search: '',
    }

    handleSearch = () => {
        query = this.state.search
        filteredComponents = this.components
            .filter(component => component.name.includes(query) || component.manufacturingNumber.includes(query) || component.unit.includes(query))
        this.setState({ components: filteredComponents })
    }

    componentWillMount = () => {
        this.setState({ station: this.props.navigation.getParam('station') })
        this.setState({ components: this.props.navigation.getParam('station').components })
        this.components = this.props.navigation.getParam('station').components
    }

    render() {
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>

                    {
                        this.state.searching ?
                            (
                                <View style={styles.searchBar}>
                                    <IconTouchable onPress={() => this.setState({ searching: false, search: '' }, this.handleSearch)} left>
                                        <Image source={require('../../../assets/png/search_back.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                    </IconTouchable>

                                    <View style={styles.searchWrapper}><TextInput style={styles.searchInput} placeholder='Type here...' autoFocus returnKeyType='search' onChangeText={text => this.setState({ search: text }, this.handleSearch)} /></View>

                                    <IconTouchable onPress={this.handleSearch} right>
                                        <Image source={require('../../../assets/png/search_black.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                    </IconTouchable>
                                </View>
                            ) : (

                                <View style={styles.header}>
                                    <IconTouchable left onPress={() => this.props.navigation.pop()

}>
                                        <Image source={require('../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                                    </IconTouchable>
                                    <Text style={styles.headerText}>{this.state.station ? this.state.station.name : ''}</Text>
                                    <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                        <Image source={require('../../../assets/png/search.png')} style={{ width: 24, height: 24 }} />
                                    </IconTouchable>
                                </View>
                            )
                    }

                    <ScrollView style={styles.centerContainer}>
                        <View style={{ marginBottom: 15 }} />
                        {
                           this.state.components.map(component => (
                                <ExpansionPanel component={component} key={component.id} />
                            ))
                        }
                        <View style={{ marginBottom: 15 }} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}


export default ListSubstation