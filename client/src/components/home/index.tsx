import Taro, { Component} from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import "./index.scss"
import { api, request } from "../../until/Api";

interface IPost {
  path: string,
  title: string,
  date: string,
  keywords: string,
  cover: string,
  categories: object[],
  tags: object[]
}

interface IState {
  value: string,
  currentPage: number,
  pageCount: number,
  posts: IPost[],
}

export default class Index extends Component<any, IState> {

  constructor () {
    super()
    this.state = {
      value: '',
      currentPage: 0,
      pageCount: 1,
      posts: []
    }
  }
  componentDidMount () {
    this.getPosts()
  }
  render () {
    let {value, posts} = this.state;
    console.info(posts)
    return (
      <View>
        <Swiper
          className=''
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="aspectFill" src={require("./cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="aspectFill" src={require("./cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="aspectFill" src={require("./cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
        </Swiper>
        <AtSearchBar
          value={value}
          onChange={this.onChange}
          placeholder="搜索你感兴趣的内容..."
        />
        <View className="list">
          {
            posts.map(item => (
              <View className="article" key={item.title} onClick={() => this.viewDetail(item.path)}>
                <Image className="cover" src={item.cover} mode="aspectFill" lazyLoad={true}></Image>
                <View className="content">
                  <View className="title">{item.title}</View>
                  <View className="number">
                    <Text>{item.date}</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }

  onChange = (value) => {
    this.setState({
      value: value
    })
  }

  viewDetail = (path: string) => {
    Taro.navigateTo({
      url: `/pages/article/index?path=${path}`
    })
  }

  getPosts = () => {
    let _this = this
    let {currentPage, pageCount} = this.state
    if (currentPage < pageCount) {
      request({
        name: 'posts',
        data: { path: `${api.path.posts}/${currentPage+1}.json` },
        success: (data) => {
          console.info(data)
          let posts = data.data
          for (let i = 0, len = posts.length; i < len; i++) {
            if (posts[i].cover) {
              if (posts[i].cover.slice(0,2) == '//') {
                posts[i].cover = `https:${posts[i].cover}`
              } else if(posts[i].cover[0] == '/') {
                posts[i].cover = api.host + posts[i].cover
              }
            } else {
              posts[i].cover = require("./cover.jpg")
            }
          }
          _this.setState({
            posts,
            pageCount: data.pageCount,
            currentPage: currentPage + 1,
          })
        }
      })
    }
  }
}
