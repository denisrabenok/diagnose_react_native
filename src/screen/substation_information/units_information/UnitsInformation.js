import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import TabNavigator from './TabNavigator'
import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class UnitsInformation extends Component {
    state = {

    }

    static navigationOptions = {
        header: null
    }

    componentWillMount = () => {
        this.setState({ unit: this.props.navigation.getParam('unit'), language: this.props.navigation.getParam('language') })
    }

    render() {
        const { unitsInformation } = Lang[this.state.language]
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.pop()

} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <Text style={styles.headerTextLeft}>{unitsInformation}</Text>
                        <View />
                    </View>

                    <View style={styles.centerContainer}>
                        <Text style={styles.titleText}>{this.state.unit.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.keyText}>Site: </Text>
                            <Text style={styles.valueText}>{this.state.unit.site}</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }} onPress={() => this.props.navigation.navigate('AddMaintenance', { unitId: this.state.unit.id })}>
                            <Image source={require('../../../../assets/png/circle_plus.png')} style={{ width: 24, height: 24 }} />
                            <Text style={styles.linkText}>Add maintenance</Text>
                        </TouchableOpacity>

                        <View style={styles.itemsContainer}>
                            <TouchableOpacity style={styles.itemPanel} onPress={() => this.props.navigation.navigate('Components', { components: this.state.unit.components })}>
                                <Text style={styles.valueText}>Components</Text>
                                <Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />
                            </TouchableOpacity>
                            <Collapse>
                                <CollapseHeader style={styles.itemPanel}>
                                    <Text style={styles.valueText}>Maintenance</Text>
                                </CollapseHeader>
                                <CollapseBody>
                                    <TouchableOpacity style={styles.subItemPanel} onPress={() => this.props.navigation.navigate('HistoryMaintenance', { unitId: this.state.unit.id })}>
                                        <Text style={styles.valueText}>History</Text>
                                        <Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.subItemPanel} onPress={() => this.props.navigation.navigate('PlanningMaintenance', { unitId: this.state.unit.id })}>
                                        <Text style={styles.valueText}>Planning</Text>
                                        <Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />
                                    </TouchableOpacity>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <TabNavigator navigation={this.props.navigation} screenProps={this.state.unit} />
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default UnitsInformation