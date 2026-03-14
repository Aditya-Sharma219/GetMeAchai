import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
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
      if (account.provider === "github") {
        await connectDB();

        const email = profile.email?.toLowerCase();
        const name = (profile.name || profile.login || "").toLowerCase();

        let currentUser = await User.findOne({ email });

        if (!currentUser) {
          currentUser = await User.create({
            name,
            email,
            username: name.replace(/\s+/g, ""),
            profilepic:
              (profile.image || profile.avatar_url || "/default-avatar.png")
                .toLowerCase(),
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

      const dbuser = await User.findOne({
        email: token.email.toLowerCase(),
      });

      if (dbuser) {
        session.user.username = dbuser.username.toLowerCase();
        session.user.profilepic = dbuser.profilepic;
      }

      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };