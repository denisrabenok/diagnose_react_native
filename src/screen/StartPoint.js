import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { loadToken } from '../model/controller/logInController'
import PrimaryLoadingView from '../component/PrimaryLoadingView'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
class StartPoint extends Component {
    static navigationOptions = {
        header: null
    }

    navigate = (routeName) => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: routeName, params: { from: 'login' } })]
            })
        )
    }

    componentWillMount = async () => {
        this.props.loadToken().then(() => {
            routeName = ''
            if (aspectRatio > 1.6) {
                if (this.props.token)
                    if (this.props.defaultSubstation)
                        routeName = 'Menu'
                    else
                        routeName = 'ChooseSubstation'
                else
                    routeName = 'Login'
            }
            else {
                routeName = 'History';
            }
            // this.props.dispatch({
            //     type: "NAVIGATE",
            //     target: routeName
            // })
            this.props.navigation.navigate(routeName, { 'from': 'login' })
            console.log("StartPoint: ", routeName)
        })
            .catch(error => this.props.navigation.navigate('Login'))

    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position)
                console.log(location)
                this.setState({ location })
            }
        )
    }

    render() {
        return (
            <PrimaryLoadingView loading={true} />
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        defaultSubstation: state.defaultSubstation
    }
}

export default connect(mapStateToProps, { loadToken })(StartPoint)