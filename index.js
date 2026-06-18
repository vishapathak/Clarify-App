const express = require('express')
const port = process.env.PORT || 8000;
const User = require('./Routes/userRoutes/getUser')
const company = require('./Routes/companyRoutes')
const invoice = require('./Routes/invoiceRoutes')
const bill = require('./Routes/billRoutes')
const qoute = require('./Routes/qouteRoutes')
const purchase = require('./Routes/purchaseOrderRoutes')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const path = require("path")
const cors = require('cors')

const url = process.env.DBURL // A duplicate index key error has been occured with this URL
// const url = "mongodb://localhost:27017/Fatroua"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('Database Connected Successfully....')).catch(()=> console.log('Ohhhh an error occured'))

app.use(cors());
app.use(bodyParser.json())

app.get("/test-route", (req, res)=>{res.status(200).send("<h1>Everything Alright 😉</h1>")}) //Test route

app.use(express.static(path.join(__dirname, 'public')))
app.use(User)
app.use(invoice)
app.use(bill)
app.use(qoute)
app.use(purchase)
app.use(company)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})
