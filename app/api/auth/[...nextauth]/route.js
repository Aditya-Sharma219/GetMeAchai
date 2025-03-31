import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import User from '@/models/User';
import { connectDB } from "@/lib/mongodb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("GitHub Profile:", profile); // Debugging

      if (account.provider === 'github') {
        await connectDB();

        let currentUser = await User.findOne({ email: profile.email });

        if (!currentUser) {
          currentUser = await User.create({
            name: profile.name || profile.login, // Use profile.login if name is missing
            email: profile.email,
            username: profile.name 
              ? profile.name.replace(/\s+/g, '').toLowerCase() 
              : profile.login.toLowerCase(),
            profilepic: profile.image || profile.avatar_url || "/default-avatar.png",
            coverpic: "/default-cover.png",
            keyId: "",
            keySecret: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        return true;
      }
      return false;
    },

    async session({ session, token }) {
      if (!token.email) return session;

      await connectDB();
      const dbuser = await User.findOne({ email: token.email });

      if (dbuser) {
        session.user.username = dbuser.username;
        session.user.profilepic = dbuser.profilepic;
      }

      return session;
    }
  }
});

export { authoptions as GET, authoptions as POST };
