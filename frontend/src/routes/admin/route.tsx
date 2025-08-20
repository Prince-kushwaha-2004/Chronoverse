import { createFileRoute, Outlet } from '@tanstack/react-router'
import Nav from '@/components/nav'
import StatsCardGroup from '@/components/status-card';
import { useQuery } from '@tanstack/react-query';
import { getLoginOptions } from '@/services/api/@tanstack/react-query.gen';
import { AxiosError } from 'axios';
import { useRouter } from '@tanstack/react-router';
import Loader from '@/components/loader';
import { getGetStatsOptions } from '@/services/api/@tanstack/react-query.gen';

export const Route = createFileRoute('/admin')({
  component: AdminComponent,
})


function AdminComponent() {
  const router = useRouter()
  const { error, isLoading: loading, isError } = useQuery({
    ...getLoginOptions({}),
    retry: false,
  });
  const { data: stats, isLoading: dataLoading } = useQuery({
    ...getGetStatsOptions({}),
    retry: false,
  });

  if (loading || dataLoading) {
    return <Loader />
  }
  if (isError) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status == 401) {
      console.log(axiosError.response)
      router.navigate({ to: "/login" })
    }
  }

  // const stats = {
  //   totalProducts: 120,
  //   totalOrders: 342,
  //   productsLeft: 55,
  //   soldProducts: 65,
  // };

  return (<div className="text-white  w-full custome-bg-2 min-h-screen px-[2rem] 2xl:px-[10rem]">
    <Nav role="admin" />
    <div className="container mx-auto py-10">
      <div className="p-6  ">
        <StatsCardGroup stats={stats} />
        <Outlet />
      </div>
    </div>
  </div>
  )

}
