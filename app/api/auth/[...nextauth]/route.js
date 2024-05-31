import NextAuth from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import db from '@/firebase/firebase';
import User from '@/models/Users';
import bcrypt from 'bcryptjs';

const options = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
      
      },
      // async authorize(credentials) {
      //   await db();
      //   console.log(credentials)
      //   const user = await User.findOne({ email: credentials.email });
      //   if (user && bcrypt.compareSync(credentials.password, user.password)) {
      //     console.log(user.name)
      //     return { name: user.name, email: user.email };
      //   } else {
      //     return null;
      //   }
      // },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
  },
  secret:"asdffdafasfsafasfassafd",
  callbacks: {
    // async jwt(token, user) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    async session(session, user) {
      session.user = user;
      return session;
    }
  }
}

const handler = NextAuth(options);
export {handler as GET, handler as POST};
