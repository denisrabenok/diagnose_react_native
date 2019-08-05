import StartPoint from './src/screen/StartPoint'
import Login from './src/screen/Login'
import Menu from './src/screen/Menu'
import Menu_fixed from './src/screen/Menu_fixed'
import ChooseSubstation from './src/screen/substation_information/units_information/ChooseSubstation'
import ChooseSite from './src/screen/substation_information/units_information/ChooseSite'
import History from './src/screen/visual_inspection/History'
import Activities from './src/screen/visual_inspection/activities/Activities'
import Planning from './src/screen/visual_inspection/planning/Planning'
import LocationChoice from './src/screen/visual_inspection/add/LocationChoice'
import StartVisualInspection from './src/screen/visual_inspection/add/StartVisualInspection'
import PerformService from './src/screen/maintenance/PerformService'
import DocumentationOfUnits from './src/screen/documentation/DocumentationOfUnits'
import LogBook from './src/screen/log_book/LogBook'
import AddNewLog from './src/screen/log_book/AddNewLog'
import SendMessage from './src//screen/SendMessage'
import SiteList from './src/screen/list_substation/SiteList'
import ListSubstation from './src/screen/list_substation/ListSubstation'
import StationList from './src/screen/substation_information/stations_information/StationList'
import StationsInformation from './src/screen/substation_information/stations_information/StationsInformation'
import StationDocuments from './src/screen/substation_information/stations_information/StationDocuments'
import StationContact from './src/screen/substation_information/stations_information/StationContact'
import UnitList from './src/screen/substation_information/units_information/UnitList'
import UnitsInformation from './src/screen/substation_information/units_information/UnitsInformation'
import HistoryMaintenance from './src/screen/substation_information/units_information/HistoryMaintenance'
import PlanningMaintenance from './src/screen/substation_information/units_information/PlanningMaintenance'
import DatePicker from './src/screen/util/DatePicker'
import Components from './src/screen/substation_information/units_information/Components'
import UnitChoice from './src/screen/substation_information/units_information/AddMaintenance/UnitChoice'
import AddMaintenance from './src/screen/substation_information/units_information/AddMaintenance/AddMaintenance'
import ScanQR from './src/screen/qr/ScanQR'
import Settings from './src/screen/Settings'
import ChangeLanguage from './src/screen/ChangeLanguage'

import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import { Animated, Easing, Dimensions, View, StyleSheet } from 'react-native'
import { AppLoading, Asset, Font, ScreenOrientation } from 'react-native-splash-screen'
import SplashScreen from 'react-native-splash-screen'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './src/model/rootReducer'
import Orientation from 'react-native-orientation'
import { Switch } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import AsyncStorage from "@react-native-community/async-storage"

//NAVIGATION SETTINGS
console.disableYellowBox = true;
const AppNavigator = createStackNavigator({
  StartPoint: { screen: StartPoint },
  Login: { screen: Login },
  Menu: { screen: Menu },
  ChooseSubstation: { screen: ChooseSubstation },
  ChooseSite: { screen: ChooseSite },
  History: { screen: History }, //fixed
  UnitList: { screen: UnitList },
  UnitsInformation: { screen: UnitsInformation },
  HistoryMaintenance: { screen: HistoryMaintenance },
  PlanningMaintenance: { screen: PlanningMaintenance },
  StationList: { screen: StationList },
  StationContact: { screen: StationContact },
  StationDocuments: { screen: StationDocuments },
  StationsInformation: { screen: StationsInformation },
  ScanQR: { screen: ScanQR },
  SiteList: { screen: SiteList },
  ListSubstation: { screen: ListSubstation },
  AddNewLog: { screen: AddNewLog },
  PerformService: { screen: PerformService },
  LocationChoice: { screen: LocationChoice },
  StartVisualInspection: { screen: StartVisualInspection },
  ActivityDetails: { screen: Activities },
  Planning: { screen: Planning },
  Activities: { screen: History },
  DocumentationOfUnits: { screen: DocumentationOfUnits },
  LogBook: { screen: LogBook },
  SendMessage: { screen: SendMessage },
  DatePicker: { screen: DatePicker },
  Components: { screen: Components },
  UnitChoice: { screen: UnitChoice },
  AddMaintenance: { screen: AddMaintenance },
  Settings: { screen: Settings },
  ChangeLanguage: { screen: ChangeLanguage }
},
  { transitionConfig: () => fromLeft() }
)

const AppNavigatorLandscape = createStackNavigator({
  StartPoint: { screen: StartPoint },
  Login: { screen: Login },
  Menu: { screen: History },
  ChooseSubstation: { screen: ChooseSubstation },
  ChooseSite: { screen: ChooseSite },
  History: { screen: History }, //fixed
  UnitList: { screen: UnitList },
  UnitsInformation: { screen: UnitsInformation },
  HistoryMaintenance: { screen: HistoryMaintenance },
  PlanningMaintenance: { screen: PlanningMaintenance },
  StationList: { screen: StationList },
  StationContact: { screen: StationContact },
  StationDocuments: { screen: StationDocuments },
  StationsInformation: { screen: StationsInformation },
  ScanQR: { screen: ScanQR },
  SiteList: { screen: SiteList },
  ListSubstation: { screen: ListSubstation },
  AddNewLog: { screen: AddNewLog },
  PerformService: { screen: PerformService },
  LocationChoice: { screen: LocationChoice },
  StartVisualInspection: { screen: StartVisualInspection },
  ActivityDetails: { screen: Activities },
  Planning: { screen: Planning },
  Activities: { screen: History },
  DocumentationOfUnits: { screen: DocumentationOfUnits },
  LogBook: { screen: LogBook },
  SendMessage: { screen: SendMessage },
  DatePicker: { screen: DatePicker },
  Components: { screen: Components },
  UnitChoice: { screen: UnitChoice },
  AddMaintenance: { screen: AddMaintenance },
  Settings: { screen: Settings },
  ChangeLanguage: { screen: ChangeLanguage }
},
  { transitionConfig: () => fromLeft() }
)

function fromLeft(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initWidth } = layout;

      const leftTranslateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initWidth, 0, 0],
      });

      const rightTranslateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return index === 1 ? { opacity, transform: [{ translateX: leftTranslateX }] } : { opacity, transform: [{ translateX: rightTranslateX }] };
    },
  };
}

const Navigator = createAppContainer(AppNavigator)
const NavigatorLandscape = createAppContainer(AppNavigatorLandscape)


//CACHE FUNCTIONS
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

//REDUCER SETTINGS
const store = createStore(rootReducer, applyMiddleware(thunk))

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    if (aspectRatio > 1.6)
      Orientation.lockToPortrait();
    else
      Orientation.lockToLandscape();
  }

  componentWillMount() {
    // Orientation.unlockAllOrientations();


  }

  async componentDidMount() {
    // ScreenOrientation.allowAsync(ScreenOrientation.Orientation.);
    this.loadAssetsAsync();
    var token = await AsyncStorage.getItem('token')
    SplashScreen.hide();
    this.setState({ token })

  }
  async componentWillUpdate(props) {
    if (aspectRatio <= 1.6) {
      var token = await AsyncStorage.getItem('token')
      // if (setDataToken == token) return;
      this.setState({ token })
      // console.warn("token :", token)
    }
  }

  state = {
    isReady: false,
    token: null
  };

  async loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/png/expanded_grey.png'),
      require('./assets/png/not_expanded_grey.png'),
      require('./assets/png/ok_radio.png'),
      require('./assets/png/not_ok_radio.png'),
      require('./assets/png/calendar.png'),
      require('./assets/png/edit.png'),
      require('./assets/png/save.png'),
      require('./assets/png/plus.png'),
      require('./assets/png/minus.png'),
      require('./assets/png/back.png'),
      require('./assets/png/lock.png'),
      require('./assets/png/com.png'),
      require('./assets/png/book.png'),
      require('./assets/png/circle_plus.png'),
      require('./assets/png/close.png'),
      require('./assets/png/document.png'),
      require('./assets/png/expanded.png'),
      require('./assets/png/go.png'),
      require('./assets/png/info.png'),
      require('./assets/png/inspection.png'),
      require('./assets/png/lines.png'),
      require('./assets/png/list.png'),
      require('./assets/png/maintenance.png'),
      require('./assets/png/message.png'),
      require('./assets/png/not_expanded.png'),
      require('./assets/png/plus_white.png'),
      require('./assets/png/qr.png'),
      require('./assets/png/search.png'),
      require('./assets/png/search_back.png'),
      require('./assets/png/search_black.png'),
      require('./assets/png/settings.png'),
      require('./assets/png/blue_checked.png')
    ]);

    const fontAssets = cacheFonts([
      { 'SF_Pro_Regular': require("./assets/fonts/SF-Pro-Display-Regular.otf") },
      { 'SF_Pro_Black': require("./assets/fonts/SF-Pro-Display-Black.otf") },
      { 'SF_Pro_Medium': require("./assets/fonts/SF-Pro-Display-Medium.otf") },
      { 'SF_Pro_Semibold': require("./assets/fonts/SF-Pro-Display-Semibold.otf") },
      { 'SF_Pro_Bold': require("./assets/fonts/SF-Pro-Display-Bold.otf") }
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }
  
  render() {
    return aspectRatio > 1.6 ? (
      <Provider store={store}>
        <Navigator />
      </Provider>
    ) : (
        <Provider store={store}>
          <View style={{ flexDirection: 'row', height: height, flex: 1 }}>
            {this.state.token &&
              <View style={{ height: height, flex: 0.34 }}>
                <Menu_fixed props={this.props} />
              </View>
            }
            <View style={this.state.token ? styles.content : styles.fullContent}>
              <NavigatorLandscape />
            </View>
          </View>
        </Provider>
      )
  }
}
styles = StyleSheet.create({
  content: { height: height, flex: 0.66 },
  fullContent: { height: height, flex: 1 }
})