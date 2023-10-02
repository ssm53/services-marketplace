import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"


const router = express.Router()

router.post('/', async (req, res) => {
  const data = req.body

  prisma.booking.create({
    data
  })
  .then((booking) =>{
    return res.json(filter(booking, 'id', 'sellerName', 'sellerEmail', 'sellerIdBooking', 'userBooking', 'userIdBooking', 'sellerRate', 'sellerLanguage', 'sellerExperience', 'userName', 'userEmail', 'bookingDate', 'bookingTime', 'bookingDuration', 'bookingPrice', 'bookingRequest'))
  })
     .catch((err) =>{
      const formattedError = {}
        return res.status(500).send({
            error: formattedError,
          }); // friendly error handling
     }) 
    })
     
    


export default router