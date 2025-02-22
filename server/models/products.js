const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    unit_type: { type: String, required: true },
    unit_price: { type: Number, required: true },
    status: { type: String, required: true, default: 'available', enum:['available', 'out of stock'] },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, default: 0 },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    discount: { type: Number, default: 0 },
    comments: [
        {
            buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            comment_desc: { type: String, required: true },
            rating_given: { type: Number, min: 1, max: 5, required: true },
        },
    ],
});

module.exports = mongoose.model('Product', productSchema);