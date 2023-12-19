import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "../../../utils/db";
import User from "../../../models/User";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  async session({session}) {
    const sessionUser = await User.findOne({ email: session.user.email });
  },

  async signIn({profile}) {
    try {
      await connectToDB();
      // check if a user already exists
      const userExist = await User.findOne({ email: profile.email });
      // if not, create a new user  in the database
      if (!userExist) {
        const newUser = new User({
          userName: profile.name.replace(" ", "").toLowerCase(),
          email: profile.email,
          image: profile.picture,
        });
        await newUser.save();
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
});
export { handler as GET, handler as POST };
