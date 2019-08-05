import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'

import IconTouchable from '../component/IconTouchable'
import styles from '../styles'

import { connect } from 'react-redux'
import { changeLanguage } from '../model/controller/languageController'
import { LANG } from '../model/constants'
import Lang from "../localization/lang";

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;


class ChangeLanguage extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        const selectedIcon = <Image source={require('../../assets/png/blue_checked.png')} style={{ width: 12, height: 10 }} />
        const stringConstants  = Lang[this.props.language];

        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>
                    <View style={{ height: 54 }}>
                        <View style={styles.header}>
                            <IconTouchable left onPress={() => this.props.navigation.pop()

}>
                                <Image source={require('../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                            </IconTouchable>
                            <Text style={[styles.headerText, { marginRight: 20 }]}>{stringConstants.changeLanguage}</Text>
                            <View style={{ width: 45 }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.valueText}></Text>
                        <TouchableOpacity style={[styles.lightItemPanel, { borderTopColor: '#E5E5E5', borderTopWidth: 1 }]}
                            onPress={() => this.props.changeLanguage(LANG.EN)}>
                            <Text style={styles.valueText}>{stringConstants.english}</Text>
                            {this.props.language === LANG.EN && selectedIcon}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lightItemPanel} onPress={() => this.props.changeLanguage(LANG.SW)}>
                            <Text style={styles.valueText}>{stringConstants.swedish}</Text>
                            {this.props.language === LANG.SW && selectedIcon}
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default connect(mapStateToProps, { changeLanguage })(ChangeLanguage)