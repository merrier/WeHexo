import Taro, { Component, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import "./index.scss"

interface ISystemInfoSafeArea {
  top: number,
  [propName: string]: any;
}

interface ISystemInfo {
  safeArea: ISystemInfoSafeArea,
  [propName: string]: any;
}

interface IMenuButton {
  width: number,
  height: number,
  top: number,
  left: number,
  right: number,
  botton: number,
}


interface IProps {
  hasBack?: boolean,
  hasHome?: boolean,
  hasTitle?: boolean,
  title?: string
}

interface IState {
  systemInfo: ISystemInfo,
  menuButton: IMenuButton,
  headerNavbarStyle: object,
  headerNavbarButtonStyle: object,
}

export default class HeaderNavbar extends Component<IProps, IState> {

  static defaultProps: IProps = {
    hasBack: true,
    hasHome: true,
    hasTitle: true,
    title: ''
  }

  constructor () {
    super(...arguments)
    this.state = {
      systemInfo: Taro.getStorageSync('systemInfo'),
      menuButton: Taro.getStorageSync('menuButton'),
      headerNavbarStyle: {},
      headerNavbarButtonStyle: {},
    }
  }
  componentWillMount() {
    let { menuButton, systemInfo } = this.state;
    let {hasBack, hasHome} = this.props
    let headerNavbarStyle = {
      with: `${ hasBack&&hasHome ? menuButton.width : menuButton.width/2 }px`,
      height: `${menuButton.height}px`,
      left: `${systemInfo.screenWidth - menuButton.right}px`,
      top: `${menuButton.top}px`,
      borderRadius: `${menuButton.height/2}px`,
    }
    let headerNavbarButtonStyle = {
      width: `${menuButton.width/2}px`,
      // lineHeight: `${menuButton.height}px`,
    }
    this.setState({
      headerNavbarStyle,
      headerNavbarButtonStyle,
    })
  }
  componentDidMount () {
  }
  render () {
    // console.info(this.state)
    let { headerNavbarStyle, headerNavbarButtonStyle } = this.state;
    let { hasBack, hasHome } = this.props;
    return (
      <View className="header-navbar" style={headerNavbarStyle}>
        {hasBack && (
          <View className="header-navbar-button" onClick={this.goBack} style={headerNavbarButtonStyle}>
            <AtIcon className="header-navbar-icon" value='chevron-left' color='#fff'></AtIcon>
          </View>
        )}
        {hasHome && (<View className="line"></View>)}
        {hasHome && (
          <View className="header-navbar-button" onClick={this.goHome} style={headerNavbarButtonStyle}>
            <AtIcon className="header-navbar-icon"value='home' color='#fff'></AtIcon>
          </View>
        )}
      </View>
    )
  }

  goBack = () => {
    Taro.navigateBack({delta: 1})
  }
  goHome = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
}

