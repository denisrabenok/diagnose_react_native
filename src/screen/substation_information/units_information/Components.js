import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, Dimensions } from 'react-native'

import ComponentPanel from './ComponentPanel'
import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class Components extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount = () => {
        this.setState({ components: this.props.navigation.getParam('components') })

    }

    render() {
        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.pop()

} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <Text style={styles.headerTextLeft}>Components</Text>
                        <View />
                    </View>

                    <ScrollView style={styles.centerContainer}>
                        <View style={{ marginBottom: 15 }} />
                        {
                            this.state.components.map(component => (
                                <ComponentPanel key={component.id} component={component} />
                            ))
                        }
                        <View style={{ marginBottom: 15 }} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

export default Components