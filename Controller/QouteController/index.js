const Qoute = require('../../Model/qoute')

module.exports.getQoute = async(req, res) => {

    let userQoutes = await Qoute.find({userId: req.token_data._id})

    res.json(
        {
            error: false,
            success: true,
            qoute: userQoutes
        }
    )    
};

module.exports.postQoute = async(req, res) => {
    const {qouteNumber, quoteDate, referenceNumber, customerName, billingAddress, description, termsAndCondition, companyLogo, companyName, companyAddress, entityId, gstNumber, itemArray} = req.body

    if(!customerName || !billingAddress || !companyName || !companyAddress)
    {
        res.json(
            {
                error: true,
                success: false,
                message: "Some of the required field are missing!!!"
            }
        )
    }
    else if(itemArray.length < 1 || itemArray === undefined || itemArray === null)
    {
        res.json(
            {
                error: true,
                success: false,
                message: "Insufficient Item!!!"
            }
        )
    }
    else{
        const prevQoute = await Qoute.find({userId: req.token_data._id})
        var date = new Date().toLocaleDateString()
        date = date.split('/')
        const id = prevQoute.length + 1
        const year = date[2];
        var qouteId = "QT" +year + "-" + "0000" + id

        const qoute = {
            userId: req.token_data._id,
            qouteNumber: qouteId, 
            quoteDate, 
            referenceNumber, 
            customerName, 
            billingAddress, 
            description, 
            termsAndCondition, 
            companyLogo, 
            companyName, 
            companyAddress, 
            entityId, 
            gstNumber,
            items: JSON.parse(itemArray)
        }
        
        await Qoute.create(qoute).then(response => {
            res.json(
                {
                    error: false,
                    success: true,
                    message: "Qoute created successfully...."
                }
            )
        }).catch(err => {
            res.json(
                {
                    error: true,
                    success: false,
                    message: "An internal server error has been occurred!!!"
                }
            )
        })

    }
};

module.exports.viewQoute = async (req, res) => {
    const id = req.params.id;

    await Qoute.findById({_id: id}).then(result => {
        res.status(200).json(
            {
                error: false,
                success: true,
                message: "Qoute Found Successfully...",
                result
            }
        )
    }).catch(err => {
        res.status(501).json(
            {
                error: true,
                success: false,
                message: "Qoute Not Found...",
                err
            }
        )
    })

};