# Anamta Imran — Portfolio

Premium dark-themed personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

1. Update contact and social links in `src/data/site.js`
2. Replace project details in `src/data/projects.js`
3. Resume PDF is at `public/resume.pdf` — regenerate with `npm run resume`
4. Replace images in `public/images/` (profile, projects)

## Contact form setup (required from you)

1. Visit [https://web3forms.com](https://web3forms.com)
2. Enter your email (`anamtaimran208@gmail.com`) and create an access key
3. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

4. Restart the dev server (`npm run dev`)

Messages from the contact form will be delivered to your email.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run resume` — regenerate resume PDF
- `npm run lint` — lint the project
