import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import styles from '../../styles'

class ExpansionPanel extends Component {
    state = {
        expanded: false
    }

    render() {
        const {stringConstants} = this.props;
        return (
            <View style={styles.panel}>
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
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.date}:</Text>
                    <Text style={styles.valueText}>{this.props.log.date}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.event}:</Text>
                    <Text style={styles.valueText}>{this.props.log.event}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.responsible}:</Text>
                    <Text style={styles.valueText}>{this.props.log.responsible}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.comments}:</Text>
                    <Text style={styles.valueText}>{this.props.log.comment}</Text>
                </View>
            </View>
        )
    }
}

export default ExpansionPanel