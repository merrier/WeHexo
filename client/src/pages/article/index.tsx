import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { wxParse } from '../../components/wxParse/wxParse'
import { HeaderNavbar } from '../../components/headerNavbar/index'
import { Loading } from '../../components/loading/index'
import {api, request} from "../../until/Api";
import './index.scss'

interface IState {
  isloading: boolean,
  title: string,
  date: string,
  cover: string,
  contentStyle: object,
  loading: boolean,
}

export default class Index extends Component<any, IState> {

  config: Config = {
  }

  constructor () {
    super()
    this.state = {
      isloading: true,
      title: '',
      date: '',
      cover: '',
      contentStyle: {},
      loading: true,
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
        let cover
        if (data.covers && data.covers.length > 0) {
          cover = data.covers[0];
          if (cover && cover.slice(0, 2) === '//') {
            cover = `https:${cover}`
          } else if (cover && cover[0] === '/') {
            cover = `${api.host}/${cover}`
          } else {
            cover = require("../../images/cover.jpg")
          }
        } else {
          cover = require("../../images/cover.jpg")
        }
        _this.setState({
          title: data.title,
          date: data.date,
          cover,
        })
      }
    })
  }

  componentDidMount () {
    setTimeout(()=> {
      this.setState({
        loading: false
      })
    }, 20000)
  }

  render () {
    let {title, cover, contentStyle, loading} = this.state
    return (
      <View className="article">
        <HeaderNavbar hasBack={true} hasHome={true} hasTitle={true}/>
        <View className="article-cover">
          <Image className="article-cover-image" src={cover} mode="widthFix" onLoad={this.onCoverLoad}></Image>
        </View>
        {loading ? (<Loading/>) : (
          <ScrollView className='article-scroll' scrollY={true}>
            <View className="content" style={contentStyle}>
              <View className='article-title'>{title}</View>
              <import src="../../components/wxParse/wxParse.wxml"/>
              <template is="wxParse" data="{{wxParseData: article.nodes}}"/>
            </View>
          </ScrollView>
        )}
      </View>
    )
  }

  onCoverLoad = (e) => {
    console.info(this.state.cover)
    console.info(e.detail)
    let { width, height } = e.detail;
    let systemInfo = Taro.getStorageSync("systemInfo")
    let {windowWidth} = systemInfo
    let currentHeight = windowWidth * height / width
    if (currentHeight > windowWidth * .6) {
      currentHeight = windowWidth * .6
    }
    this.setState({
      contentStyle: {marginTop: `calc(${currentHeight}px - 20rpx)`},
      loading: false
    })
  }

}
