import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = nextAuth({
    providers: [
      GoogleProvider({
        clientId:'',
        clientSecret:'',
      })
    ],
    async session (session) {
        
    },
    async signIn (profile) {
        
    },
})
export {handler as GET , handler as POST }