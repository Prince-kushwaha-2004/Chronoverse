import React from "react";
import ProductForm from "./product-form";
import { Button } from "./ui/button";
import { baseURL } from "@/services/baseUrl";
import { deleteProductsByIdMutation, getProductsQueryKey } from "@/services/api/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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

const ProductTable = ({ products }) => {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(deleteProductsByIdMutation())
  const handleDelete = (id) => {
    deleteMutation.mutate(
      {
        path: {
          id: id
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Product Deleted Successfully")
          queryClient.invalidateQueries({ queryKey: getProductsQueryKey({}) });
        },
        onError: (error) => {
          toast.error(error?.response?.data["error"]);
        }
      }
    )
  }
  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl backdrop-blur-md bg-white/5">
      <table className="min-w-full table-auto text-left text-sm text-gray-300">
        <thead className="bg-white/10 backdrop-blur-sm text-gray-100">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Model</th>
            <th className="px-6 py-3">Item Left</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr
              key={idx}
              className="hover:bg-white/10 transition duration-200 ease-in-out"
            >
              <td className="px-6 py-4">
                <img
                  src={baseURL + product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-white/20"
                />
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.model}</td>
              <td className="px-6 py-4">{product.quantity}</td>
              <td className="px-6 py-4">₹{product.price}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4 line-clamp-2 max-w-xs">{product.description}</td>
              <td className="px-6 py-4  space-x-2 space-y-6">
                <ProductForm type="update" data={product} />


                <AlertDialog>
                  <AlertDialogTrigger>
                    <span
                      className="px-3 m-2 cursor-pointer p-2 rounded-lg  !bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-500 hover:!bg-red-500/20 text-md"
                    >
                      Delete
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you want to Delete this Product
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                      <AlertDialogAction disabled={deleteMutation.isPending} onClick={() => handleDelete(product.id)} className="cursor-pointer">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
