import { auth } from "@/auth";
//import Logout from "@/components/Logout";
import Image from "next/image";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  
  

  if (!session?.user) redirect("/");
  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">
        {session?.user?.name ? session.user.name : session?.user?.email}
      </h1>

      {session?.user?.image && (
        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width={72}
          height={72}
          className="rounded-full"
        />
      )}

     
    </div>
  );
};

export default HomePage;