import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import Home from "../../components/home/index"
import './index.scss'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    //
    // interface IState {
    //   current: number;
    // }
    //
    // this.state: IState = {
    //   current: 1
    // }

    this.state = {
      current: 1
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Home/>
        <AtTabBar
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '专题', iconType: 'star' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
          fixed
          iconSize={20}
          fontSize={12}
        />
      </View>
    )
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }
}
