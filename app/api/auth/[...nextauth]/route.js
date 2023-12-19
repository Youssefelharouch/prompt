import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB} from "../../../utils/db";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  async session(session) {},
  async signIn(profile) {
    try {
    await  connectToDB()
    // check if a user already exists
    // if not, create a new user  in the database
    } catch (error) {
      console.log(error);
    }
  },
});
export { handler as GET, handler as POST };
