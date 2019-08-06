import Taro, { Component } from "@tarojs/taro"
import { View, Button } from "@tarojs/components"

export default class Login extends Component {
  state = {
    context: {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        this.setState({
          context: res.result
        })
      })
  }

  render() {
    console.info(this.state.context)
    return (
      <View className='index'>
        <Button onClick={this.getLogin}>获取登录云函数</Button>
        {/*<Text>context：{JSON.stringify(this.state.context)}</Text>*/}
      </View>
    )
  }
}
