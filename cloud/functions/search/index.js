const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    let {url, searchKey} = event
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let result = JSON.parse(body)
        let { posts } = result
        let searchResult = []
        console.info(posts[0])
        console.info(posts[1])
        for (let i = 0, len = posts.length; i < len; i++) {
          let postText = posts[i].text
          // let postText = JSON.stringify(posts[i]);
          if (postText.indexOf(searchKey) > -1) {
            searchResult.push(posts[i])
          }
        }
        resolve(searchResult)
      } else {
        reject()
      }
    })
  })
}