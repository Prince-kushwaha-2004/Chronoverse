import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { OrderData } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { postOrdersMutation } from "@/services/api/@tanstack/react-query.gen";
import { toast } from "sonner";
function OrderForm({ data }) {
    const orderMutation = useMutation(postOrdersMutation())
    const [formData, setFormData] = useState<OrderData>(
        {
            name: "",
            email: "",
            phoneNo: "",
            address: "",
            products: []
        }
    );
    console.log(data)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        orderMutation.mutate(
            {
                body: formData
            },
            {
                onSuccess: () => {
                    toast.success("Order Placed Successfully")
                    setFormData(
                        {
                            name: "",
                            email: "",
                            phoneNo: "",
                            address: "",
                            products: []
                        }
                    )
                    localStorage.setItem("carts", JSON.stringify([]))
                    data.setCarts([])
                },
                onError: (error) => {
                    toast.error(error.response?.data["error"])
                }
            }
        )

    };
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            products: data.carts
        }))
    }, [])

    return (
        <Sheet>
            <SheetTrigger >
                <div
                    className="mt-6 cursor-pointer  bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-full transition-all font-medium"
                >
                    Order Now
                </div>

            </SheetTrigger>
            <SheetContent
                className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg text-white rounded-xl p-4 w-full sm:max-w-md"
                side="right"
            >
                <SheetHeader>

                    <SheetTitle className="text-xl font-bold">Place Order</SheetTitle>
                    <SheetDescription className="text-gray-300">
                        Enter these details to place your Order.
                    </SheetDescription>


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
                        <Label htmlFor="email" className="mb-1">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phoneNo" className="mb-1">Phone No.</Label>
                        <Input
                            id="phoneNo"
                            name="phoneNo"
                            type="number"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="address" className="mb-1">Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            required
                        />

                    </div>
                    <div className="bg-white/10  border border-white/10 shadow-lg text-white rounded-xl p-4 w-full sm:max-w-md">
                        <h1 className="mb-1">Order Summary:</h1>
                        <hr />
                        <p className="my-3">Total Items: {data.totalProducts}</p>
                        {
                            data.cartItems.map((items, i) => {
                                return <div className="flex justify-between"><span>{items.name}({data.carts[i].quantity}) </span>  <span>₹ {items.price * data.carts[i].quantity}</span></div>
                            })
                        }
                        <hr className="my-3" />
                        <div className="flex justify-between"><span>Total Payable Amount : </span>  <span>₹ {data.totalAmount}</span></div>

                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full bg-violet-700 hover:bg-violet-800 text-white">
                            Pay Now
                        </Button>

                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default OrderForm;
