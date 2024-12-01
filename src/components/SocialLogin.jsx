import { signIn } from "@/auth";

//components/SocialLogin

//import { doSocialLogin } from "@/app/actions";
function SocialLogin() {
  return (
    <form
      action={async () => {
        "use server";
        const action = formData.get("actions");
        await signIn(action);
      }}
      className="flex flex-col justify-center items-center space-y-4"
    >
      <button
        className="bg-pink-400 text-white p-3 rounded-md text-lg"
        type="submit"
        name="action"
        value="google"
      >
        Влез чрез Google
      </button>
      <button
        className="bg-black text-white p-3 rounded-md text-lg"
        type="submit"
        name="action"
        value="github"
      >
        Влез чрез Github
      </button>
    </form>
  );
}

export default SocialLogin;
