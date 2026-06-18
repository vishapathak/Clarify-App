const Bill = require('../../Model/bills')

module.exports.getBills = async (req, res) => {
    const userBills = await Bill.find({userId: req.token_data._id})

    res.status(200).json(
        {
            error: false,
            success: true,
            bills: userBills
        }
    )
};

module.exports.postBills = async (req, res) => {
    const {billDate, dueDate, referenceNumber, customerName, billingAddress, shippingAddress, description, termsAndCondition, eSign, companyLogo, companyName, companyAddress, entityId, gstNumber, qrHeading, qrImage, itemArray} = req.body;
  if (!customerName || !billingAddress || !companyName) {
    res.status(501).json(
        {
            error: true,
            success: false,
            message: "Some of the requried fields are missing!!!"
        }
    )
  }
  else if(itemArray.length < 1 || itemArray === undefined || itemArray === null)
  {
    res.status(501).json(
        {
            error: true,
            success: false,
            message: "Insufficient Items!!!"
        }
    )
  }
  else
  {
    const prevBills = await Bill.find({userId: req.token_data._id})
    var date = new Date().toLocaleDateString()
    date = date.split('/')
    const id = prevBills.length + 1
    const year = date[2];
    var billId = "BL" +year + "-" + "0000" + id
    
    const bill = {
            userId: req.token_data._id,
            billNumber: billId, 
            billDate, 
            dueDate, 
            referenceNumber, 
            customerName, 
            billingAddress, 
            shippingAddress, 
            description, 
            termsAndCondition, 
            eSign, 
            companyLogo, 
            companyName, 
            companyAddress, 
            entityId, 
            gstNumber, 
            qrHeading, 
            qrImage,
            items: JSON.parse(itemArray)
    }
    await Bill.create(bill).then(()=>{
        res.status(200).json(
            {
                error: false,
                success: true,
                message: "bill created successfully...."
            }
        )
    }).catch(err=>{
        res.status(501).json(
            {
                error: true,
                success: false,
                message: "An internal server error has been occurred while creating bill!!!"
            }
        )
    })
  }
}

module.exports.viewBill = async (req, res) => {
    const id = req.params.id;

    await Bill.findById({_id: id}).then(result => {
        res.status(200).json(
            {
                error: false,
                success: true,
                message: "Bill Found Successfully...",
                result
            }
        )
    }).catch(err => {
        res.status(501).json(
            {
                error: true,
                success: false,
                message: "Bill Not Found...",
                err
            }
        )
    })

};