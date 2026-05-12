const { Cart } = require("../model/Cart");

function normalizeCartPayload(body) {
  const payload = { ...body };

  if (payload.product && typeof payload.product === "object") {
    payload.product = payload.product.id || payload.product._id || null;
  }

  if (payload.productId && !payload.product) {
    payload.product = payload.productId;
  }

  delete payload.productId;

  return payload;
}

function toLegacyCartItem(cartDoc) {
  if (!cartDoc || !cartDoc.products?.length) {
    return cartDoc;
  }

  const firstProduct = cartDoc.products[0];
  return {
    ...cartDoc,
    user: cartDoc.user || cartDoc.userId,
    product: firstProduct,
    quantity: cartDoc.totalQuantity || firstProduct.quantity || 1,
  };
}

exports.fetchCartByUser = async (req, res) => {
  const { user, userId, aggregate } = req.query;
  try {
    const query = {};
    if (user) {
      query.user = user;
    }
    if (userId) {
      query.userId = userId;
    }

    const cartDocs = await Cart.find(query).populate("product");
    if (aggregate === "true") {
      return res.status(200).json(cartDocs.map((doc) => doc.toJSON()));
    }

    res.status(200).json(cartDocs.map((doc) => toLegacyCartItem(doc.toJSON())));
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  const cartPayload = normalizeCartPayload({
    ...req.body,
    userId: req.body.userId ?? req.body.user ?? null,
  });

  if (Array.isArray(cartPayload.products) && cartPayload.products.length > 0) {
    cartPayload.totalProducts = cartPayload.products.length;
    cartPayload.totalQuantity = cartPayload.products.reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    );
  }

  const cart = new Cart(cartPayload);
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const updatePayload = normalizeCartPayload({ ...req.body });
    if (
      Array.isArray(updatePayload.products) &&
      updatePayload.products.length
    ) {
      updatePayload.totalProducts = updatePayload.products.length;
      updatePayload.totalQuantity = updatePayload.products.reduce(
        (total, item) => total + (item.quantity || 0),
        0,
      );
    }

    const cart = await Cart.findByIdAndUpdate(id, updatePayload, {
      new: true,
    });
    const result = await cart.populate("product");

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
