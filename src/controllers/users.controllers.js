import express from 'express'
import bcrypt from "bcryptjs" 
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"


const router = express.Router()

router.post('/', async (req, res) => {
  const data = req.body
    
  data.password = bcrypt.hashSync(data.password, 8);

  prisma.user.create({
    data
  })
  .then((user) =>{
    return res.json(filter(user, 'id', 'name', 'email'))
  })
     .catch((err) =>{
        return res.status(500).send({
            error: formattedError,
          }); // friendly error handling
     }) 
    })
      throw err;
    


export default router