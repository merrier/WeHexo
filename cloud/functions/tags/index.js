const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    let {url} = event
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let result = JSON.parse(body)
        resolve(result)
      } else {
        reject()
      }
    })
  })
}