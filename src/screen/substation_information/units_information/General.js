import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class General extends Component {
    general = this.props.screenProps.general

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>MANUFACTURER: </Text>
                        <Text style={styles.valueText}>{this.general.manufacturer}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>MANUFACTURING YEAR: </Text>
                        <Text style={styles.valueText}>{this.general.manufacturingYear}</Text>
                    </View>                   
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>MANUFACTURING NUMBER: </Text>
                        <Text style={styles.valueText}>{this.general.manufacturingNumber}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>MANUFACTURING YEAR: </Text>
                        <Text style={styles.valueText}>{this.general.commisioningYear}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>TYPE: </Text>
                        <Text style={styles.valueText}>{this.general.type}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>MODEL: </Text>
                        <Text style={styles.valueText}>{this.general.model}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>SYSTEM VOLTAGE: </Text>
                        <Text style={styles.valueText}>{this.general.systemVoltage}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default General