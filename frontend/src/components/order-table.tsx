import React from "react";
import { Button } from "./ui/button";

const OrderTable = ({ orders, onAccept, onReject }) => {
    return (
        <div className="overflow-x-auto rounded-2xl shadow-xl backdrop-blur-md bg-white/5">
            <table className="min-w-full table-auto text-left text-sm text-gray-300">
                <thead className="bg-white/10 backdrop-blur-sm text-gray-100">
                    <tr>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Model</th>
                        <th className="px-6 py-3">Quantity</th>
                        <th className="px-6 py-3">Customer Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Mobile</th>
                        <th className="px-6 py-3">Address</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, idx) => (
                        <tr
                            key={idx}
                            className="hover:bg-white/10 transition duration-200 ease-in-out"
                        >
                            <td className="px-6 py-4">{order.productName}</td>
                            <td className="px-6 py-4">{order.model}</td>
                            <td className="px-6 py-4">{order.quantity}</td>
                            <td className="px-6 py-4">{order.customerName}</td>
                            <td className="px-6 py-4">{order.email}</td>
                            <td className="px-6 py-4">{order.mobile}</td>
                            <td className="px-6 py-4 line-clamp-2 max-w-xs">{order.address}</td>
                            <td className="px-6 py-4 space-x-2">
                                <Button
                                    onClick={() => onAccept(order)}
                                    variant="ghost"
                                    className="cursor-pointer !bg-violet-500/10 backdrop-blur-md border border-violet-500/20 text-violet-400 hover:!bg-violet-500/20 hover:text-white transition"
                                >
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => onReject(order)}
                                    variant="ghost"
                                    className="cursor-pointer !bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-500 hover:!bg-red-500/20 hover:text-white transition"
                                >
                                    Reject
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
