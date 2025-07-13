import { getUserFromToken } from "@/lib/getUserFromToken";

export default async function ProfilePage() {
  const user: any = await getUserFromToken();
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-sm text-zinc-400">{user.email}</p>
      </div>
    </div>
  );
}
