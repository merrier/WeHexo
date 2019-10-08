import Taro, { Component} from '@tarojs/taro'
import { View, ScrollView, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar, AtLoadMore } from 'taro-ui'
import "./index.scss"
import { api, request } from "../../until/Api";
import Loading from '../../components/loading/index'

interface IPost {
  path: string,
  title: string,
  date: string,
  keywords: string,
  cover: string,
  categories: object[],
  tags: object[],
}

interface IState {
  value: string,
  currentPage: number,
  pageCount: number,
  posts: IPost[],
  loading: boolean,
  status: 'more'|'loading'|'noMore'
}

export default class Home extends Component<any, IState> {

  constructor () {
    super()
    this.state = {
      value: '',
      currentPage: 0,
      pageCount: 1,
      posts: [],
      loading: true,
      status: "loading"
    }
  }
  componentWillMount () {
    this.getPosts()
  }
  render () {
    let {value, posts, loading} = this.state;
    return (
      <ScrollView className="home" scrollY onScrollToLower={this.loadMorePosts}>
        <Swiper
          className='swiper-container'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="aspectFill" src={require("../../images/cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="aspectFill" src={require("../../images/cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="aspectFill" src={require("../../images/cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
        </Swiper>
        <AtSearchBar
          value={value}
          onChange={this.onChange}
          placeholder="搜索你感兴趣的内容..."
          onActionClick={this.searchContent}
        />
        <View className="list">
          {loading ? (<Loading height='60vh'></Loading>) : (
            <View>
              <View>
                {
                  posts.map(item => (
                    <View className="article" key={item.title} onClick={()=>this.viewDetail(item.path)}>
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
              <AtLoadMore
                status={this.state.status}
              />
            </View>
          )}
        </View>
      </ScrollView>
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
    let oldPosts = this.state.posts
    if (currentPage < pageCount) {
      request({
        name: 'posts',
        data: { path: `${api.path.posts}/${currentPage+1}.json` },
        success: (data) => {
          let posts = data.data
          for (let i = 0, len = posts.length; i < len; i++) {
            if (posts[i].cover) {
              if (posts[i].cover.slice(0,2) == '//') {
                posts[i].cover = `https:${posts[i].cover}`
              } else if(posts[i].cover[0] == '/') {
                posts[i].cover = api.host + posts[i].cover
              }
            } else {
              posts[i].cover = require("../../images/cover.jpg")
            }
            posts[i].date = posts[i].date.split("T")[0]
          }
          _this.setState({
            posts: [...oldPosts, ...posts],
            pageCount: data.pageCount,
            currentPage: currentPage + 1,
            loading: false
          })
        }
      })
    }
  }
  loadMorePosts = () => {
    let {currentPage, pageCount} = this.state
    if (currentPage < pageCount) {
      this.setState({
        status: 'loading'
      })
      this.getPosts()
    } else {
      this.setState({
        status: 'noMore'
      })
    }
  }

  searchContent = () => {
    let {value} = this.state;
    request({
      name: "search",
      data: {searchKey: value},
      type: 2,
      success: data => {
        console.info(data)
      }
    })
  }
}
