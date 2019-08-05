import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'

export default class IconTextTouchable extends Component {
    render() {
        return (
            <TouchableOpacity  
                style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',  
                    padding: 15, 
                    paddingLeft: this.props.right ? 30 : 20, 
                    paddingRight: this.props.left ? 2 : 20,
                }} 
                onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}