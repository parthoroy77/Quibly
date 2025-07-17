export const VerificationEmailTemplate = (verificationLink: string): string => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Email | Quibly</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        a.button {
          display: inline-block;
          padding: 12px 20px;
          background-color: #4f46e5;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Quibly!</h1>
        <p>Thanks for signing up. Before we get started building and hosting smart quizzes, we need to verify your email address.</p>
        <p>Please confirm your email by clicking the button below:</p>
        <a href="${verificationLink}" class="button">Verify Email</a>
        <p>If you didn’t create a Quibly account, you can safely ignore this email.</p>
        <div class="footer">
          <p>Need help? Contact us anytime at support@Quibly.ai</p>
          <p>&copy; ${new Date().getFullYear()} Quibly. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};
