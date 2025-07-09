import clientPromise from "@/utils/mongoDb";

export const getUserCollection = async () => {
  const client = await clientPromise;
  return client.db().collection("users");
};
