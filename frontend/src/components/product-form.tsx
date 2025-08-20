import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { baseURL } from "@/services/baseUrl";
import { PackagePlus } from 'lucide-react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductsMutation, patchProductsByIdMutation } from "@/services/api/@tanstack/react-query.gen";
import { ProductInput } from "@/services/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getProductsQueryKey, getGetStatsQueryKey } from "@/services/api/@tanstack/react-query.gen";
type formProps = {
    type: "add" | "update",
    data?: ProductInput
}

function ProductForm({ type, data }: formProps) {
    const [formData, setFormData] = useState<ProductInput>(
        {
            name: "",
            model: "",
            description: "",
            price: 0,
            quantity: 0,
        }
    );
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const addMutation = useMutation(postProductsMutation())
    const updateMutation = useMutation(patchProductsByIdMutation())
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "image" && e.target.files) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = new FormData();
        for (const key in formData) {
            const value = formData[key];
            if (value !== null) {
                if (key != "image") {
                    finalData.append(key, value);
                } else {
                    if (typeof (value) != "string") {
                        finalData.append(key, value);
                    }
                }
            }
        }
        if (type == "add") {
            addMutation.mutate(
                { body: formData },
                {
                    onSuccess: (data) => {
                        toast.success("Product Added Successfully")
                        queryClient.invalidateQueries({ queryKey: getProductsQueryKey({}) });
                        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey({}) });

                        setFormData({
                            name: "",
                            model: "",
                            description: "",
                            price: 0,
                            quantity: 0,
                        })
                        setPreviewUrl(null)
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data["error"]);
                    }
                }
            );

        } else {
            if (formData.id) {
                updateMutation.mutate(
                    { body: formData, path: { id: formData.id } },
                    {
                        onSuccess: (data) => {
                            toast.success("Product Updated Successfully")
                            queryClient.invalidateQueries({ queryKey: getProductsQueryKey({}) });
                            queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey({}) });

                        },
                        onError: (error) => {
                            toast.error(error?.response?.data["error"]);
                        }
                    }
                );
            }

        }
    };
    useEffect(() => {
        if (type === "update" && data) {
            setFormData(data);
            setPreviewUrl(baseURL + data.image);
        }
    }, [type, data]);

    return (
        <Sheet>
            <SheetTrigger >
                {type == "add" &&
                    <span className="cursor-pointer mb-2 py-2 px-3 rounded-md  bg-white/5 backdrop-blur-md shadow-md border border-white/10 w-full hover:bg-white/10 hover:text-white transition flex"><PackagePlus /> Add Product </span>
                }
                {type == "update" &&
                    <span
                        className="cursor-pointer m-1 py-2 px-3 rounded-md !bg-violet-500/10 backdrop-blur-md border border-violet-500/20 text-violet-500 hover:!bg-violet-500/20 hover:text-white transition"
                    >
                        Update
                    </span>
                }
            </SheetTrigger>
            <SheetContent
                className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg text-white rounded-xl p-4 w-full sm:max-w-md"
                side="right"
            >
                <SheetHeader>
                    {type == "add" &&
                        <>
                            <SheetTitle className="text-xl font-bold">Add New Product</SheetTitle>
                            <SheetDescription className="text-gray-300">
                                Fill in the product details below.
                            </SheetDescription>
                        </>
                    }
                    {type == "update" &&
                        <>
                            <SheetTitle className="text-xl font-bold">Update Product</SheetTitle>
                            <SheetDescription className="text-gray-300">
                                Update the product details below.
                            </SheetDescription>
                        </>
                    }

                </SheetHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="name" className="mb-1">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="model" className="mb-1">Model</Label>
                        <Input
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="mb-1">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="category" className="mb-1">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, category: value as ProductInput["category"] }))
                            }
                        >
                            <SelectTrigger
                                className="w-full bg-white/10 border border-white/20 text-white backdrop-blur-md"
                            >
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="backdrop-blur-md bg-black/80 border border-white/20 text-white">
                                <SelectItem value="ROLEX">ROLEX</SelectItem>
                                <SelectItem value="OMEGA">OMEGA</SelectItem>
                                <SelectItem value="ZENITH">ZENITH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="image" className="mb-1">Upload Image</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            required={type == "add"}
                        />
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="mt-2 w-50 h-50 mx-auto rounded-lg object-cover "
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="quantity" className="mb-1">Quantity</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="price" className="mb-1">Price (₹)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="pt-4">
                        {type == "add" &&
                            <Button type="submit" className="w-full bg-violet-700 hover:bg-violet-800 text-white">
                                Add Product
                            </Button>
                        }
                        {type == "update" &&
                            <Button type="submit" className="w-full bg-violet-700 hover:bg-violet-800 text-white">
                                Update Product
                            </Button>
                        }

                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default ProductForm;
