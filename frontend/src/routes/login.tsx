import { createFileRoute, Link } from '@tanstack/react-router'
import watchImg from '@/assets/watch.png'
import { useState } from 'react'
import { LoginInput } from '@/services/api'
import { postLoginMutation, getLoginOptions } from '@/services/api/@tanstack/react-query.gen'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import Loader from '@/components/loader'
import { toast } from 'sonner'
import { validate } from '@/services/validation'
export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const router = useRouter();
  const loginMutation = useMutation(postLoginMutation());
  const [formData, setFormData] = useState<LoginInput>({ email: "", password: "" })

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)

    const emailValidation = validate("email", formData.email);

    if (!emailValidation.valid) {
      return toast.error(emailValidation.message);
    }


    loginMutation.mutate(
      { body: formData },
      {
        onSuccess: (data) => {
          router.navigate({ to: "/admin" });
          setFormData({ email: "", password: "" })
          toast.success(data.message)
        },
        onError: (error) => {
          toast.error(error?.response?.data["error"]);
        }
      }
    );
  }

  return (
    <div className="flex w-full  justify-center h-screen custome-bg-2">
      <div className="logo flex gap-4 items-center absolute top-4 left-4">
        <Link to='/' className="logo w-0 ms-10">
          <h1 className="text-4xl cursor-pointer text-neutral-200">CHRONOVERSE</h1>
        </Link>
      </div>
      <div className='w-0 lg:w-1/2 xl:w-2/3flex justify-center items-center'>
        <div className="image mt-[15rem] ">
          <img src={watchImg} width={700} alt="" />
        </div>
      </div>
      <div className='w-full lg:w-1/2 xl:w-1/3 my-auto  md:px-8'>
        <form className="flex gap-4 flex-col mx-auto p-16 w-full" onSubmit={handleSubmit}>
          <h1 className="text-4xl sm:text-5xl  font-bold text-white">Admin Login !</h1>
          <p className='text-xl font-medium text-gray-400 mb-8'>Sign into your acount</p>
          <div>
            <label htmlFor="email" className='text-xl font-medium text-gray-200 '>Email</label>
            <input id='email' className="border text-white font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" name="email" onChange={handleChange} required type="email" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password" className='text-xl font-medium text-gray-200 '>Password</label>
            <input id='password' className="border font-medium text-white border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" name="password" onChange={handleChange} required type="password" placeholder="Password" />
          </div>
          <button className="bg-blue-600 text-white rounded p-2 mt-12 text-2xl cursor-pointer disabled:bg-gray-600" disabled={loginMutation.isPending} type="submit">Login</button>
          {loginMutation.isPending && (
            <div className="mt-2 text-sm text-center text-white">Please wait...</div>
          )}
        </form>
      </div>
    </div >



  )
}
