import { Component } from '@tarojs/taro'
import { View, Button, OpenData } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import "./index.scss"

interface IState {

}

export default class Mine extends Component<any, IState> {

  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <View className="mine">
        <View className="user-avatar">
          <AtAvatar circle size="large" openData={{type: 'userAvatarUrl'}}></AtAvatar>
          <OpenData type="userNickName" className="username"></OpenData>
        </View>
        <View>
          <AtList>
            <View className="overlay-box">
              <AtListItem
                title='联系客服'
                arrow='right'
                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              />
              <Button className="hidden-button" openType="contact"></Button>
            </View>
            <AtListItem
              title='清除缓存'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              onClick={this.clearStorage}
            />
          </AtList>
        </View>
      </View>
    )
  }

  contractUs = () => {

  }

  clearStorage = () => {

  }

}
