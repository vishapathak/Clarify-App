const { findOneAndUpdate, findOne } = require("../../Model/company");
const Company = require("../../Model/company");

module.exports.getCompany = async (req, res) => {
  const company = await Company.find({ userId: req.token_data._id });
  res.json({
    error: false,
    success: true,
    company: company,
  });
};
module.exports.postCompany = async (req, res) => {
  const {
    companyName,
    entityId,
    companyAddress,
    gstNumber,
    currencySelection,
    decimal,
    qrHeading,
    eSign,
  } = req.body;

  const findCompanyExistance = await Company.findOne({ userId: req.token_data._id });

  console.log("hello : ", findCompanyExistance)

  if (!findCompanyExistance) {
    const userId = req.token_data._id;

    const company = {
      userId,
      companyName,
      entityId,
      companyAddress,
      gstNumber,
      currencySelection,
      decimal,
      qrHeading,
      eSign,
    };

    await Company.create(company)
      .then(() => {
        res.json({
          error: false,
          success: true,
          message: "Company added successfully for the logined user...",
        });
      })
      .catch((err) => {
        res.json({
          error: true,
          success: false,
          message: "An error has been occurred while adding a company!!!",
          dev: err,
        });
      });
  }
  else{
    res.json(
      {
        error: true,
        success: false,
        message: "A company already exists for logined user, and can not be add company twice!!"
      }
    )
  }
};
module.exports.updateCompany = async (req, res) => {
  console.log('executed....')
  const {
    companyName,
    entityId,
    companyAddress,
    gstNumber,
    currencySelection,
    decimal,
    qrHeading,
    eSign,
  } = req.body;

  await Company.findOneAndUpdate(
    { userId: req.token_data._id },
    {
      companyName,
      entityId,
      companyAddress,
      gstNumber,
      currencySelection,
      decimal,
      qrHeading,
      eSign,
    }
  )
    .then(() => {
      res.json({
        error: false,
        success: true,
        message: "Updated successfully....",
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        success: false,
        message:
          "An internal server error has been occurred while updating data!!!",
      });
    });
};
