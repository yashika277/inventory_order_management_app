require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
const dbConnect = require("./config/dbConnect");

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const inventoryRoutes = require('./routes/inventory.route');
const orderRoutes = require('./routes/order.route');


//body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

//cookie
app.use(cookieParser());

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Product routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes); // Order routes

//database connect
dbConnect();

app.get("/", (req, res) => {
    res.send(
        "<center><h1>Inventory and order management application</h1><br>Get Api <a href=https://github.com/yashika277/inventory_order_management_app.git target=_blank>Repository :Inventory and order management application</a></center>"
    );
});

//server
app.listen(process.env.PORT, () => {
    console.log(`server listening on port : ${process.env.PORT}`);

})