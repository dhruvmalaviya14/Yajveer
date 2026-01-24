// utils/shapeOrderForInvoice.js
export const shapeOrderForInvoice = (dbOrder) => {
  const o = dbOrder.toObject({ getters: true, virtuals: false });

  return {
    orderId: o.orderId,
    fullname: o.fullname,
    email: o.email,
    mobilenumber: o.mobilenumber,
    deliveryAddress: o.deliveryAddress,
    pincode: o.pincode,
    totalAmount: o.totalAmount,
    products: o.products.map((p) => ({
      name: p.productName, 
      weight : p.weightInGrams,
      quantity: p.quantity,
      price: p.basePrice,
    })),
  };
};
