import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../../styles'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'
import IconTouchable from '../../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadUnits } from '../../../model/controller/unitController'

import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class UnitList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: true,
        locationId: null
    }

    componentWillMount = () => {
        // this.setState({ locationId: this.props.navigation.getParam('locationId') || this.props.defaultSubstation })
        this.setState({ locationId: this.props.locationId || this.props.defaultSubstation })
        this.props.loadUnits(this.props.token, this.props.companyId).then(() => this.setState({ loading: false }))
    }

    render() {
        const { unitList } = Lang[this.props.language]
        return (
            <GestureRecognizer backgroundColor='#2730D0' onSwipeRight={(state) => aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')}>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        {aspectRatio>1.6?
                        <IconTouchable onPress={() => this.props.navigation.pop()

                        } left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>:<View></View>
                        }
                        <Text style={styles.headerTextLeft}>{unitList}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView>
                            {
                                this.props.units && this.props.units.filter(unit => unit.siteId === this.state.locationId).map(unit => (
                                    <TouchableOpacity
                                        style={styles.itemPanel}
                                        key={unit.id}
                                        onPress={() => this.props.navigation.navigate('UnitsInformation', { unit: unit, language: this.props.language })}
                                    >
                                        <Text style={styles.valueText}>{unit.name}</Text>
                                        <Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />
                                    </TouchableOpacity>
                                ))
                            }
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
    units: state.extendedUnits,
    language: state.language,
    defaultSubstation: state.defaultSubstation,
    locationId: state.locationId
})

export default connect(mapStateToProps, { loadUnits })(UnitList)