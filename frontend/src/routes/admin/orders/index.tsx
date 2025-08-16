import { createFileRoute } from '@tanstack/react-router'
import OrderTable from '@/components/order-table';
import { orderData } from '@/data/data';
export const Route = createFileRoute('/admin/orders/')({
    component: Orders,
})

function Orders() {



    const handleAccept = (product) => {
        console.log("accept:", product);
    };

    const handleReject = (product) => {
        console.log("reject:", product);
    };

    return (
        <>
            <div className='flex mt-10 justify-between'>
                <h1 className="text-2xl text-white font-bold  mb-4">Manage Orders </h1>

            </div>
            <OrderTable
                orders={orderData}
                onAccept={handleAccept}
                onReject={handleReject}
            />

        </>
    )
}
