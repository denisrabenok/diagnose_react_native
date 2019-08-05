import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Dimensions, Modal} from 'react-native'
import PropTypes from 'prop-types';

let {height, width} = Dimensions.get('window');

class LoadingIndicator extends Component {
    render() {
        // if (this.props.isLoading) {

        return (
            // this.props.isLoading ?
            // <View style={{
            //     position: 'absolute',
            //     zIndex: 9999,
            //     top: 0,
            //     left: 0,
            //     height: height,
            //     width: width
            // }}>
            <Modal
                animationType="fade"
                visible={this.props.isLoading}
                transparent={true}
            >
                <View style={{
                    padding: 30,
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <ActivityIndicator size="large" color={'#fff'}/>
                    <Text
                        numberOfLines={2}
                        style={{
                            textAlign: 'center',
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#fff',
                            zIndex: 998,
                            marginTop: 15,
                        }}>{this.props.text}</Text>
                </View>
            </Modal>
            // </View> : null
        )
    }
}

LoadingIndicator.propTypes = {};

LoadingIndicator.defaultProps = {
    text: 'Loading...',
    isLoading: false,
}

export default LoadingIndicator;
