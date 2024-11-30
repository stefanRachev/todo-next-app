//components/SocialLogin

//import { doSocialLogin } from "@/app/actions";
function SocialLogin() {
    return (
        <form className="flex flex-row justify-center items-center space-x-4 space-y-4">
        <button
          className="bg-pink-400 text-white p-3 rounded-md text-lg"
          type="submit"
          name="action"
          value="google"
        >
          Sign In with Google
        </button>
        <button
          className="bg-black text-white p-3 rounded-md text-lg"
          type="submit"
          name="action"
          value="github"
        >
          Sign In with Github
        </button>
      </form>
    );
  }
  
  export default SocialLogin;
  
  
  
