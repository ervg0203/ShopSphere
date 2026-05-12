const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  maidenName: { type: String },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  birthDate: { type: String },
  image: { type: String },
  bloodGroup: { type: String },
  height: { type: Number },
  weight: { type: Number },
  eyeColor: { type: String },
  hair: { type: Schema.Types.Mixed, default: {} },
  address: { type: Schema.Types.Mixed, default: {} },
  addresses: { type: [Schema.Types.Mixed], default: [] },
  ip: { type: String },
  macAddress: { type: String },
  university: { type: String },
  bank: { type: Schema.Types.Mixed, default: {} },
  company: { type: Schema.Types.Mixed, default: {} },
  ein: { type: String },
  ssn: { type: String },
  userAgent: { type: String },
  crypto: { type: Schema.Types.Mixed, default: {} },
  // Backward compatibility for existing screens that still read userInfo.name
  name: { type: String },
  orders: { type: [Schema.Types.Mixed], default: [] },
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

exports.User = mongoose.model("User", userSchema);
