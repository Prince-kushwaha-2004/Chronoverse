const { PrismaClient } = require('../generated/prisma/client')
const prisma = new PrismaClient()


module.exports.createOrder = async (req, res) => {
    const { name, email, phoneNo, address, products } = req.body;

    if (!name || !email || !phoneNo || !address) {
        return res.status(400).json({ "error": "Name, email, phone number, and address are required" });
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ "error": "Products are required" });
    }


    for (const product of products) {
        if (!product.id || !product.quantity || typeof product.quantity !== 'number' || product.quantity <= 0) {
            return res.status(400).json({ "error": "Each product must have a valid id and quantity greater than 0" });
        }

        const productExists = await prisma.product.findUnique({
            where: { id: product.id, status: 'ACTIVE' }
        });
        if (!productExists) {
            return res.status(404).json({ "error": `Product with id ${product.id} not found` });
        }
        if (productExists.quantity < product.quantity) {
            return res.status(400).json({ "error": `Insufficient stock for product with id ${product.id}` });
        }
        await prisma.product.update({
            where: { id: product.id },
            data: {
                quantity: productExists.quantity - product.quantity
            }
        });

        await prisma.order.create({
            data: {
                name: name,
                email: email,
                phoneNo: phoneNo,
                address: address,
                productId: product.id,
                quantity: product.quantity
            }
        });

    }
    res.status(201).json({ message: "Order created successfully" });
}

module.exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "Order ID is required" });
    }
    const { orderStatus } = req.body;
    if (!orderStatus) {
        return res.status(400).json({ "error": "Order status is required" });
    }

    const orderExists = await prisma.order.findUnique({
        where: { id: parseInt(id), status: 'ACTIVE' }
    });
    if (!orderExists) {
        return res.status(404).json({ "error": "Order not found" });
    }

    const order = await prisma.order.update({
        where: { id: parseInt(id) },
        data: {
            orderStatus: orderStatus
        }
    });

    res.status(200).json({ message: "Order updated successfully", order });
}


module.exports.getOrders = async (req, res) => {
    const orders = await prisma.order.findMany({
        where: { status: 'ACTIVE' },
        select: {
            id: true,
            name: true,
            email: true,
            phoneNo: true,
            address: true,
            orderStatus: true,
            product: {
                select: {
                    name: true,
                    model: true,
                    image: true,
                }
            },
            quantity: true,
        },
    });

    res.status(200).json(orders);
}