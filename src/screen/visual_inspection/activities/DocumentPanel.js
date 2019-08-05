import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from '../../../styles'
import { DOCUMENT_TYPES } from '../../../model/constants'

class Panel extends Component {

    render() {
        const { stringConstants } = this.props;
        // console.log('proooooops', this.props)
        return (
            <View style={styles.unitContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.name}:</Text>
                    <Text style={styles.valueText}>{this.props.document.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.type}:</Text>
                    <Text style={styles.valueText}>{DOCUMENT_TYPES[this.props.document.type]}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.language}:</Text>
                    <Text style={styles.valueText}>{this.props.document.language}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.description}:</Text>
                    <Text style={styles.valueText}>{this.props.document.description}</Text>
                </View>

                {
                    this.props.document.id && (
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.props.downloadDocument}>
                            <Text style={[styles.linkText, { marginLeft: 15 }]}>{stringConstants.downloadDocument}</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    this.props.stringConstantsPreview && (
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.props.previewDocument}>
                            <Text style={[styles.linkText, { marginLeft: 15 }]}>{this.props.stringConstantsPreview}</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        )
    }
}

export default Panel