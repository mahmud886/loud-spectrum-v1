# Loud Spectrum v1

A modern, feature-rich e-commerce platform built with Next.js, designed for scalability, performance, and a seamless user experience. This project includes advanced shopping, account management, blog, wholesale, and payment features, with a modular and maintainable codebase.

---

## 🚀 Features

- **Multi-language support** (i18n)
- **User authentication** (login, signup, logout)
- **Shopping cart & checkout**
- **Order tracking & management**
- **Wholesale registration & store**
- **Blog & content pages**
- **Payment integrations** (Square, Cash on Delivery)
- **Responsive, modern UI**
- **Redux state management**
- **SEO optimized**
- **Custom components & hooks**

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **State Management:** Redux
- **Styling:** CSS Modules, custom components
- **API Routes:** Next.js API
- **Other:**
  - React hooks
  - Custom validation helpers
  - Email integration
  - Internationalization (i18n)

---

## 📁 Folder Structure

```
loud-spectrum-v1/
│
├── app/                  # Main Next.js app directory (routes, pages, API)
│   ├── [locale]/         # Internationalized routes (en, de, es, etc.)
│   │   ├── (account)/    # User account pages (orders, address book, info)
│   │   ├── (auth)/       # Authentication (login)
│   │   ├── (blog)/       # Blog pages
│   │   ├── (shop)/       # Shop, cart, checkout, payment, order confirmation
│   │   ├── (wholesale)/  # Wholesale registration, store, info
│   │   ├── (xyz)/        # Miscellaneous content (about, contact, FAQ, legal, etc.)
│   │   ├── layout.js     # Main layout for locale
│   │   └── page.js       # Main page for locale
│   ├── actions/          # Server actions (auth, user)
│   ├── api/              # Next.js API routes (auth, emails, payment, shipping)
│   ├── favicon.ico       # Favicon
│   ├── robots.js         # Robots.txt
│   ├── sitemap.js        # Sitemap
│   └── viewport.js       # Viewport settings
│
├── components/           # Reusable React components
│   ├── account/          # Account-related components
│   ├── auth/             # Auth forms
│   ├── carousels/        # Carousel components
│   ├── cart/             # Cart UI
│   ├── checkout/         # Checkout UI
│   ├── containers/       # Section containers (contact, blog, shop, etc.)
│   ├── emails/           # Email templates
│   ├── headers/          # Page headers/hero sections
│   ├── navbar/           # Navigation components
│   ├── order-confirmation/ # Order confirmation UI
│   ├── payment/          # Payment UI
│   ├── product/          # Product display components
│   ├── svgs/             # SVG icon components
│   ├── ui/               # UI primitives (buttons, modals, etc.)
│   └── wholesale/        # Wholesale UI components
│
├── helpers/              # Utility functions (validation, formatting, cookies, etc.)
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization config
├── lib/                  # App-wide libraries (providers, store, utils)
│   ├── fonts.js          # Font loading
│   ├── providers/        # Context providers (Redux, Toast)
│   ├── store/            # Redux store and slices
│   └── utils/            # Misc utilities
├── messages/             # Translation files (en, de, es, etc.)
├── middleware.js         # Next.js middleware
├── public/               # Static assets (images, fonts, videos, svgs)
├── services/             # API service functions (fetching, posting data)
├── styles/               # Global styles
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation (this file)
└── ...                   # Other config and documentation files
```

---

## ⚡ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/loud-spectrum-v1.git
   cd loud-spectrum-v1
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧩 Customization & Configuration

- **Environment variables:** Configure API keys and secrets in `.env.local` as needed.
- **i18n:** Add or update translations in `messages/` and `i18n/`.
- **Styling:** Customize styles in `styles/globals.css` and component-level CSS.
- **Providers:** Add global providers in `lib/providers/`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions, feedback, or support, please contact the project maintainer.

---

> _Built with ❤️ by the Loud Spectrum team._
