import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert, Dimensions, TextInput, Image, BackHandler, Modal, Linking, CameraRoll } from 'react-native'
import {DocumentPicker} from 'react-native-document-picker'
import FileSystem from 'react-native-filesystem'

import ShiftView from '../../../component/ShiftScrollView'
import ActInput from '../../../component/ActInput'
import DocumentPanel from './DocumentPanel'
import EditableDocumentPanel from '../add/DocumentPanel'
import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

import { ACTIVITY_TYPE } from '../../../model/constants'
import { DOWNLOAD_ACTIVITY_DOCUMENT_LINK } from '../../../model/constants'

import { connect } from 'react-redux'
import { updateActivity, startEditing, endEditing } from '../../../model/controller/activityController'
import { updateMaintenance } from '../../../model/controller/maintenanceController'
import Lang from '../../../localization/lang'
import ImageViewer from 'react-native-image-zoom-viewer';


class SiteInfo extends Component {
    activity = this.props.screenProps

    state = {
        editing: false,
        date: this.activity.date,
        imageUri: null,
        images: [{
            // Simplest usage.
            url: '',

            // width: number
            // height: number
            // Optional, if you know the image size, you can set the optimization performance

            // You can pass props to <Image />.
            props: {
                // headers: ...
            }
        }]
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        const isEditing = this.props.isEditing
        if (isEditing) {
            this.setState({ editing: isEditing })
        }

    }

    componentWillReceiveProps(nextProps) {
        const isEditing = nextProps.isEditing
        if (isEditing) {
            this.setState({ editing: isEditing })
        }
    }

    handleBackPress = () => {
        this.props.endEditing()
    }

    handleDate = (date) => this.setState({ date: date.dateString })

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
                            if (this.activity.type === ACTIVITY_TYPE[1])
                                this.props.updateActivity(this.props.token, this.activity)
                            else if (this.activity.type === ACTIVITY_TYPE[2])
                                this.props.updateMaintenance(this.props.token, this.activity)

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

    attachFile = async () => {
        const stringConstants = Lang[this.props.language];
    
        await DocumentPicker.show({ filetype: ["*/*"] }, (err, res) => {
          console.warn("err :", err, res)
          if (err || !res)
            return
          else
            if (res.type === "cancel") return;
              this.activity.attachments.push({
                name: res.name,
                filepath: res.uri
              });
              this.forceUpdate();
        });
      };
    // attachFile = async () => {
    //     DocumentPicker.getDocumentAsync({ type: 'application/pdf' }).then(fileInfo => {
    //         if (fileInfo.type === 'cancel')
    //             return
    //         else {
    //             formData = new FormData()
    //             formData.append('file', { uri: fileInfo.uri, name: fileInfo.name, type: 'application/pdf' })
    //             this.activity.attachments.push({ name: fileInfo.name + '.pdf', formData: formData });
    //             this.forceUpdate()
    //         }
    //     })
    // }

    downloadFile = async (document) => {
        console.log(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id))
        FileSystem.downloadAsync(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id), FileSystem.documentDirectory + document.name)
            .then(({ uri }) => {
                console.log("Preview URL", uri)
                if (uri.includes('.pdf')) {
                    // // console.log('this is pdf file', uri)
                    // Linking.openURL(uri)
                    // this.setState({ pdfUri: uri })
                }
                else if (uri.includes('.jpg') || uri.includes('.png') || uri.includes('.jpeg')) {
                    const { images } = this.state
                    CameraRoll.saveToCameraRoll(uri, "photo")
                    // console.log('Finished downloading to ', uri);
                    // images[0].url = uri
                    // // console.log(images)
                    // this.setState({ images, imageUri: uri })
                    // console.log('this is an image', uri)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    previewFile = async (document) => {
        console.log(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id))
        FileSystem.downloadAsync(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id), FileSystem.documentDirectory + document.name)
            .then(({ uri }) => {
                console.log("Preview URL", uri)
                if (uri.includes('.pdf')) {
                    // console.log('this is pdf file', uri)
                    Linking.openURL(uri)
                    this.setState({ pdfUri: uri })
                }
                else if (uri.includes('.jpg') || uri.includes('.png') || uri.includes('.jpeg')) {
                    const { images } = this.state
                    // console.log('Finished downloading to ', uri);
                    images[0].url = uri
                    // console.log(images)
                    this.setState({ images, imageUri: uri })
                    // console.log('this is an image', uri)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }



    render() {
        const stringConstants = Lang[this.props.language];

        let actionIcon
        if (this.state.editing)
            actionIcon = <Image source={require('../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
        else
            actionIcon = <Image source={require('../../../../assets/png/edit.png')} style={{ width: 22, height: 22 }} />

        return (
            <ShiftView style={{ height: Dimensions.get('window').height - 110 }}>
                <ScrollView style={[styles.centerContainer, { opacity: this.state.editing ? 1 : 0.7 }]}>
                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.reporter}</Text>
                    <TextInput style={styles.valueContainer} defaultValue={this.activity.reporter} editable={false} />


                    <Text style={styles.keyText}>{stringConstants.date}</Text>
                    <View style={styles.iconInput}>
                        <TextInput editable={this.state.editing} style={styles.dateInput} defaultValue={this.state.date} />
                        <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => this.props.navigation.navigate('DatePicker', { handleDate: this.handleDate })} disabled={!this.state.editing}>
                            <Image source={require('../../../../assets/png/calendar.png')} style={[styles.rightIcon, { width: 24, height: 24 }]} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.participants}</Text>
                    <TextInput style={styles.valueContainer} onChangeText={text => this.activity.participants = text} defaultValue={this.activity.participants} editable={this.state.editing} />

                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.comments}</Text>
                    <TextInput style={styles.valueContainer} onChangeText={text => this.activity.comments = text} defaultValue={this.activity.comments} editable={this.state.editing} />

                    {
                        this.activity.type === ACTIVITY_TYPE[2] ? (
                            <View>
                                <ActInput editing={this.state.editing} question={{ text: stringConstants.gasSamplesTaken }} answer={{ value_bool: this.activity.gasSamples }} />
                                <ActInput editing={this.state.editing} question={{ text: stringConstants.oilSamplesTaken }} answer={{ value_bool: this.activity.oilSamples }} />
                            </View>
                        ) : null
                    }

                    {
                        this.activity.attachments.map((document, ind) =>
                            document.id || !this.state.editing ?
                                <DocumentPanel
                                    stringConstants={stringConstants}
                                    key={ind}
                                    document={document}
                                    downloadDocument={() => this.downloadFile(document)}
                                    previewDocument={() => this.previewFile(document)}
                                    stringConstantsPreview="Preview Document"
                                />
                                : <EditableDocumentPanel
                                    stringConstants={stringConstants}
                                    key={ind}
                                    document={document}
                                    deleteDocument={() => { this.activity.attachments.splice(ind, 1); this.forceUpdate() }}
                                />
                        )
                    }

                    <Modal visible={!!this.state.imageUri} transparent={true}>
                        <ImageViewer
                            imageUrls={this.state.images}
                            enableSwipeDown={true}
                            renderHeader={() => <View style={{ padding: 20 }} ><IconTouchable onPress={() => this.setState({ imageUri: null })} left ><Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} /></IconTouchable></View>}
                            onSwipeDown={() => this.setState({ imageUri: null })}
                            saveToLocalByLongPress={true} onSave={(uro) => CameraRoll.saveToCameraRoll(uro, "photo")} />
                    </Modal>

                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15 }} disabled={!this.state.editing}>
                        <Image source={require('../../../../assets/png/circle_plus.png')} style={{ width: 24, height: 24 }} />
                        <Text style={styles.linkText} onPress={this.attachFile}>{stringConstants.attachADocument}</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: 40 }} />
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
    isEditing: state.isEditing,
    language: state.language,
})

export default connect(mapStateToProps, { updateActivity, updateMaintenance, startEditing, endEditing })(SiteInfo)