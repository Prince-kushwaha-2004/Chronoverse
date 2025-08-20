import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
                            <td className="px-6 py-4">{order.product.name}</td>
                            <td className="px-6 py-4">{order.product.model}</td>
                            <td className="px-6 py-4">{order.quantity}</td>
                            <td className="px-6 py-4">{order.name}</td>
                            <td className="px-6 py-4">{order.email}</td>
                            <td className="px-6 py-4">{order.phoneNo}</td>
                            <td className="px-6 py-4 line-clamp-2 max-w-xs">{order.address}</td>
                            <td className="px-6 py-4 space-x-2 ">
                                {order.orderStatus === "ACCEPTED" ? (
                                    <p className="text-green-500 text-center font-bold">Accepted</p>
                                ) : order.orderStatus === "REJECTED" ? (
                                    <p className="text-red-500 text-center font-bold">Rejected</p>
                                ) : (
                                    <>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <div

                                                    className="cursor-pointer m-2 !bg-violet-500/10 backdrop-blur-md border border-violet-500/20 text-violet-400 hover:!bg-violet-500/20 hover:text-white transition px-4 py-2 rounded-md"
                                                >
                                                    Accept
                                                </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Do you want to accept this order?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="cursor-pointer">NO</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onAccept(order)} className="cursor-pointer">Yes</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <div
                                                    className="cursor-pointer m-2 !bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-400 hover:!bg-red-500/20 hover:text-white transition px-4 py-2 rounded-md"
                                                >
                                                    Reject
                                                </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Do you Reject this order?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="cursor-pointer">NO</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onReject(order)} className="cursor-pointer">Yes</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
