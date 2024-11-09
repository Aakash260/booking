import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast, refetch } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInForm>();

  const mutatation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign In Successfully", type: "SUCCESS" });
      refetch();
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutatation.mutate(data);
  });

  return (
    <form className="grid place-content-center gap-5 p-6" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded py-1 px-2 font-normal ml-10"
          type="email"
          {...register("email", { required: "This field is required" })}
        />
      </label>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded  py-1 px-2 font-normal ml-4"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 character",
            },
          })}
        />
      </label>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
<span className="text-sm">Not registered? <Link to='/register' className="underline text-blue-500">Create an account here</Link></span>
    </form>
  );
};

export default SignIn;
