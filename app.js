import express from "express";
import prisma from "./src/utils/prisma.js";
import cors from "cors";
import morgan from "morgan";
import authSellersRouter from "./src/controllers/auth.Seller.controllers.js"
import authUsersRouter from "./src/controllers/auth.User.controllers.js"
import sellersRouter from "./src/controllers/sellers.controllers.js"
import usersRouter from "./src/controllers/users.controllers.js"
import createBookingRouter from "./src/controllers/createBookings.controllers.js"

const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use("/auth-seller", authSellersRouter)
app.use("/auth-user", authUsersRouter)
app.use("/sellers", sellersRouter)
app.use("/users", usersRouter)
app.use("/create-bookings", createBookingRouter)


app.get("/getSeller/:slug", async (req, res) => {
  const sellerSlug = parseInt(req.params.slug);
  // using prisma, need to get seller details & seller details of specific seller. SellerId = seller slug
  try {
    const thatSeller = await prisma.seller.findUnique({
      where: {
        id: sellerSlug,
      },
    });

    // Return the mydetails as JSON response
    return res.json({ thatSeller }); // added user: for redirect.. place change to userid if needed
    
  } catch (error) {
    // Handle errors and return an error response if needed
    console.error("Error retrieving details:", error);
    res.status(500).json({ error: "Internal server error" });
  }

});
//need to implement auth later on
app.get("/my-details/:sellerId", async (req, res) => {
  const sellerId = parseInt(req.params.sellerId); // Parse userId from the URL parameter

  try {
    // Use Prisma to find images owned by the specified user
    const myDetails = await prisma.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    // Return the mydetails as JSON response
    return res.json({ myDetails, sellerId }); // added user: for redirect.. place change to userid if needed
  } catch (error) {
    // Handle errors and return an error response if needed
    console.error("Error retrieving details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;

app.patch('/update-details/:sellerId', async (req, res) => {
  const sellerId = parseInt(req.params.sellerId);
  const data = req.body;

  try {
    const updatedSeller = await prisma.seller.update({
      where: { id: sellerId },
      //data: updatedDetails,  might be can try later
      data: {
        name: data.name,
        email: data.email,
        rate: data.rate,
        language: data.language,
        experience: data.experience,
        pitch: data.pitch,
      },
    });

    return res.status(200).json({ message: 'Seller details updated successfully', updatedSeller });
  } catch (error) {
    console.error('Error updating seller details:', error);
    res.status(500).json({ error: 'Could not update seller details' });
  }
});


// things to note
// to start docker, we need to do this
//docker compose --env-file=.env.development up
//or
//docker compose --env-file=.env.development up -d # to run in detached mode

