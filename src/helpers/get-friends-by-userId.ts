import { User } from "next-auth";
import { fetchRedis } from "./redis"

export const getFriendsByUserId = async (userId: string) => {
  const friendsId = await fetchRedis('smembers', `user:${userId}:friends`) as string[];
  const friends = await Promise.all(
    friendsId.map(async (id) => {
      const friend = await fetchRedis('get', `user:${id}`) as string;
      return JSON.parse(friend) as User;
    })
  )
  return friends;
}
