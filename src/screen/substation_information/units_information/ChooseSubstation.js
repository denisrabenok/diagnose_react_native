import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Picker, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { changeDefaultSubstation } from '../../../model/controller/stationController'
import { loadUnits } from '../../../model/controller/unitController'

import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'

import { connect } from 'react-redux'
import Lang from '../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
// import console = require('console');

class ChooseSubstation extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        location: this.props.locations !== undefined ? this.props.locations[0].name : null,
        locationId: this.props.locations !== undefined ? this.props.locations[0].id : null,
        loading: true
    }

    componentDidMount() {
        // console.warn("ChosseSubstation: ", this.props.token);
        this.props.loadUnits(this.props.token, this.props.companyId).then(() => {
            var loc = this.props.locations;

            loc.sort(function (a, b) {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            this.setState({
                loading: false,
                location: this.props.locations !== undefined ? loc[0].name : null,
                locationId: this.props.locations !== undefined ? loc[0].id : null
            })
        })
    }

    navigate = routeName => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: routeName, params: { from: 'login' } })]
            })
        )
    }

    setDefaultSubstation = locationId => {
        this.props.changeDefaultSubstation(locationId)

        if (this.props.navigation.getParam('from') === 'login') {
            this.props.navigate('Menu')
        } else {
            this.props.navigation.navigate('Menu', { 'from': 'login' })
        }
    }

    render() {
        let { locationId } = this.state
        const stringConstant = Lang[this.props.language];

        return (
            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        {
                            aspectRatio>1.6?(
                            (this.props.navigation.getParam('from') === 'login') ?
                                <>
                                    <IconTouchable left onPress={() => this.props.navigation.pop()}>
                                        <Image source={{}} style={{ width: 20, height: 21 }} />
                                    </IconTouchable>
                                    <View style={styles.headerTitleView}>
                                        <Text style={[styles.headerText, { marginRight: 60 }]}>{stringConstant.setDefaultSubstation}</Text>
                                    </View>
                                </>
                                :
                                <>
                                    <IconTouchable left onPress={() => this.props.navigation.pop()}>
                                        <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                                    </IconTouchable>
                                    <View style={styles.headerTitleView}>
                                        <Text style={[styles.headerText, { marginRight: 30 }]}>{stringConstant.setDefaultSubstation}</Text>
                                    </View>
                                </>
                            ):(
                                (this.props.navigation.getParam('from') === 'login') ?
                                <>                                    
                                    <View style={styles.headerTitleView}>
                                        <Text style={[styles.headerText, { marginRight: 60 }]}>{stringConstant.setDefaultSubstation}</Text>
                                    </View>
                                </>
                                :
                                <>                                    
                                    <View style={styles.headerTitleView}>
                                        <Text style={[styles.headerText, { marginRight: 30 }]}>{stringConstant.setDefaultSubstation}</Text>
                                    </View>
                                </>
                            )
                        }
                    </View>
                    <PrimaryLoadingView loading={this.state.loading}>
                        <View style={[styles.container, { paddingLeft: 30, paddingRight: 30, alignItems: 'center' }]}>
                            <View style={[styles.valueContainer, { width: '100%' }]}>
                                {
                                    this.props.locations !== undefined &&
                                    <Picker
                                        style={[styles.pickerContainer]}
                                        mode={'dropdown'}
                                        selectedValue={this.state.location}
                                        onValueChange={(itemValue) => this.setState({
                                            location: itemValue,
                                            locationId: this.props.locations
                                                .find(location => location.name === itemValue).id
                                        })} >
                                        {this.props.locations
                                            .map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))}
                                    </Picker>
                                }
                            </View>
                            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                                this.setDefaultSubstation(locationId)
                            }
                            }>
                                <Text style={styles.linkTextSelect}>{stringConstant.select}</Text>
                            </TouchableOpacity>
                            {(this.props.navigation.getParam('from') === 'login') &&
                                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                                    this.props.navigate('Menu')
                                }
                                }>
                                    <Text style={styles.textButton}>Skip</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => ({
    locations: state.childLocations,
    defaultSubstation: state.defaultSubstation,
    token: state.token,
    companyId: state.companyId,
    language: state.language,
})

export default connect(mapStateToProps, { changeDefaultSubstation, loadUnits })(ChooseSubstation)