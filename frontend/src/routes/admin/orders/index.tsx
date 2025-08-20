import { createFileRoute } from '@tanstack/react-router'
import OrderTable from '@/components/order-table';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
export const Route = createFileRoute('/admin/orders/')({
    component: Orders,
})
import { useQuery } from '@tanstack/react-query';
import { getOrdersOptions, getOrdersQueryKey, patchOrdersByIdMutation, getGetStatsQueryKey } from '@/services/api/@tanstack/react-query.gen';
import Loader from '@/components/loader';
import { useQueryClient } from '@tanstack/react-query';

function Orders() {
    const queryClient = useQueryClient();
    const updateOrderMutation = useMutation(patchOrdersByIdMutation());
    const { data: orders, isLoading } = useQuery(getOrdersOptions());

    if (isLoading) {
        return <Loader />;
    }

    const handleAccept = (product) => {
        updateOrderMutation.mutate(
            {
                body: {
                    orderStatus: "ACCEPTED"
                },
                path: {
                    id: product.id
                }
            },
            {
                onSuccess: () => {
                    toast.success("Order accepted successfully");
                    queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
                    queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });

                },
                onError: (error) => {
                    toast.error(error.response?.data["error"])
                }
            }
        );
    };

    const handleReject = (product) => {
        updateOrderMutation.mutate(
            {
                body: {
                    orderStatus: "REJECTED"
                },
                path: {
                    id: product.id
                }
            },
            {
                onSuccess: () => {
                    toast.success("Order Rejected successfully");
                    queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
                    queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });

                },
                onError: (error) => {
                    toast.error(error.response?.data["error"])
                }
            }
        );
    };

    return (
        <>
            <div className='flex mt-10 justify-between'>
                <h1 className="text-2xl text-white font-bold  mb-4">Manage Orders </h1>

            </div>
            <OrderTable
                orders={orders}
                onAccept={handleAccept}
                onReject={handleReject}
            />
        </>
    )
}
