import Taro, { Component, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import "./index.scss"

interface IProps {
  loading: boolean,
  size: number,
  color: string,
  backgroundColor: string,
  width: string,
  height: string,
}

interface IState {
  loading: boolean
}

export default class Loading extends Component<IProps, IState> {

  static defaultProps: IProps = {
    loading: true,
    backgroundColor: '#fff',
    size: 30,
    color: '#6190e8',
    width: '100vw',
    height: '100vh'
  }

  constructor () {
    super(...arguments)
    this.state = {
     loading: true
    }
  }
  componentWillMount() {
    this.setState({
      loading: this.props.loading
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.loading != this.props.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }
  render () {
    let { loading } = this.state;
    let { backgroundColor, size, color, width, height } = this.props;
    return (
      <View className="loading" style={{backgroundColor: backgroundColor, display: `${loading?'flex':'block'}`, width: width, height: height}}>
        <AtIcon className="loading-rotate" value="loading-2" size={size} color={color}></AtIcon>
      </View>
    )
  }

}

