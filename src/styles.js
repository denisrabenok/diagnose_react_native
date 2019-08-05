import { Dimensions, Platform } from 'react-native'
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

ratio = 1;
if (aspectRatio > 1.5) { ratio = 1; }
else { ratio = 1.6; }
// titleSize = aspectRatio > 1.6 ? 17 : 34
titleSize = 17
headerSize = 20
regularSize = 17
smallSize = 17

hugeSpacing = 25 * ratio
bigSpacing = 20 * ratio
middleSpacing = 15 * ratio
regularSpacing = 10 * ratio
smallSpacing = 5 * ratio

export default styles = {
    // CONTAINERS
    container: {
        backgroundColor: '#FFF',
        marginTop: Platform.OS === 'android' ? hugeSpacing : 0,
        height: height
    },
    grayContainer: {
        backgroundColor: '#F6F6F6',
        height: height,
        // marginTop: Platform.OS === 'android' ? hugeSpacing : 0
    },
    loginContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: bigSpacing,
        padding: middleSpacing,
        width: '100%'
    },
    menuContainer: {
        backgroundColor: '#2730D0',
        paddingTop: aspectRatio > 1.6 ? 30 : null,
    },
    centerContainer: {
        padding: bigSpacing,
        paddingBottom: 0,
        paddingTop: 0,
    },
    fieldContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingBottom: middleSpacing,
        paddingTop: regularSpacing
    },
    itemContainer: {
        padding: regularSpacing,
        borderBottomColor: '#BCBBC1',
        borderBottomWidth: 1
    },

    ellipse: {
        width: 53,
        height: 53,
        marginTop: 60,
        backgroundColor: '#EAF0FD',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ellipseText: {
        color: '#2730D0',
        fontSize: titleSize,
        fontFamily: 'SF_Pro_Display'
    },
    unitContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1,
        padding: regularSize,
        paddingTop: 5,
        margin: regularSpacing,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: '#f6f6f6',
    },
    pairContainer: {
        marginTop: smallSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    pickerContainer: {
        height: 30,
        width: '100%',
        color: '#343659'
    },

    //TEXT STYLES    
    valueContainer: {
        padding: regularSpacing,
        backgroundColor: '#F3F4F8',
        borderRadius: 10,
        marginTop: smallSpacing,
        color: '#343659',
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: titleSize,
        fontFamily: 'SF_Pro_Display',
        marginTop: hugeSpacing,
        color: '#343659'
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingLeft: middleSpacing,
        paddingBottom: smallSpacing,
        justifyContent: 'space-between'
    },
    keyText: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#000000',
        lineHeight: 30,
        marginRight: regularSpacing,

    },
    valueText: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#141452',
        lineHeight: 30,
        marginRight: regularSpacing
    },
    textButton: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#343659',
        lineHeight: 30
    },
    redText: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#EC5836',
        lineHeight: 30,
        marginRight: regularSpacing
    },
    actionText: {
        fontSize: smallSize,
        fontFamily: 'SF_Pro_Text',
        color: '#8A95AA',
        marginTop: smallSpacing,
        textAlign: 'center',
        letterSpacing: -0.0241176,
        lineHeight: 20
    },
    input: {
        color: '#9FA0B4',
        padding: bigSpacing,
        height: 100,
        fontFamily: 'SF_Pro_Text',
        fontSize: regularSize,
        lineHeight: 22,
        flex: 1
    },
    picker_block: {
        color: '#9FA0B4',
        padding: smallSpacing,
        height: 100,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        flex: 1
    },
    dateInput: {
        color: '#343659',
        padding: bigSpacing,
        height: 100,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        flex: 1
    },
    linkText: {
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        letterSpacing: 0.7,
        color: '#2730D0',
        marginLeft: smallSpacing
    },
    linkTextSelect: {
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        letterSpacing: 0.7,
        color: '#2730D0',
        marginLeft: 0
    },
    buttonText_icon: {
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        letterSpacing: 0.7,
        color: '#ffffff',
        marginLeft: smallSpacing,
        verticalAlign: 'middle'
    },
    dividerText: {
        fontSize: headerSize,
        fontFamily: 'SF_Pro_Text',
        color: '#343659',
        lineHeight: 30,
        marginTop: middleSpacing
    },

    iconInput: {
        backgroundColor: '#F3F4F8',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    leftIcon: {
        marginLeft: middleSpacing,
        resizeMode: 'stretch'
    },
    rightIcon: {
        marginRight: middleSpacing,
        resizeMode: 'stretch'
    },

    //MARGINS
    usernameMargin: {
        marginTop: 2 * hugeSpacing
    },
    regularTMargin: {
        marginTop: regularSpacing
    },


    //BUTTON
    button: {
        marginTop: middleSpacing,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: '#2730D0',
        width: '100%',
        borderRadius: 10,
        color: '#000',
    },
    buttonText: {
        color: "#fff",
        fontFamily: 'SF_Pro_Text',
        fontSize: regularSize
    },

    //MENU
    closeIcon: {
        marginTop: 2 * hugeSpacing,
        marginLeft: bigSpacing,
        marginBottom: bigSpacing
    },
    topPanel: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: middleSpacing,
        paddingTop: 0
    },
    title: {
        fontFamily: 'SF_Pro_Display',
        fontSize: aspectRatio > 1.6 ? 25 : 34,
        color: '#fff',
        flex: 1
    },
    settingsLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingsText: {
        marginRight: regularSpacing,
        fontFamily: 'SF_Pro_Regular',
        //alignSelf: 'center',
        fontSize: regularSize,
        color: '#fff',
        opacity: 0.7,
        // marginTop: smallSpacing
    },
    menuItem: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: middleSpacing,
        paddingBottom: regularSpacing
    },
    menuItemText: {
        fontFamily: 'SF_Pro_Text',
        color: '#fff',
        fontSize: regularSize,
        marginLeft: bigSpacing,
        flex: 1
    },
    menuText: {
        fontFamily: 'SF_Pro_Text',
        color: '#fff',
        fontSize: regularSize,
        marginLeft: middleSpacing,
        marginBottom: regularSpacing,
        flex: 1
    },

    menuSubText: {
        fontFamily: 'SF_Pro_Text',
        color: '#fff',
        fontSize: 15,
        marginLeft: middleSpacing,
        marginBottom: regularSpacing,
    },
    expandedItem: {
        backgroundColor: '#121996',
        padding: regularSpacing,
        paddingLeft: 2 * hugeSpacing,
    },
    expandedText: {
        padding: regularSpacing,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        color: '#fff'
    },
    menuContent: {
        color: "#000",
        fontWeight: "bold",
        padding: 2,
        fontSize: 20
    },
    menuDocument: {
        fontFamily: 'SF_Pro_Text',
        color: '#fff',
        fontSize: regularSize,
        marginLeft: bigSpacing,
        flex: 1
    },

    //HEADER
    header: {
        flexDirection: 'row',
        backgroundColor: '#2730D0',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: aspectRatio < 1.6 ? 35 : null,
        paddingLeft: aspectRatio < 1.6 ? 30 : null
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerText: {
        fontFamily: 'SF_Pro_Text',
        fontSize: titleSize,
        color: '#fff',

    },
    headerTextLeft: {
        fontFamily: 'SF_Pro_Text',
        fontSize: regularSize,
        color: '#fff',
        marginRight: 2 * bigSpacing
    },
    headerTitleView: {
        alignItems: 'center',
        width: aspectRatio > 1.6 ? width : width * 0.66,
        paddingRight: 80
    },

    //EXPANSION PANEL
    panel: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1,
        paddingTop: bigSpacing,
        marginBottom: middleSpacing,
        paddingBottom: regularSpacing,
        padding: smallSpacing,
        justifyContent: 'space-between'
    },
    panel_small: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1,
        paddingTop: smallSpacing,
        marginBottom: middleSpacing,
        padding: smallSpacing
    },
    expandPanel: {
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        padding: regularSpacing,
        paddingBottom: 0,
        paddingTop: regularSpacing,
        flexDirection: 'row'
    },
    iconStyle: {
        marginTop: middleSpacing
    },
    status: {
        borderWidth: 0.5,
        borderColor: '#4FC295',
        //margin: 1,
        height: 7,
        borderRadius: 100,
        margin: 10,

        // width: 12,
        // height: 12,
        // marginRight: 15,
        // marginTop: 6,
        // borderRadius: 20
    },


    //SUBMENU PANEL
    itemPanel: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: regularSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lightItemPanel: {
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: regularSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subItemPanel: {
        backgroundColor: '#F6F6F6',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: regularSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontFamily: 'SF_Pro_Regular',
        color: '#343659',
        lineHeight: 30
    },
    itemsContainer: {
        marginTop: 30,
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
    },

    //FORM STYLES
    radioForm: {
        marginTop: regularSize
    },
    addCommentStyle: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#2730D0',
        marginTop: regularSpacing
    },
    quantButton: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: regularSpacing,
        marginLeft: regularSpacing,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#ccc',
        position: 'absolute',
        bottom: 100,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderColor: '#999BAC',
        borderWidth: 1,
        marginRight: regularSpacing,
        marginTop: smallSpacing
    },
    okCircle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#2730D0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: regularSpacing,
        marginTop: smallSpacing
    },
    notOkCircle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#EC5836',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: regularSpacing,
        marginTop: smallSpacing
    },

    //SEARCH BAR

    searchBar: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        paddingTop: aspectRatio < 1.6 ? 35 : null,
        paddingLeft: aspectRatio < 1.6 ? 30 : null
    },
    searchInput: {
        height: 40,
        color: '#343659',
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize
    },
    searchWrapper: {
        flex: 0,
        flexShrink: 1,
        flexGrow: 1,
    },

    errorText: {
        fontSize: smallSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#CC0000',
        marginTop: regularSpacing,
        textAlign: 'center',
        letterSpacing: 0.66,
        lineHeight: 20
    }
}