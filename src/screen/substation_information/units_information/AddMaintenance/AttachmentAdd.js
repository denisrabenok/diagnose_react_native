import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Alert, Dimensions } from 'react-native'
import DocumentPanel from './MaintenanceDocumentPanel'
import ShiftScrollView from '../../../../component/ShiftScrollView'
import styles from '../../../../styles'
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker } from 'react-native-document-picker'
import { PermissionsAndroid } from 'react-native'
import * as mime from 'react-native-mime-types'

import { connect } from 'react-redux'
import { addMaintenance } from '../../../../model/controller/maintenanceController'
// import {addActivity} from '../../../../model/controller/activityController'
import Lang from '../../../../localization/lang'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

class AttachDocument extends Component {
  maintenance = this.props.screenProps

  state = {
    imageCount: 1,
    date: this.maintenance.date
  }

  file = {
    attachments: []
  };

  attachPDF = async () => {
    const stringConstants = Lang[this.props.language];

    await DocumentPicker.show({ filetype: ["application/pdf"] }, (err, res) => {
      console.warn("err :", err, res)
      if (err || !res)
        return
      else
        if (res.type === "cancel") return;
        else {
          let formData = new FormData()
          formData.append('file', { uri: res.uri, name: res.fileName, type: 'application/pdf' });
          this.maintenance.attachments.push({
            name: res.fileName,
            formData: formData,
            uri: res.uri,
            fileType: 'application/pdf'
          });
          this.forceUpdate()
        }
    });
  };
  // attachPDF = async () => {
  //     DocumentPicker.getDocumentAsync({ type: 'application/pdf' }).then(fileInfo => {
  //         if (fileInfo.type === 'cancel')
  //             return
  //         else {
  //             let formData = new FormData()
  //             formData.append('file', { uri: fileInfo.uri, name: fileInfo.name, type: 'application/pdf' });
  //             this.maintenance.attachments.push({
  //                 name: fileInfo.name,
  //                 formData: formData,
  //                 uri: fileInfo.uri,
  //                 fileType: 'application/pdf'
  //             });
  //             this.forceUpdate()
  //         }
  //     })
  // }
  attachImage = async () => {
    const stringConstants = Lang[this.props.language];

    await DocumentPicker.show({ filetype: ["image/*"] }, (err, res) => {
      console.warn("err :", err, res)
      if (err || !res)
        return
      else
        if (res.type === "cancel") return;
        else {
          name = res.uri.split('/').reverse()[0]

          let formData = new FormData()
          formData.append('file', {
            uri: res.uri,
            name: res.fileName,
            type: mime.lookup(name.split('.').reverse()[0])
          });
          this.maintenance.attachments.push({
            name: res.fileName,
            formData: formData,
            uri: res.uri,
            fileType: 'image/*'
          });
          this.forceUpdate()
        }
    });
  };
  // attachImage = async () => {
  //     ImagePicker.launchImageLibraryAsync().then(fileInfo => {
  //         if (fileInfo.type === 'cancel')
  //             return
  //         else {
  //             name = fileInfo.uri.split('/').reverse()[0]

  //             let formData = new FormData()
  //             formData.append('file', {
  //                 uri: fileInfo.uri,
  //                 name: name,
  //                 type: mime.lookup(name.split('.').reverse()[0])
  //             });
  //             this.maintenance.attachments.push({
  //                 name: name,
  //                 formData: formData,
  //                 uri: fileInfo.uri,
  //                 fileType: 'image/jpeg'
  //             });
  //             this.forceUpdate()
  //         }
  //     })
  // }

  takePhoto = async () => {
    // const { status } = await PermissionsAndroid.askAsync(PermissionsAndroid.CAMERA);
    // const { status2 } = await PermissionsAndroid.askAsync(PermissionsAndroid.CAMERA_ROLL);

    //if (status === 'granted' && status2 === 'granted') {
    console.warn("===============")
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.warn('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const name = `Image-${this.state.imageCount}.jpg`;
        formData = new FormData()
        formData.append('file', { uri: response.uri, name: response.fileName, type: mime.lookup('jpg') })
        this.maintenance.attachments.push({ name: response.fileName, formData: formData, fileType: 'image/jpeg', uri: response.uri });
        this.forceUpdate()
      }
    });
  };
  // takePhoto = async () => {
  //     const { status } = await PermissionsAndroid.askAsync(PermissionsAndroid.CAMERA)
  //     const { status2 } = await PermissionsAndroid.askAsync(PermissionsAndroid.CAMERA_ROLL)

  //     const image = await ImagePicker.launchCameraAsync({ allowEditing: false })
  //     if (!image.cancelled) {
  //         const name = `Image-${this.state.imageCount}.jpg`

  //         formData = new FormData()
  //         formData.append('file', { uri: image.uri, name: name, type: mime.lookup('jpg') })
  //         this.maintenance.attachments.push({ name: name, formData: formData, fileType: 'image/jpeg', uri: image.uri });
  //         this.forceUpdate()
  //     }
  // }

  handleAction1 = () => {
    // const stringConstants = Lang[this.props.language];

    // Alert.alert(
    //     stringConstants.saveInformation,
    //     stringConstants.areYouSureYouWantToSave,
    //     [
    //         {
    //             text: 'Save', onPress: () => {
    //                 this.maintenance.date = this.state.date

    //                 if (this.maintenance.date === '')
    //                     Alert.alert('', stringConstants.dateFieldCannotBeEmpty)
    //                 else {
    //                     this.maintenance.date = this.props.screenProps.date.date
    //                     this.props.screenProps.addMaintenance()
    //                     Alert.alert('', stringConstants.saved, [{
    //                         text: 'Ok', onPress: () => this.props.screenProps.navigation.navigate('Menu')
    //                     }])
    //                 }
    //             }
    //         },
    //         { text: stringConstants.cancel, style: 'cancel' }
    //     ],
    //     { cancelable: false }
    // )
    Alert.alert(
      'Save information',
      'Are you sure you want to save entered information?',
      [
        {
          text: 'Save', onPress: () => {
            this.maintenance.date = this.state.date
            // this.maintenance.reporterId = this.props.userId
            this.maintenance.reporterId = 28
            // this.maintenance.unitId = this.props.navigation.getParam('unitId')
            this.maintenance.unitId = 1000

            // console.log("++++++++ attachDocumet +++++++++ this.maintenance =>",this.maintenance)

            if (this.maintenance.date !== '') {
              this.props.addMaintenance(this.props.token, this.maintenance)
              aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')
            }
            else
              Alert.alert('', 'Maintenance date cannot be empty')
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: false }
    )
  };

  handleAction = () => {
    Alert.alert(
      'Save information',
      'Are you sure you want to save entered information?',
      [
        {
          text: 'Save', onPress: () => {
            this.maintenance.reporterId = this.props.userId
            this.maintenance.unitId = this.props.navigation.getParam('unitId')

            // console.log(this.maintenance)

            if (this.maintenance.date !== '') {
              this.props.addMaintenance(this.props.token, this.maintenance)
              aspectRatio >= 1.6 ? this.props.navigation.navigate('Menu') : this.props.navigation.navigate('History')
            }
            else
              Alert.alert('', 'Maintenance date cannot be empty')
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: false }
    )
  }

  render() {
    const stringConstants = Lang[this.props.language];

    return (
      <ShiftScrollView style={{ height: Dimensions.get('window').height - 110 }}>
        <ScrollView style={[styles.centerContainer, styles.regularTMargin]}>

          <View>
            <TouchableOpacity style={styles.lightItemPanel}
              onPress={this.attachPDF}>
              <Text style={styles.valueText}>{stringConstants.attachAPdfFile}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lightItemPanel} onPress={this.attachImage}>
              <Text style={styles.valueText}>{stringConstants.attachAnImage}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lightItemPanel} onPress={this.takePhoto}>
              <Text style={styles.valueText}>{stringConstants.takeAPhoto}</Text>
            </TouchableOpacity>
          </View>

          {
            this.maintenance.attachments.map((document, ind) =>
              <DocumentPanel
                stringConstants={stringConstants}
                key={ind}
                document={document}
                expanded={document.name.split('.').reverse()[0] === 'pdf'}
                deleteDocument={() => {
                  this.maintenance.attachments.splice(ind, 1);
                  this.forceUpdate()
                }}
              />
            )
          }

          <View style={{ marginBottom: 40 }} />
        </ScrollView>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4FC295' }]}
          onPress={this.handleAction}
        >
          <Image source={require('../../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        {/* </ScrollView> */}
      </ShiftScrollView>
    )
  }
}

mapStateToProps = state => ({
  token: state.token,
  language: state.language,
})

export default connect(mapStateToProps, { addMaintenance })(AttachDocument)
// export default connect(mapStateToProps)(AttachDocument)