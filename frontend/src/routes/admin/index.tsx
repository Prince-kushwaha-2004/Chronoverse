import { createFileRoute } from '@tanstack/react-router'
import ProductTable from '@/components/product-table';
import ProductForm from '@/components/product-form';
import { useQuery } from '@tanstack/react-query';
import { getProductsOptions } from '@/services/api/@tanstack/react-query.gen';
import Loader from '@/components/loader';
export const Route = createFileRoute('/admin/')({
  component: Admin,
})

function Admin() {
  const { data, isLoading: loading } = useQuery({
    ...getProductsOptions({}),
    retry: false,
  }
  )
  console.log(data)

  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className='flex mt-10 justify-between'>
        <h1 className="text-2xl text-white font-bold  mb-4">Manage Product </h1>
        <ProductForm type="add" />

      </div>
      <ProductTable
        products={data}
      />
    </>

  )
}
