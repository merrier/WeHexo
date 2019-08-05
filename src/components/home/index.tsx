import { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import "./index.scss"

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      current: 0
    }
  }

  render () {
    return (
      <View>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="center" src={require("./cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="center" src={require("./cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-card'>
              <Image mode="center" src={require("./cover.jpg")} className="swiper-image"/>
            </View>
          </SwiperItem>
        </Swiper>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          placeholder="搜索你感兴趣的内容..."
        />
      </View>
    )
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }
}
