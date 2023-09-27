import { validateUserLogin } from "../validators/authUser.js"
import express from 'express'
import prisma from "../utils/prisma.js"
import { signUserAccessToken } from "../utils/jwtUser.js"
import bcrypt from "bcryptjs"
import { filter } from "../utils/common.js"
const router = express.Router()


router.post('/', async (req, res) => {
    const data = req.body
    console.log(req.body)
  
    const validationErrors = validateUserLogin(data)
  
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
      error: validationErrors
    })
  
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
  
    if (!user) return res.status(401).send({
      error: 'Email address or password not valid'
    })
      const checkPassword = bcrypt.compareSync(data.password, user.password)

    if (!checkPassword) return res.status(401).send({
      error: 'Email address or password not valid'
    })
  
    const userFiltered = filter(user, 'id', 'name', 'email', 'rate', 'language', 'experience', 'pitch')
    const userAccessToken = await signUserAccessToken(userFiltered)
    const userId = user.id
    return res.json({ userAccessToken, userId })
  })
  
  export default router

