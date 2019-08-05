import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'

export default class IconTouchable extends Component {
    render() {
        return (
            <TouchableOpacity style={{ padding: 15, paddingLeft: this.props.right ? 30 : 20, paddingRight: this.props.left ? 30 : 20 }} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}