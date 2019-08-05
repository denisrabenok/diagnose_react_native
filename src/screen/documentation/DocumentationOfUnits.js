import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Dimensions } from 'react-native'

import Panel from './Panel'
import styles from '../../styles'
import IconTouchable from '../../component/IconTouchable'
import PrimaryLoadingView from '../../component/PrimaryLoadingView'

import { loadDocuments } from '../../model/controller/documentController'
import { connect } from 'react-redux'

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;


class DocumentationOfUnits extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        documents: [],
        searching: false,
        search: '',
        loading: true
    }

    handleSearch = () => {
        query = this.state.search
        filteredDocuments = this.props.documents
            .filter(document => document.name.includes(query) || document.type.includes(query)
                || document.language.includes(query) || document.description.includes(query))
        this.setState({ documents: filteredDocuments })
    }

    componentWillMount = () => {
        this.props.loadDocuments(this.props.token, this.props.companyId).then(() => this.setState({ documents: this.props.documents, loading: false }))
    }

    render() {
        return (

            <View backgroundColor='#2730D0'>
                <SafeAreaView backgroundColor='#2730D0' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>

                    <View style={{ height: 54 }}>
                        {
                            this.state.searching ?
                                (
                                    <View style={styles.searchBar}>
                                        <IconTouchable onPress={() => this.setState({ searching: false, search: '' }, this.handleSearch)} left>
                                            <Image source={require('../../../assets/png/search_back.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>

                                        <View style={styles.searchWrapper}><TextInput style={styles.searchInput} placeholder='Type here...' autoFocus returnKeyType='search' onChangeText={text => this.setState({ search: text }, this.handleSearch)} /></View>

                                        <IconTouchable onPress={this.handleSearch} right>
                                            <Image source={require('../../../assets/png/search_black.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                ) : (

                                    <View style={styles.header}>
                                        <IconTouchable left onPress={() => this.props.navigation.pop()

                                        }>
                                            <Image source={require('../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                                        </IconTouchable>
                                        <Text style={styles.headerText}>Documentation of units</Text>
                                        <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                            <Image source={require('../../../assets/png/search.png')} style={{ width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                )
                        }
                    </View>

                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView style={styles.centerContainer}>
                            <View style={{ marginBottom: 15 }} />
                            {
                                this.state.documents.map(document => (
                                    <Panel documentation={document} />
                                ))
                            }
                            <View style={{ marginBottom: 30 }} />
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => ({
    companyId: state.companyId,
    token: state.token,
    documents: state.documents
})

export default connect(mapStateToProps, { loadDocuments })(DocumentationOfUnits)