const { PrismaClient } = require('../generated/prisma/client')
const prisma = new PrismaClient()


module.exports.createProduct = async (req, res) => {
    const { name, model, description, price, quantity, category } = req.body;
    if (!name || !model || !description || !price || !quantity || !category) return res.status(400).json({ error: "Insufficient product data" });

    const imageFile = req.file;
    if (!imageFile) return res.status(400).json({ error: "Image file is required" });

    const imagePath = `/media/${imageFile.filename}`;

    const product = await prisma.product.create({
        data: {
            name,
            model,
            description,
            image: imagePath,
            price: Number(price),
            quantity: Number(quantity),
            category,
        },
        omit: {
            id: true,
            createAt: true,
            updateAt: true,
            status: true,
        },

    });
    res.status(201).json({ message: "Product created successfully", product });
};

module.exports.getAllProducts = async (req, res) => {

    const products = await prisma.product.findMany({
        where: {
            status: "ACTIVE"
        },
        select: {
            id: true,
            name: true,
            model: true,
            image: true,
            price: true,
            quantity: true,
            category: true,
            description: true

        },
    });
    res.status(200).json(products);
};


module.exports.getProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }
    const product = await prisma.product.findUnique({
        where: { id: Number(id), status: "ACTIVE" },
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
        return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);

};

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Product ID is required" });
    const existingProduct = await prisma.product.findUnique({
        where: { id: Number(id), status: "ACTIVE" },
    });
    if (!existingProduct) return res.status(404).json({ error: "Product not found" });

    const { name, model, description, price, quantity, category } = req.body;
    const imageFile = req.file;

    let imagePath = existingProduct.image;

    if (imageFile) {
        if (imagePath) {
            const oldImagePath = path.join(__dirname, '..', imagePath);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        imagePath = `/media/${imageFile.filename}`;
    }

    const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            name,
            model,
            description,
            image: imagePath,
            price: Number(price),
            quantity: Number(quantity),
            category,
        },
        omit: {
            id: true,
            createAt: true,
            updateAt: true,
            status: true,
        },
    });

    res.status(200).json(updatedProduct);
};

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Product ID is required" });

    const existingProduct = await prisma.product.findUnique({
        where: { id: Number(id), status: "ACTIVE" },
    });
    if (!existingProduct) return res.status(404).json({ error: "Product not found" });

    await prisma.product.update({
        where: { id: Number(id) },
        data: {
            status: "DELETED",
        },
    });

    res.status(200).json({ message: "Product deleted successfully" });
};

