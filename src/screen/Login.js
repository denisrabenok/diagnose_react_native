import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StatusBar, Image, Alert, BackHandler, Dimensions } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'

import ShiftMenu from '../component/ShiftScrollView'
import styles from '../styles'

import { logIn, loadToken } from '../model/controller/logInController'
import LoadingIndicator from "../component/LoadingIndicator";

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
class Login extends Component {
    constructor(props) {
        super(props);

    }


    static navigationOptions = {
        header: null
    }

    state = {}

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    navigate = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'StartPoint', params: { from: 'login' } })]
            })
        )
    }

    submitLogIn = () => {
        // this.state.username = "Shoaib";
        // this.state.password = "2019_MOSCOW";
        
        if (this.state.username && this.state.password) {
            this.setState({
                isLoading: true
            });
            this.props.logIn(this.state.username, this.state.password)
                .then(() => {
                    this.setState({
                        isLoading: false
                    });
                    if (this.props.token) {
                        this.props.navigation.addListener('didFocus', () => {
                            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
                        });
                        this.navigate();
                    } else {
                        Alert.alert('', 'Invalid username or password')
                    }
                })
        } else {
            Alert.alert('', 'Username and password fields cannot be empty')
        }
    }

    render() {
        return (
            <ShiftMenu>
                <StatusBar barStyle="dark-content" />
                <LoadingIndicator
                    text={'Verifying...'}
                    isLoading={this.state.isLoading}
                />
                <View style={styles.loginContainer}>
                    <View style={styles.ellipse}>
                        <Text style={styles.ellipseText}>G</Text>
                    </View>
                    <Text style={styles.titleText}>Welcome back!</Text>
                    <Text style={styles.actionText}>{`Sign in to continue \n using our app`}</Text>
                    <View style={[styles.iconInput, styles.usernameMargin, aspectRatio <= 1.6 ? { width: width * 0.283 } : {}]}>
                        <Image source={require('../../assets/png/com.png')}
                            style={[styles.leftIcon, { width: 18, height: 18 }]} />
                        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#9FA0B4"
                            onChangeText={(text) => this.setState({ username: text })} />
                    </View>
                    <View style={[styles.iconInput, styles.regularTMargin, aspectRatio <= 1.6 ? { width: width * 0.283 } : {}]}>
                        <Image source={require('../../assets/png/lock.png')}
                            style={[styles.leftIcon, { width: 16, height: 18 }]} />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
                            placeholderTextColor="#B0B1C0"
                            onChangeText={(text) => this.setState({ password: text })} />
                    </View>
                    <TouchableOpacity style={[styles.button, aspectRatio <= 1.6 ? { width: width * 0.283 } : {}]} onPress={this.submitLogIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ShiftMenu>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, { logIn, loadToken })(Login)