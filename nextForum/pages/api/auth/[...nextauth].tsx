import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: 'a577694e73943b6db5d9',
            clientSecret: '7bc3b984b79cad477ae737d4c979506e3cf78d1e'
        }),

        CredentialsProvider({
            // 1. 로그인페이지 폼 자동 생성해주는 코드
            name: "credentials",
                credentials: {
                    email: { label: "email", type: "text" },
                    password: { label: "password", type: "password" },
                },

                // 2. 로그인 요청 시 실행되는 코드
                // 직접 DB 에서 아이디, 비밀번호 비교
                // 일치하면 return 결과, 틀리면 return null
                async authorize(credentials) {
                    let client = await connectDB;
                    let db = client.db("forum");
                    let user = await db.collection('user_cred')
                                .findOne({ email: credentials?.email });

                    if(!user) {
                        console.log('해당 이메일은 없음');
                        return null;
                    }

                    if(credentials?.password) {
                        const pwcheck = await bcrypt.compare(credentials?.password, user.password);

                        if(!pwcheck) {
                            console.log('비밀번호 불일치');
                            return null;
                        }

                        return user as any;
                    } else {
                        console.log('비밀번호 정보 잘못됨');
                        return null;
                    }
                    
                }
        })
    ],

    // 3. jwt 만료일 설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30일
    },

    callbacks: {
        // 4. jwt 만들 때 실행되는 코드
        // user 변수는 DB 의 유저 정보 담겨있고 token.user 에 데이터를 저장하면 jwt 에 들어감
        jwt: async ({token, user} :any) => {
            if(user) {
                token.user = {};
                token.user.name = user.name;
                token.user.email = user.email;
            }

            return token;
        },

        // 5. 유저 세션이 조회될 때마다 실행되는 코드
        session: async({ session, token } :any) => {
            session.user = token.user;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(connectDB)
};

export default NextAuth(authOptions);