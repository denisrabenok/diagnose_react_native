import React, { Component } from 'react'
import { Text,TextInput, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../styles'
import PrimaryLoadingView from '../../component/PrimaryLoadingView'
import IconTouchable from '../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadStations } from '../../model/controller/stationController'

import Lang from '../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class SiteList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: true,
        // components: [],
        // searching: false,
        // search: '',
    }

    // handleSearch = () => {
    //     query = this.state.search
    //     filteredComponents = this.components
    //         .filter(component => component.name.includes(query) || component.manufacturingNumber.includes(query) || component.unit.includes(query))
    //     this.setState({ components: filteredComponents })
    // }
    componentWillMount = () => {
        this.props.loadStations(this.props.token, this.props.companyId).then(() => {
            this.setState({ loading: false })
        })
    }

    renderStationsTree = (node = this.props.stationsGraph, lvl = 1) => {
        if (node.children) return (
            node.children.map(child => this.renderStationsTree(child, lvl + 1))

            // <Collapse key={node.id}>
            //     <CollapseHeader style={styles.itemPanel}>
            //         <Text style={[styles.valueText, { marginLeft: 20 * lvl }]}>{node.name}</Text>
            //     </CollapseHeader>
            //     <CollapseBody>
            //         {
            //             node.children.map(child => this.renderStationsTree(child, lvl + 1))
            //         }
            //     </CollapseBody>
            // </Collapse>
        )
        else return (
            <TouchableOpacity
                style={styles.subItemPanel}
                key={node.id}
                // onPress={() => this.props.navigation.navigate('StationsInformation',
                // { station: this.props.stations.find(station => station.id === node.id), language: this.props.language })
                //     }
            >
                <Text style={[styles.valueText, { marginLeft: 20 }]}>{node.name}</Text>
                {/*<Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />*/}
            </TouchableOpacity>
        )
    }

    render() {
        const { listSubstation } = Lang[this.props.language]
        // console.warn('site list station graph', this.props.stationsGraph)
        return (
            <GestureRecognizer backgroundColor='#2730D0' onSwipeRight={(state) => aspectRatio>=1.6?this.props.navigation.navigate('Menu'):this.props.navigation.navigate('History')}>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        {aspectRatio>1.6?
                        <IconTouchable onPress={() => this.props.navigation.navigate('Menu')} left>
                            <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                        </IconTouchable>:<View></View>}
                        <Text style={styles.headerTextLeft}>{listSubstation}</Text>
                        <View />
                    </View>
                    {/* {
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
                                    <Text style={styles.headerTextLeft}>{listSubstation}</Text>
                                    <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                        <Image source={require('../../../assets/png/search.png')} style={{ width: 24, height: 24 }} />
                                    </IconTouchable>
                                </View>
                            )
                    } */}
                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView>
                            {this.props.stationsGraph && this.renderStationsTree()}
                            <View style={{ marginBottom: 15 }} />
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </GestureRecognizer>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    companyId: state.companyId,
    stations: state.stations,
    stationsGraph: state.stationsGraph,
    language: state.language
})

export default connect(mapStateToProps, { loadStations })(SiteList)