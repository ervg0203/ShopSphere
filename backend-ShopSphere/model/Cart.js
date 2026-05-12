const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  quantity: { type: Number },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: { type: [Schema.Types.Mixed], default: [] },
  total: { type: Number, default: 0 },
  discountedTotal: { type: Number, default: 0 },
  totalProducts: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
  shippingAddress: { type: Schema.Types.Mixed, default: null },
  paymentMethod: { type: String },
  status: { type: String, default: "active" },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Cart = mongoose.model("Cart", cartSchema);
