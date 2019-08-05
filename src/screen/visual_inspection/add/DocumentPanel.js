import React, { Component } from 'react'
import { Text, View, TextInput, Picker } from 'react-native'

import styles from '../../../styles'

import { DOCUMENT_TYPES } from '../../../model/constants'

class DocumentPanel extends Component {

    state = {
        typeId: 0,
        language: 0
    }

    render() {
        const {stringConstants} = this.props
        return (
            <View style={styles.unitContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.name}:</Text>
                    <Text style={styles.valueText}>{this.props.document.name}</Text>
                </View>

                {
                    this.props.expanded && (
                        <View>
                            <View style={styles.infoRow}>
                                <Text style={styles.keyText}>{stringConstants.type}:</Text>
                                <View style={[styles.valueContainer, { flex: 1, flexGrow: 1 }]}>
                                    <Picker
                                        style={styles.pickerContainer}
                                        selectedValue={this.props.document.type || this.state.typeId}
                                        onValueChange={(itemValue, itemIndex) => { itemIndex !== 0 ? this.props.document.type = itemIndex - 1 : delete this.props.document.type; this.setState({ typeId: itemValue }) }} >
                                        <Picker.Item style={styles.valueText} key={0} label={'Not chosen'} value={'Not chosen'} />
                                        {DOCUMENT_TYPES.map((item, ind) => (<Picker.Item style={styles.valueText} key={ind + 1} label={item} value={item} />))}
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.keyText}>{stringConstants.language}:</Text>
                                <View style={[styles.valueContainer, { flex: 1, flexGrow: 1 }]}>
                                    <Picker
                                        style={styles.pickerContainer}
                                        selectedValue={this.props.document.language || this.state.language}
                                        onValueChange={(itemValue, itemIndex) => { itemIndex !== 0 ? this.props.document.language = itemValue : delete this.props.document.language; this.setState({ language: itemValue }) }} >
                                        <Picker.Item style={styles.valueText} key={0} label='Not chosen' value='Not chosen' />
                                        <Picker.Item style={styles.valueText} key={1} label='English' value='English' />
                                        <Picker.Item style={styles.valueText} key={2} label='Swedish' value='Swedish' />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.keyText}>{stringConstants.description}:</Text>
                                <View style={[styles.valueContainer, { flex: 1, flexGrow: 1 }]}>
                                    <TextInput style={styles.valueText} onChangeText={text => this.props.document.description = text} defaultValue={this.props.document.description} />
                                </View>
                            </View>
                        </View>
                    )
                }


                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.linkText, { marginLeft: 15 }]} onPress={this.props.deleteDocument}>{stringConstants.deleteDocument}</Text>
                </View>
            </View>
        )
    }
}

export default DocumentPanel