import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="bg-base-100 shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome 🎉</h1>
        {session?.user ? (
          <div className="space-y-2">
            <p className="text-lg font-medium text-primary">
              Hello, {session.user.name || "User"}!
            </p>
            <p className="text-base text-gray-500">{session.user.email}</p>
            {session.user.image && (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mt-4"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500">You're not signed in.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
