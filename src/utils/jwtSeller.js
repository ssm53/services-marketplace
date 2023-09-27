import jwt from 'jsonwebtoken'
const sellerAccessTokenSecret = process.env.SELLER_APP_SECRET

export function signSellerAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, sellerAccessTokenSecret, {
    }, (err, token) => {
      if (err) {
        reject("Something went wrong")
      }
      resolve(token)
    })
  })
}

export function verifySellerAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return reject(message)
      }
      resolve(payload)
    })
  })
}

