import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class TransformerDescription extends Component {
    description = this.props.screenProps.description

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Localisation: </Text>
                        <Text style={styles.valueText}>{this.description.localisation}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Area of use: </Text>
                        <Text style={styles.valueText}>{this.description.areaOfUse}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Oil mass: </Text>
                        <Text style={styles.valueText}>{this.description.oilMass}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Cooling: </Text>
                        <Text style={styles.valueText}>{this.description.cooling}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default TransformerDescription