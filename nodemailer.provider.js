import nodemailer from 'nodemailer';

const NodemailerProvider = (options) => {
  return {
    id: 'nodemailer',
    type: 'email',
    async sendVerificationRequest({ identifier: email, url, token, baseUrl, provider }) {
      const { host, port, secure, auth } = provider;
      const transporter = nodemailer.createTransport({ host, port, secure, auth });

      const text = `Your sign in link is: ${url}`;
      const html = `<p>Your sign in link is: <a href="${url}">${url}</a></p>`;

      await transporter.sendMail({
        from: provider.from,
        to: email,
        subject: 'Sign in link',
        text,
        html,
      });
    },
    ...options,
  };
};

export default NodemailerProvider;
