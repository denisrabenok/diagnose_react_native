import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import styles from '../styles'
import Lang from '../localization/lang'

class ExpansionPanel extends Component {
    state = {
        expanded: false
    }

    render() {
        const renderIcon = () => {
            return this.state.expanded ?
                (<Image source={require('../../assets/png/not_expanded_grey.png')} style={{ width: 13, height: 7 }} />) :
                (<Image source={require('../../assets/png/expanded_grey.png')} style={{ width: 13, height: 7 }} />)
        };

        const stringConstant = Lang[this.props.language];

        return (
            <TouchableOpacity
                style={styles.panel}
                onPress={this.props.handlePress} >
                {/* <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#4FC295',
                        backgroundColor: '#4FC295',
                        //margin: 1,
                        height: 7,
                        borderRadius: 100,
                        margin: 10
                    }}
                /> */}
                <View style={[styles.status, {backgroundColor: this.props.activity.status ? '#4FC295' : '#EC5836'}]} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.infoRow, { flex: 1 }]}>
                        <Text style={styles.keyText}>{stringConstant.date}</Text>
                        <Text style={styles.valueText}>{this.props.activity.date}</Text>
                    </View>
                    
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstant.type}</Text>
                    <Text style={styles.valueText}>{this.props.activity.type}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstant.unit}</Text>
                    <Text style={styles.valueText}>{this.props.activity.unit}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstant.site}</Text>
                    <Text style={styles.valueText}>{this.props.activity.site}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstant.stationId}</Text>
                    <Text style={styles.valueText}>{this.props.activity.stationId}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstant.area}</Text>
                    <Text style={styles.valueText}>{this.props.activity.area}</Text>
                </View>
                {/* <View style={{
                    borderWidth: 0.5,
                    borderColor: '#ECECED',
                    margin: 10
                }}
                /> */}
                <Collapse isCollapsed={this.state.expanded} onToggle={() => { }}>
                    <CollapseBody>
                        <View style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10
                        }}
                        />
                        <View style={styles.infoRow}>
                            <Text style={styles.keyText}>{stringConstant.responsible}</Text>
                            <Text style={styles.valueText}>{this.props.activity.responsible}</Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#ECECED',
                                margin: 10,
                            }}
                        />
                        <View style={styles.infoRow}>
                            <Text style={styles.keyText}>{stringConstant.participants}</Text>
                            <Text style={styles.valueText}>{this.props.activity.participants}</Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#ECECED',
                                margin: 10,
                            }}
                        />
                        <View style={styles.infoRow}>
                            <Text style={styles.keyText}>{stringConstant.comments}</Text>
                            <Text style={styles.valueText}>{this.props.activity.comments}</Text>
                        </View>
                    </CollapseBody>

                    <CollapseHeader></CollapseHeader>
                </Collapse>
                <TouchableOpacity
                    style={styles.expandPanel}
                    onPress={() => this.setState({ expanded: !this.state.expanded })}>
                    <Text style={styles.keyText}>{stringConstant.extendedInformation}</Text>
                    <View style={styles.iconStyle}>{renderIcon()}</View>

                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

export default ExpansionPanel