import { Component } from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import "./index.scss"

interface IState {

}

export default class Index extends Component<any, IState> {

  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <View className="user-avatar">
        <AtAvatar circle size="large" openData={{type: 'userAvatarUrl'}}></AtAvatar>
        <OpenData type="userNickName" className="username"></OpenData>
      </View>
    )
  }
}
