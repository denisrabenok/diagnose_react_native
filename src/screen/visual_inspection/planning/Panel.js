import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from '../../../styles'

class Panel extends Component {

    render() {
        const {stringConstants} = this.props;
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.date}:</Text>
                    <Text style={styles.valueText}>{this.props.activity.date}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: '#ECECED',
                        margin: 10,
                    }}
                />
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.type}:</Text>
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
                    <Text style={styles.keyText}>{stringConstants.unit}:</Text>
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
                    <Text style={styles.keyText}>{stringConstants.last}:</Text>
                    <Text style={styles.valueText}>{this.props.activity.latest}</Text>
                </View>
            </View>
        )
    }
}

export default Panel