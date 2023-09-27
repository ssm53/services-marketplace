import { verifySellerAccessToken } from '../utils/jwtSeller.js'

export default async function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({'error': 'Unauthorized'})
  }

  const token = req.headers.authorization.split(' ')[1]
  if (!sellertoken) {x
    return res.status(401).send({ 'error': 'Unauthorized' })
  }

  await verifySellerAccessToken(token).then(seller => {
    req.seller = seller // store the user in the `req` object. our next route now has access to the user via `req.user`
    next()
  }).catch(e => {
    return res.status(401).send({ 'error': e.message })
  })
}