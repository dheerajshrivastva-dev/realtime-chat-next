import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { db } from "@/app/lib/db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: UpstashRedisAdapter(db),
  providers: [Google],
})
