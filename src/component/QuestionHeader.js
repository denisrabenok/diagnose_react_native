import React, { Component } from 'react'
import { Text } from 'react-native'

import styles from '../styles'

class QuestionHeader extends Component {
    render() {
        return (
            <Text style={styles.dividerText}>{this.props.question.text}</Text>
        )
    }
}

export default QuestionHeader