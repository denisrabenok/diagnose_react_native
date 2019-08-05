import React, {Component} from 'react'
import {ScrollView, View, Dimensions, TouchableOpacity, Image, Alert} from 'react-native'

import QuestionHeader from '../../../component/QuestionHeader'
import AmoundInput from '../../../component/AmountInput'
import QualityInput from '../../../component/QualityInput'
import ActInput from '../../../component/ActInput'
import ShiftView from '../../../component/ShiftScrollView'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'
import styles from '../../../styles'
import Lang from '../../../localization/lang'

import {connect} from 'react-redux'
import {loadUnitQuestions, loadLocationQuestions, addActivity} from '../../../model/controller/activityController'

class TabInfo extends Component {
    activity = this.props.screenProps.activity

    state = {
        loading: true
    }

    componentWillMount = async () => {
        unit = this.props.units.find(unit => unit.name === this.props.navigation.state.routeName)

        if (unit) {
            this.unitId = unit.id

            await this.props.loadUnitQuestions(this.props.token, this.unitId, this.props.language)

            this.unitQuestions = this.props.unitQuestions[this.unitId]
            this.activity.answers[this.props.navigation.state.routeName] = this.unitQuestions
            this.setState({loading: false})
        } else {
            this.props.loadLocationQuestions(this.props.token, this.activity.location, this.props.language).then(() => {
                this.unitQuestions = this.props.siteQuestions
                this.activity.answers[this.activity.locationName] = this.props.siteQuestions
                this.setState({loading: false})
            })
        }
    }

    handleAction = () => {
        const stringConstants = Lang[this.props.language];

        Alert.alert(
            stringConstants.saveInformation,
            stringConstants.areYouSureYouWantToSave,
            [
                {
                    text: stringConstants.save, onPress: () => {
                        this.activity.date = this.state.date;


                        if (this.activity.date === '') {
                            Alert.alert('', stringConstants.dateFieldCannotBeEmpty);
                        } else {
                            this.activity.date = this.props.screenProps.date.date;
                            this.props.screenProps.addActivity();
                            Alert.alert('', stringConstants.saved, [{
                                text: 'Ok', onPress: () => this.props.screenProps.navigation.navigate('Menu')
                            }])
                        }
                    }
                },
                {text: stringConstants.cancel, style: 'cancel'}
            ],
            {cancelable: false}
        )
    }

    renderQuestion = question => {
        const stringConstants = Lang[this.props.language];

        if (question.type == 2)
            return (
                <AmoundInput stringConstants={stringConstants} key={question.question} question={question}
                             answer={question.answer} new/>
            )
        else if (question.type == 3)
            return (
                <QualityInput stringConstants={stringConstants} key={question.question} question={question}
                              answer={question.answer} new/>
            )
        else if (question.type == 4)
            return (
                <QuestionHeader stringConstants={stringConstants} key={question.question} question={question}/>
            )
        else if (question.type == 5)
            return (
                <ActInput stringConstants={stringConstants} key={question.question} question={question}
                          answer={question.answer} new/>
            )
    }

    render() {
        return (
            <ShiftView style={{height: Dimensions.get('window').height - 110}}>
                <PrimaryLoadingView loading={this.state.loading}>
                    <ScrollView style={styles.centerContainer}>
                        {!this.state.loading && this.unitQuestions.map(question => this.renderQuestion(question))}
                        <View style={{marginBottom: 15}}/>
                    </ScrollView>
                </PrimaryLoadingView>
                <TouchableOpacity
                    style={[styles.actionButton, {backgroundColor: '#4FC295'}]}
                    onPress={this.handleAction}
                >
                    <Image source={require('../../../../assets/png/save.png')} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
            </ShiftView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    units: state.units,
    language: state.language,
    unitQuestions: state.unitQuestions,
    siteQuestions: state.siteQuestions
})

export default connect(mapStateToProps, {loadUnitQuestions, loadLocationQuestions, addActivity})(TabInfo)