import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { wxParse } from '../../wxParse/wxParse'
import {request} from "../../until/Api";

interface IState {
  isloading: boolean,
  title: string,
  date: string,
}

export default class Index extends Component<any, IState> {

  config: Config = {
  }

  constructor () {
    super()
    this.state = {
      isloading: true,
      title: '',
      date: ''
    }
  }

  componentWillMount () {
    let {path} = this.$router.params;
    let _this = this;

    request({
      name: 'article',
      data: {path: `/${path}`},
      success: (data) => {
        wxParse('article', 'html', data.content, _this.$scope, 5);
        Taro.setNavigationBarTitle({title: data.title})
        _this.setState({
          title: data.title,
          date: data.date,
        })
      }
    })
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className=''>
        <import src="../../wxParse/wxParse.wxml"/>
        <template is="wxParse" data="{{wxParseData: article.nodes}}"/>
      </View>
    )
  }

}
