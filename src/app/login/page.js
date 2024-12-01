import SocialLogin from "@/components/SocialLogin";

const Login = () => {
  return (
    <div className="container mx-auto p-4 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
        Вход в профила
      </h1>
      <form  className="my-5 flex flex-col items-center p-5 border border-gray-200 rounded-md max-w-lg mx-auto w-full space-y-4 sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="w-full flex flex-col items-start">
          <label htmlFor="email" className="mb-1 text-sm font-medium">
            Имейл
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border p-2 w-full border-gray-500 rounded"
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="password" className="mb-1 text-sm font-medium">
            Парола
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border p-2 w-full border-gray-500 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
          //   disabled={loading}
        >
          {/* {loading ? "Регистрира се..." : "Регистрация"} */}
          Вход
        </button>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
