const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  userRole: String,
  address: String,
  contact: String,
  department: String,
  profile_pic: String,
  username: String,
  password: String,
  createdOn: String,
  isVerify:{
    type:Boolean,
    default:false
  },
  isHR: {
    type: Boolean,
    default: false
  },
  isManager: {
    type: Boolean,
    default: false
  },
  isEmployee: {
    type: Boolean,
    default: true
  },
  leaveDuration: {
    type: Number,
    default: 15
  },
  resetToken:String
  // leave: {
  //   paidLeave: {
  //     type: String,
  //     default: 'paidLeave'
  //   },
  //   unpaidLeave: {
  //     type: String,
  //     default: 'unpaidLeave'
  //   },
  //   normalLeave: {
  //     type: String,
  //     default: 'normalLeave'
  //   },
  //   totalLeave: {
  //     type: Number,
  //     default: 15
  //   }
  // }
});
userModel.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

module.exports = new mongoose.model("user", userModel);