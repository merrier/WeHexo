import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import Home from "../../components/home/index"
import Mine from "../../components/mine/index"
import './index.scss'
import {request} from "../../until/Api";

interface IState {
  current: number,
  site: object
}


export default class Index extends Component<any, IState> {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super()
    this.state = {
      current: 0,
      site: {}
    }
  }

  componentWillMount () {
    this.getSite()
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let { current } = this.state;
    return (
      <View className='index'>
        { current == 0 && <Home /> }
        { current == 2 && <Mine /> }
        <AtTabBar
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '专题', iconType: 'star' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick}
          current={current}
          fixed
          iconSize={20}
          fontSize={12}
        />
      </View>
    )
  }

  getSite = () => {
    let site = Taro.getStorageSync('site')
    let _this = this
    if (site) {
      Taro.setNavigationBarTitle({title: site.title})
      _this.setState({
        site
      })
    } else {
      request({
        name: 'site',
        success: (data) => {
          Taro.setStorageSync('site', data)
          Taro.setNavigationBarTitle({title: site.title})
          _this.setState({
            site: data
          })
        },
        error: (e) => console.info(e)
      })
    }
  }

  handleClick = value => {
    this.setState({
      current: value
    })
  }
}
