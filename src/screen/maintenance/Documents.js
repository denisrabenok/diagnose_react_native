import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity } from 'react-native'

import styles from '../../styles'

class Documents extends Component {
    documents = this.props.screenProps.documents

    handlePress = (index) => {
        //TODO press logic
    }

    render() {
        return (
            <ScrollView style={styles.centerContainer}>
                {
                    this.documents.map((doc, index) => 
                        (<TouchableOpacity key={doc.url} style={styles.itemContainer} onPress={() => this.handlePress(index)}>
                            <Text style={styles.valueText}>{doc.name}</Text>
                        </TouchableOpacity>)
                    )
                }
            </ScrollView>
        )
    }
}

export default Documents