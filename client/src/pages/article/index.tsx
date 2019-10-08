import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import HeaderNavbar from '../../components/headerNavbar/index'
import Loading from '../../components/loading/index'
import { wxParse } from '../../components/wxParse/wxParse'
import {api, request} from "../../until/Api";
import './index.scss'

type TTagAndCategory = {
  name: string,
  path: string,
  count: number
}

interface IState {
  isloading: boolean,
  title: string,
  date: string,
  cover: string,
  tags: TTagAndCategory[],
  categories: TTagAndCategory[],
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
      tags: [],
      categories: [],
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
        wxParse('article', 'html', data.content, _this.$scope, 20);
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
          date: data.date.split("T")[0],
          tags: data.tags,
          categories: data.categories,
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
    }, 5000)
  }

  render () {
    let {title, cover, date, tags, categories, contentStyle, loading} = this.state
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
              <View className="article-subtitle">
                <View className="article-subtitle-item">{date}</View>
                <View className="article-subtitle-item">
                  <AtIcon value='folder' size='14' color="#888"></AtIcon>
                  {
                    categories.map(item => (
                      <Text className="item" key={item.path}>{item.name}</Text>
                    ))
                  }
                </View>
                <View className="article-subtitle-item">
                  <AtIcon value='tag' size='14' color="#888"></AtIcon>
                  {
                    tags.map(item => (
                      <Text className="item" key={item.path}>{item.name}</Text>
                    ))
                  }
                </View>
              </View>
              <import src="../../components/wxParse/wxParse.wxml"/>
              <template is="wxParse" data="{{wxParseData: article.nodes}}"/>
            </View>
          </ScrollView>
        )}
      </View>
    )
  }

  onCoverLoad = (e) => {
    // console.info(e.detail)
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
