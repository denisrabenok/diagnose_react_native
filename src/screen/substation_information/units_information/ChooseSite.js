import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Picker, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native'

import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

import { connect } from 'react-redux'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class ChooseSite extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        location: this.props.locations[0].name,
        locationId: this.props.locations[0].id
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
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>Choose site</Text></View>
                    </View>

                    <View style={[styles.container, { paddingLeft: 30, paddingRight: 30 }]}>
                        <View style={styles.valueContainer}>
                            <Picker
                                style={[styles.pickerContainer]}
                                selectedValue={this.state.location}
                                onValueChange={(itemValue) => this.setState({ location: itemValue, locationId: this.props.locations.find(location => location.name === itemValue).id })} >
                                {this.props.locations.map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))}
                            </Picker>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('UnitList', { locationId: this.state.locationId })}>
                            <Text style={styles.linkText}>Choose</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => ({
    locations: state.childLocations,
})

export default connect(mapStateToProps)(ChooseSite)