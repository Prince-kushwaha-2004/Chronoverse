const { PrismaClient } = require('../generated/prisma/client')
const prisma = new PrismaClient()

module.exports.getCarts = async (req, res) => {
    const { cartsData } = req.body
    if (!cartsData || !Array.isArray(cartsData)) {
        return res.status(400).json({ error: "cartsData Required" })
    }
    if (cartsData.length == 0) {
        return res.status(200).json({ carts: [] })
    }

    const carts = []
    await cartsData.forEach(async (cartsItem) => {
        if (!cartsItem.productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }
        const product = await prisma.product.findUnique({
            where: { id: Number(cartsItem.productId), status: "ACTIVE" },
            select: {
                name: true,
                model: true,
                description: true,
                image: true,
                price: true,
                quantity: true,
                category: true,
            },
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found with given Product Id" });
        }
        carts.push({ ...product, quantity: cartsItem.quantity })
    });


    res.status(200).json(carts);
}