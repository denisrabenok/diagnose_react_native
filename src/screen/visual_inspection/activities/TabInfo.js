import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, Alert, Dimensions, Image } from 'react-native'

import AmoundInput from '../../../component/AmountInput'
import QualityInput from '../../../component/QualityInput'
import ActInput from '../../../component/ActInput'
import ShiftView from '../../../component/ShiftScrollView'
import styles from '../../../styles'

import { connect } from 'react-redux'
import { updateActivity, startEditing } from '../../../model/controller/activityController'
import Lang from '../../../localization/lang'

class TabInfo extends Component {
    activity = this.props.screenProps

    state = {
        editing: false,
    }

    componentWillMount = () => {
        this.info = this.props.screenProps.answers[this.props.navigation.state.routeName]
    }

    componentWillReceiveProps(nextProps) {
        const isEditing = nextProps.isEditing
        if(isEditing){
            this.setState({editing : isEditing})
        }
    }

    handleAction = () => {
        const stringConstants = Lang[this.props.language];

        this.props.startEditing();

        if (this.state.editing) {
            Alert.alert(
                stringConstants.saveInformation,
                stringConstants.areYouSureYouWantToSave,
                [
                    {
                        text: stringConstants.save, onPress: () => {
                            this.activity.date = this.state.date
                            this.props.updateActivity(this.props.token, this.activity)

                            this.setState({ editing: !this.state.editing })
                        }
                    },
                    { text: stringConstants.cancel, style: 'cancel' }
                ],
                { cancelable: false }
            )
        }
        else
            this.setState({ editing: !this.state.editing })
    }

    renderQuestion = question => {
        const stringConstants = Lang[this.props.language];

        // console.warn(question)
        if (question.type == 2)
            return (
                <AmoundInput stringConstants={stringConstants} key={question.question} editing={this.state.editing} question={question} answer={question.answer} />
            )
        else if (question.type == 3)
            return (
                <QualityInput stringConstants={stringConstants} key={question.question} editing={this.state.editing} question={question} answer={question.answer} />
            )
        else if (question.type == 5)
            return (
                <ActInput stringConstants={stringConstants} key={question.question} editing={this.state.editing} question={question} answer={question.answer} />
            )
    }

    render() {
        let actionIcon
        if (this.state.editing)
            actionIcon = <Image source={require('../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
        else
            actionIcon = <Image source={require('../../../../assets/png/edit.png')} style={{ width: 22, height: 22 }} />

        return (
            <ShiftView style={{ height: Dimensions.get('window').height - 110 }}>
                <ScrollView style={[styles.centerContainer, { opacity: this.state.editing ? 1 : 0.7 }]}>
                    {this.info && this.info.map(question => this.renderQuestion(question))}
                </ScrollView>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: this.state.editing ? '#4FC295' : '#2730D0' }]}
                    onPress={this.handleAction}
                >
                    {actionIcon}
                </TouchableOpacity>
            </ShiftView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    language: state.language,
    isEditing: state.isEditing
})

export default connect(mapStateToProps, { updateActivity, startEditing })(TabInfo)