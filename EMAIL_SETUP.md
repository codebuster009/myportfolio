# Email Setup Instructions

This guide will help you set up email functionality for your contact form using Resend.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (you get 3,000 emails/month for free)
3. Verify your email address

## Step 2: Get Your API Key

1. After logging in, go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (it starts with `re_`)

## Step 3: Set Up Environment Variables

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Add the following:

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

**Important:** 
- Replace `re_your_actual_api_key_here` with your actual API key from Resend
- The default `onboarding@resend.dev` email works for testing
- For production, you'll want to verify your own domain in Resend and use your own email

## Step 4: Verify Your Domain (Optional but Recommended for Production)

1. In Resend dashboard, go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Follow the instructions to add DNS records
4. Once verified, you can use emails like `noreply@yourdomain.com`

## Step 5: Test the Contact Form

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```
2. Go to your contact form
3. Fill out and submit the form
4. Check your email inbox (kartavyasharmajs@gmail.com) for the message

## Troubleshooting

### Email not sending?
- Check that `.env.local` file exists and has the correct API key
- Make sure you've restarted the dev server after adding environment variables
- Check the browser console and server logs for errors
- Verify your Resend API key is active in the Resend dashboard

### Using a custom domain?
- Make sure you've verified your domain in Resend
- Update `RESEND_FROM_EMAIL` in `.env.local` to use your verified domain
- Format: `"Display Name <email@yourdomain.com>"`

## Security Notes

- **Never commit `.env.local` to git** - it's already in `.gitignore`
- Keep your API key secret
- The API route is server-side only, so your key stays secure

## Alternative Email Services

If you prefer a different service:

### SendGrid
- Sign up at [sendgrid.com](https://sendgrid.com)
- Install: `npm install @sendgrid/mail`
- Similar setup process

### Nodemailer (with Gmail SMTP)
- Install: `npm install nodemailer`
- Requires Gmail app password
- Less recommended for production

---

**Current Configuration:**
- Recipient: kartavyasharmajs@gmail.com
- Service: Resend
- Status: Ready to configure

