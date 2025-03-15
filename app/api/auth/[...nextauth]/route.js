import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import User from '@/models/User';
import { connectDB } from "@/lib/mongodb"; // Import only connectDB

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        await connectDB(); // Ensure DB connection

        let currentUser = await User.findOne({ email: profile.email });

        if (!currentUser) {
          currentUser = await User.create({
            name: profile.name,
            email: profile.email,
            username: profile.name.replace(/\s+/g, '').toLowerCase(),
            profilepic: profile.image || profile.avatar_url || '',
            coverpic: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        return true;
      }
      return false;
    },

    async session({ session, token }) {
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
