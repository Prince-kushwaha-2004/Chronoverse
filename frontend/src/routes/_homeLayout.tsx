import { createFileRoute, Outlet } from '@tanstack/react-router'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { useRouter } from '@tanstack/react-router'
import Loader from '@/components/loader'
import { getLoginOptions } from '@/services/api/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'
export const Route = createFileRoute('/_homeLayout')({
  component: homeLayout,
})

function homeLayout() {
  const router = useRouter()
  const { data, isLoading: loading, isSuccess } = useQuery({
    ...getLoginOptions({}),
    retry: false,
  });

  if (loading) {
    return <Loader />
  }
  if (isSuccess) {
    if (data.user_data) {
      console.log(data.user_data)
      router.navigate({ to: "/admin" })
    }
  }

  return <>
    <div className="w-screen min-h-screen custome-bg-2 ">
      <div className='h-screen  flex flex-col '>
        <Nav role="user" />
        <div className='flex-1 px-[1rem] sm:px-[2rem] 2xl:px-[10rem] flex justify-center items-center'>
          <Outlet />

        </div>
      </div>

      <Footer />
    </div>
  </>

}
