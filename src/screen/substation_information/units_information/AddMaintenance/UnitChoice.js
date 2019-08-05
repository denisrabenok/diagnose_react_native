import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Picker, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native'

import styles from '../../../../styles'
import IconTouchable from '../../../../component/IconTouchable'

import { connect } from 'react-redux'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class UnitChoice extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        unit: null,
        unitId: null
    }

    chooseUnit = () => {
        let units = this.props.units
            .filter(item => item.locationId === this.props.defaultSubstation)
        this.props.navigation.navigate('AddMaintenance', { unitId: this.state.unitId || units[0].id })
    }

    render() {
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable left onPress={() => this.props.navigation.pop()

}>
                            <Image source={require('../../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>Choose unit</Text></View>
                    </View>

                    <View style={[styles.container, { paddingLeft: 30, paddingRight: 30 }]}>
                        <View style={styles.valueContainer}>
                            <Picker
                                style={[styles.pickerContainer]}
                                selectedValue={this.state.unit}
                                onValueChange={(itemValue) => this.setState({ unit: itemValue, unitId: this.props.units.find(unit => unit.name === itemValue).id })} >
                                { this.props.defaultSubstation 
                                    ?
                                        this.props.units
                                        .filter(item => item.locationId === this.props.defaultSubstation)
                                        .map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))
                                    : 
                                        this.props.units
                                            .map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))
                                }
                            </Picker>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={this.chooseUnit}>
                            <Text style={styles.linkText}>Choose</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => ({
    units: state.units,
    defaultSubstation: state.defaultSubstation
})

export default connect(mapStateToProps)(UnitChoice)