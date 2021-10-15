import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

const callbacks = {};

callbacks.signIn = async function signIn(user, account, metadata) {
  const emailRes = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${account.accessToken}`,
    },
  });
  const emails = await emailRes.json();
  const primaryEmail = emails.find((mail) => mail.primary).email;

  user.email = primaryEmail;
};

const options = {
  providers,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
