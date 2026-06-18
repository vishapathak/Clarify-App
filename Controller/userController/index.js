const User = require("../../Model/user");
const Authentication = require("../../Middlewares/Authorization")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config();

const register = async (req, res) => {
  const { fname, lname, email,  phone, password, referral } = req.body;

  if (!fname || !lname || !email || !phone || !password)
    res.json({
      error: true,
      success: false,
      message: "some of the fields are missing!!!",
    });
  const check = await User.findOne({email: email });

  if(check == null)
    {            
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
              fname,
              lname,
              email,
               phone,
              password: hashedPassword,
              referral,
            });
            User.create(user)
              .then((resp) =>
                res.json({
                  error: false,
                  success: true,
                  message: "User registered successfully....",
                })
              )
              .catch((err) =>{
                res.json({
                  error: true,
                  success: false,
                  message:
                    "An internal server error has been occurred while registering!!!!",
                  err
                })
              }
             
              );
            }
            else{
                res.json(
                    {
                        error: true,
                        success: false,
                        message: "An user already registered with this email!!!!",
                    }
                  )
            }
};

const login = async (req, res) =>{
    const {email, password} = req.body 

    if(!email || !password)
    {
        return res.json(
            {
                error: true,
                success: false,
                message: "An required field is missing from the given input!!!"
            }
        )
    }

    const user = await User.findOne({email: email})

    if(user == null)
    {
        return res.json(
            {
                error: true,
                success: false,
                message: "User not found with the inserted email!!!"
            }
        )
    }
    else
    {

        const match = bcrypt.compareSync(password, user.password)

        if(!match)
        {
            return res.json(
                {
                    error: true,
                    success: false,
                    message: "Password mismatch!!!"
                }
            )
        }
        else{
            const token = jwt.sign({_id: user._id}, process.env.MY_SECRET, {expiresIn: "180000000000s"})
            
            res.cookie("token", token, {
                httpOnly: true
            })
            return res.json({
                    error: false,
                    success: true,
                    message: "User logined successfully....",
                    user: user,
                    token: token
                })
        }

    }
}

const getUser = async(req, res) => {
  const user = await User.findById({_id: req.token_data._id})
  res.json(user)
}
const updateUser = async(req, res) => {
  const {fname, lname, email,  phone} = req.body 

  const user = await User.findByIdAndUpdate({_id: req.token_data._id}, {fname, lname, email,  phone}).then(()=>{
    res.json(
      {
        error: false,
        success: true,
        message: "User Information updated successfully....",
      }
    )
  }).catch(()=>{
    res.json(
      {
        error: true,
        success: false,
        message: "An error is occurred while updating user data!!!",
      }
    )
  })
}

module.exports = { register, login, getUser, updateUser};
