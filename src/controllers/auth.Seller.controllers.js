import { validateSellerLogin } from "../validators/authSeller.js"
import express from 'express'
import prisma from "../utils/prisma.js"
import { signSellerAccessToken } from "../utils/jwtSeller.js"
import bcrypt from "bcryptjs"
import { filter } from "../utils/common.js"
const router = express.Router()


router.post('/', async (req, res) => {
    const data = req.body
    console.log(req.body)
  
    const validationErrors = validateSellerLogin(data)
  
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
      error: validationErrors
    })
  
    const seller = await prisma.seller.findUnique({
      where: {
        email: data.email
      }
    })
  
    if (!seller) return res.status(401).send({
      error: 'Email address or password not valid'
    })
      const checkPassword = bcrypt.compareSync(data.password, seller.password)

    if (!checkPassword) return res.status(401).send({
      error: 'Email address or password not valid'
    })
  
    const sellerFiltered = filter(seller, 'id', 'name', 'email', 'rate', 'language', 'experience', 'pitch')
    const sellerAccessToken = await signSellerAccessToken(sellerFiltered)
    const sellerId = seller.id
    return res.json({ sellerAccessToken, sellerId })
  })
  
  export default router

