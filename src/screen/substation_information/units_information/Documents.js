import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, CameraRoll, Linking, Modal } from 'react-native'
import styles from '../../../styles'
import { DOWNLOAD_ACTIVITY_DOCUMENT_LINK } from '../../../model/constants'
import FileSystem from 'react-native-filesystem'
import ImageViewer from 'react-native-image-zoom-viewer';
import IconTouchable from '../../../component/IconTouchable'
//import FileDownload from 'react-native-file-download'
class Other extends Component {
    state = {
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
    documents = this.props.screenProps.documents

    downloadDocument = async (document) => {
        console.warn(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id)+document.name)

        // FileSystem.downloadAsync(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id), FileSystem.documentDirectory + document.name)
        //     .then(({ uri }) => {
        //         console.log("Preview URL", uri)
        //         if (uri.includes('.pdf')) {
        //             // console.log('this is pdf file', uri)
        //             // Linking.openURL(uri)
        //             // this.setState({ pdfUri: uri })
        //         }
        //         else if (uri.includes('.jpg') || uri.includes('.png') || uri.includes('.jpeg')) {
        //             const { images } = this.state
        //             CameraRoll.saveToCameraRoll(uri, "photo")
        //             // console.log('Finished downloading to ', uri);
        //             // images[0].url = uri
        //             // // console.log(images)
        //             // this.setState({ images, imageUri: uri })
        //             // console.log('this is an image', uri)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        const fileContents = await FileSystem.readFile(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id));
        console.warn(`read from file: ${fileContents}`);
        FileSystem.writeToFile(document.name, fileContents, FileSystem.storage.important)
            .then(({ uri }) => {
                console.log("Preview URL", uri)
                if (uri.includes('.pdf')) {
                    // console.log('this is pdf file', uri)
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
            });

    }

    previewDocument = async (document) => {
        console.log("Url: ", DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id));
        const fileContents = await FileSystem.readFile(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id));
        console.warn(`read from file: ${fileContents}`);
        FileSystem.writeToFile(document.name, fileContents, FileSystem.storage.important)
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

        // console.log(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id))
        // FileSystem.downloadAsync(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id), FileSystem.documentDirectory + document.name)
        //     .then(({ uri }) => {
        //         console.log("Preview URL", uri)
        //         if (uri.includes('.pdf')) {
        //             // console.log('this is pdf file', uri)
        //             Linking.openURL(uri)
        //             this.setState({ pdfUri: uri })
        //         }
        //         else if (uri.includes('.jpg') || uri.includes('.png') || uri.includes('.jpeg')) {
        //             const { images } = this.state
        //             // console.log('Finished downloading to ', uri);
        //             images[0].url = uri
        //             // console.log(images)
        //             this.setState({ images, imageUri: uri })
        //             // console.log('this is an image', uri)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    render() {
        return (
            <ScrollView>
                {
                    this.documents.map(document => (
                        <View style={styles.unitContainer} key={document.id}>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Name: </Text>
                                <Text style={styles.valueText}>{document.name}</Text>
                            </View>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Type: </Text>
                                <Text style={styles.valueText}>{document.type}</Text>
                            </View>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Language: </Text>
                                <Text style={styles.valueText}>{document.language}</Text>
                            </View>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Description: </Text>
                                <Text style={styles.valueText}>{document.description}</Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.downloadDocument(document)}>
                                <Text style={[styles.linkText, { marginLeft: 15 }]}>{"Download"}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.previewDocument(document)}>
                                <Text style={[styles.linkText, { marginLeft: 15 }]}>{"Preview"}</Text>
                            </TouchableOpacity>
                        </View>
                    ))

                }
                <Modal visible={!!this.state.imageUri} transparent={true}>
                    <ImageViewer
                        imageUrls={this.state.images}
                        enableSwipeDown={true}
                        renderHeader={() => <View style={{ padding: 20 }} ><IconTouchable onPress={() => this.setState({ imageUri: null })} left ><Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} /></IconTouchable></View>}
                        onSwipeDown={() => this.setState({ imageUri: null })}
                        saveToLocalByLongPress={true} onSave={(uro) => CameraRoll.saveToCameraRoll(uro, "photo")} />
                </Modal>




                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default Other