require("dotenv").config();
require("express-async-errors");

// packages Imports  ====================>
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload =require('express-fileupload');
const rateLimiter = require('express-rate-limit'); 
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const helmet =require('helmet');
const RazorPay = require("razorpay");
// database connect =============>
const connectDB = require("./db/connect");

// Routers Imports ======================>
const authRouter = require("./routes/authRouter");
const userRouter = require('./routes/userRoutes');
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRouter");
const brandRouter = require("./routes/brandsRouter");
const categoryRouter = require("./routes/categoryRouter");
const filterRouter = require("./routes/filterRouter");
const reviewRouter = require("./routes/reviewRouter");
const orderRouter = require('./routes/orderRouter');





// MiddleWares Imports  ===========>
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { loginController } = require("./controllers/authController");




// MiddleWares ===========>
// behind the proxy , app.set('trust proxy',1);
// app.use(rateLimiter({
//   windowMs:15 *60*1000,
//   max:60, 
// }))
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());
// app.use((req,res,next)=>{
//   console.log(req.headers);
//   next();
// })

app.use(
  cors({
    origin: "https://ecommerce-store-full.netlify.app/",
    credentials: true,
  })
);
// app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); /// to parse json type body
// if your signed flag is true please provide JWT_SECRET to encrypt
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'))
app.use(fileUpload());


// app.options((req,res)=>{

// })
// Routes are starting from here  ....
app.get("/", (req, res) => {
  res.json({ success: true });
});
app.post("/api/v1", (req, res) => {
  console.log(req.body);
  
  console.log(req.cookies); //--> when signed:false,
  // console.log(req.cookie);
  console.log(req.signedCookies); // --> when signed:true
  res.json({ success: true });
});


// use Routers =================>
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/filters", filterRouter);

// Use MiddleWare ==================>
// --->why 404 before the error Handle One
// express will check all the routes and when finally done if there does not exists any any route 404 is made
app.use(notFoundMiddleWare);
// if any existing Routes throw error then
// error HandleMiddleWare() will handle It
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 5000;
const start = async () => {
  try {

    // console.log(port);
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected ......")
    await app.listen(port, () => {
      console.log("Server started Listening in App.js Backend");
    });
    // await act();
  } catch (error) {
    console.log(error);
  }
};

start();

