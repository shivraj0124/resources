const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
const db = process.env.dbUrl;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date }
});

const User = mongoose.model('User', userSchema);

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Send OTP route
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60000); // 5 minutes expiry

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, password: 'hello@', otp, otpExpiry });
        } else {
            user.otp = otp;
            user.otpExpiry = otpExpiry;
        }

        console.log(user);
        await user.save();
        console.log("Hello");

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        });

        res.send({success:true,message: 'OTP sent successfully',otpExpiry:otpExpiry });
    } catch (error) {
        console.log(error); 
        res.send({ success:false,message: 'Error sending OTP' });
    }
});

// Verify OTP route
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user ) {
            return res.send({success:false,message: 'User Not Exist' });
        }
        
        if (user.otp !== otp ) {
            return res.send({ success:false,message: 'Invalid OTP' });
        }
        if (user.otpExpiry < new Date()) {
            return res.send({ success:false,message: 'Expired OTP' });
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.send({success:true, message: 'OTP verified successfully' });
    } catch (error) {
        res.send({success:false, message: 'Error verifying OTP' });
    }
});

// Forgot Password route
app.post('/forgot-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({ success:false,message: 'User not found' });
        }

        user.password = password; 
        await user.save();

        res.send({ success:true,message: 'Password updated successfully' });
    } catch (error) {
        res.send({ success:false,message: 'Error updating password' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
