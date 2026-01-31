# ✈️ Flight Booking System

A comprehensive, full-featured flight booking web application built with React and modern web technologies. This platform provides users with an intuitive interface to search, compare, book flights, and manage their travel itineraries with real-time pricing and multi-currency support.

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646cff?logo=vite)
![Redux](https://img.shields.io/badge/Redux-2.8.2-764abc?logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38bdf8?logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Key Functionality](#-key-functionality)
- [Authentication](#-authentication)
- [Payment Integration](#-payment-integration)
- [Internationalization](#-internationalization)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### Core Features
- **✈️ Flight Search Engine** - Advanced search with filters for departure/arrival cities, dates, and trip types (one-way/round-trip)
- **📊 Smart Sorting** - Sort results by price (cheapest), duration (fastest), departure time (earliest/latest)
- **💺 Seat Selection** - Interactive seat map for choosing preferred seating
- **🛄 Baggage Management** - Add extra luggage and manage baggage allowances
- **🛡️ Travel Insurance** - Optional travel insurance coverage during booking
- **🛒 Shopping Cart** - Add multiple flights to cart before final purchase
- **📱 Responsive Design** - Fully optimized for desktop, tablet, and mobile devices

### Advanced Features
- **🌍 Multi-Currency Support** - Real-time currency conversion using live exchange rates
- **🌐 Internationalization (i18n)** - Multi-language support for global accessibility
- **🔐 Secure Authentication** - Email/password login with social authentication (Google, Facebook, GitHub)
- **💳 Payment Processing** - Integrated Stripe payment gateway for secure transactions
- **📄 E-Tickets** - Digital ticket generation and booking management
- **🔔 Real-time Notifications** - Toast notifications for user actions and updates
- **⏱️ Countdown Timers** - Booking time limits to ensure seat availability
- **💾 State Persistence** - Redux Persist for maintaining user session across browser refreshes

---

## 🛠️ Tech Stack

### Frontend Framework & Build Tools
- **React 18.2.0** - Component-based UI library
- **Vite 7.0.0** - Lightning-fast build tool and dev server
- **React Router DOM 7.6.3** - Client-side routing and navigation

### State Management
- **Redux Toolkit 2.8.2** - Predictable state container
- **React Redux 9.2.0** - Official React bindings for Redux
- **Redux Persist 6.0.0** - Persist and rehydrate Redux store

### Styling
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **FontAwesome 6.7.2** - Icon library for UI elements

### Form Handling & Validation
- **React Hook Form 7.60.0** - Performant form management
- **Yup 1.6.1** - Schema validation
- **@hookform/resolvers 5.1.1** - Validation schema resolvers

### API & Data Handling
- **Axios 1.10.0** - HTTP client for API requests
- **JWT Decode 4.0.0** - JWT token decoding

### Payment Integration
- **@stripe/react-stripe-js 3.7.0** - React components for Stripe
- **@stripe/stripe-js 7.4.0** - Stripe.js library

### UI Components & Libraries
- **React Select 5.10.1** - Flexible select input component
- **React Toastify 11.0.5** - Toast notification system
- **SweetAlert2 11.22.2** - Beautiful popup alerts
- **React Loading 2.0.3** - Loading indicators
- **React Confirm Alert 3.0.6** - Confirmation dialogs

### Internationalization
- **i18next 25.3.2** - Internationalization framework
- **react-i18next 15.6.0** - React bindings for i18next

### Development Tools
- **ESLint 9.29.0** - Code linting and quality assurance
- **Vite Plugin React 4.5.2** - Vite plugin for React Fast Refresh

---

## 📂 Project Structure

```
Booking-Flights-React-JSX/
│
├── public/                      # Static assets
│   └── img/                     # Image files
│
├── src/                         # Source code
│   ├── api/                     # API configuration and endpoints
│   │   └── index.js
│   │
│   ├── auth/                    # Authentication components
│   │   ├── LoginForm.jsx        # Login page
│   │   ├── RegisterForm.jsx     # Registration page
│   │   ├── ForgotPassword.jsx   # Password recovery
│   │   ├── Google.jsx           # Google OAuth callback
│   │   ├── Facebook.jsx         # Facebook OAuth callback
│   │   └── Github.jsx           # GitHub OAuth callback
│   │
│   ├── components/              # Main application components
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Search.jsx           # Flight search interface
│   │   ├── Lists.jsx            # Flight listings
│   │   ├── Bookings.jsx         # User bookings management
│   │   ├── Return.jsx           # Return flight handling
│   │   ├── Settings.jsx         # User settings
│   │   ├── PrivateRoutes.jsx    # Protected route wrapper
│   │   │
│   │   ├── branch/              # Sub-components
│   │   │   ├── Modal.jsx        # Reusable modal component
│   │   │   ├── Date.jsx         # Date picker
│   │   │   ├── From.jsx         # Departure city selector
│   │   │   ├── To.jsx           # Destination city selector
│   │   │   ├── SwapBtn.jsx      # Swap cities button
│   │   │   ├── Seat.jsx         # Seat selection
│   │   │   ├── Kg.jsx           # Baggage weight selector
│   │   │   ├── Insurance.jsx    # Travel insurance option
│   │   │   ├── Addons.jsx       # Flight add-ons
│   │   │   ├── Cart.jsx         # Shopping cart
│   │   │   ├── Total.jsx        # Price total calculator
│   │   │   ├── PriceDate.jsx    # Price and date display
│   │   │   ├── Sorting.jsx      # Sort options
│   │   │   ├── Outbound.jsx     # Outbound flight details
│   │   │   ├── FlightSummary.jsx # Flight summary
│   │   │   ├── CountdownTime.jsx # Booking countdown timer
│   │   │   ├── ContactClient.jsx # Contact information form
│   │   │   └── UpdateContact.jsx # Update contact details
│   │   │
│   │   ├── Form/                # Form-based pages
│   │   │   ├── SearchForm.jsx   # Search form component
│   │   │   ├── SearchFlight.jsx # Flight search page
│   │   │   ├── Flights.jsx      # Flights display
│   │   │   ├── FlightLists.jsx  # Flight list component
│   │   │   ├── ListBranch.jsx   # List branch view
│   │   │   ├── CartPage.jsx     # Shopping cart page
│   │   │   ├── Ticket.jsx       # Ticket booking page
│   │   │   └── Payment.jsx      # Payment page
│   │   │
│   │   ├── Nav/                 # Navigation components
│   │   │   └── Currency.jsx     # Currency selector
│   │   │
│   │   └── payment/             # Payment integration
│   │       ├── StripeProvider.jsx # Stripe context provider
│   │       └── StripeCheckOut.jsx # Stripe checkout component
│   │
│   ├── redux/                   # Redux state management
│   │   ├── store/
│   │   │   └── index.js         # Redux store configuration
│   │   ├── action/
│   │   │   ├── action.js        # Action creators
│   │   │   └── fetch/
│   │   │       └── index.js     # Async thunk actions
│   │   └── reducer/
│   │       ├── index.js         # Root reducer
│   │       └── state/
│   │           └── index.js     # Initial state
│   │
│   ├── validation/              # Validation schemas & API
│   │   ├── Schema.js            # Yup validation schemas
│   │   ├── apiSlice.js          # RTK Query API slice
│   │   └── gg.js                # Additional validators
│   │
│   ├── assets/                  # Images, fonts, static files
│   ├── App.jsx                  # Main App component
│   ├── App.css                  # App-specific styles
│   ├── main.jsx                 # Application entry point
│   ├── index.css                # Global styles
│   └── i18n.js                  # i18next configuration
│
├── eslint.config.js             # ESLint configuration
├── vite.config.js               # Vite configuration
├── package.json                 # Project dependencies
├── index.html                   # HTML template
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16.x or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/htay-htay-thwe/Booking-Flights-React-JSX.git
cd Booking-Flights-React-JSX
```

2. **Install dependencies**

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add the following environment variables:

```env
# API Configuration
VITE_API_BASE_URL=your_backend_api_url

# Stripe Payment Keys
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key

# OAuth Provider Credentials (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (Vite's default port)

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot module replacement (HMR).

### `npm run build`
Builds the application for production to the `dist` folder. The build is optimized and minified for best performance.

### `npm run preview`
Locally preview the production build before deployment.

### `npm run lint`
Runs ESLint to check code quality and identify potential issues.

---

## 🔑 Key Functionality

### 1. Flight Search & Filtering
Users can search for flights by entering:
- Departure and arrival cities
- Travel dates (single or round-trip)
- Number of passengers
- Cabin class preferences

Results are displayed with comprehensive filtering and sorting options.

### 2. Booking Process
The booking flow includes:
1. **Search** - Find available flights
2. **Select** - Choose preferred flights
3. **Customize** - Add seats, baggage, and insurance
4. **Cart** - Review selections
5. **Payment** - Secure checkout via Stripe
6. **Confirmation** - Receive e-ticket

### 3. User Account Management
- Secure registration and login
- Profile management
- Booking history
- Saved preferences
- Password recovery

### 4. Shopping Cart System
- Add multiple flights
- Remove or modify selections
- Real-time price updates
- Session persistence

---

## 🔐 Authentication

The application supports multiple authentication methods:

### Email/Password Authentication
- Standard registration with email verification
- Secure password hashing
- Password reset functionality

### Social Authentication (OAuth 2.0)
- **Google** - Sign in with Google account
- **Facebook** - Sign in with Facebook account  
- **GitHub** - Sign in with GitHub account

All authentication flows are secured with JWT tokens for session management.

---

## 💳 Payment Integration

### Stripe Payment Gateway

The application integrates Stripe for secure payment processing:

- **PCI Compliant** - Meets highest security standards
- **Multiple Payment Methods** - Credit cards, debit cards, digital wallets
- **Real-time Validation** - Instant card verification
- **Transaction Security** - Encrypted payment data
- **Receipt Generation** - Automatic email confirmations

To set up Stripe:
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add the publishable key to your `.env` file

---

## 🌐 Internationalization

The application uses **i18next** for multi-language support:

### Supported Languages
- English (en)
- Additional languages can be easily added

### Adding a New Language

1. Add translations to `src/i18n.js`:

```javascript
resources: {
  en: { translation: { ... } },
  es: { translation: { ... } }  // Spanish example
}
```

2. The language will be automatically available in the UI

---

## 🏗️ Architecture Highlights

### Component Structure
- **Modular Design** - Reusable, self-contained components
- **Container/Presentational Pattern** - Separation of logic and UI
- **Custom Hooks** - Shared logic across components

### State Management
- **Redux Toolkit** - Centralized application state
- **Redux Persist** - Automatic state persistence
- **Async Thunks** - API call management
- **Selectors** - Optimized state access

### Routing
- **Protected Routes** - Authentication-based access control
- **Dynamic Routes** - Parameter-based navigation
- **Nested Routes** - Hierarchical page structure

### Performance Optimizations
- **Code Splitting** - Lazy loading for faster initial load
- **Memoization** - Preventing unnecessary re-renders
- **Image Optimization** - Compressed and responsive images
- **Vite Build** - Fast bundling and minification

---

## 🧪 Testing

```bash
npm run test
```

The project uses modern testing practices (add your testing framework details here).

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deployment Platforms

The application can be deployed to:
- **Vercel** - Recommended for Vite projects
- **Netlify** - Simple deployment with CI/CD
- **GitHub Pages** - Free hosting for static sites
- **AWS S3 + CloudFront** - Enterprise-grade hosting

### Example: Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration
- Use meaningful component and variable names
- Write clear commit messages
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Author

**Htay Htay Thwe**

- GitHub: [@htay-htay-thwe](https://github.com/htay-htay-thwe)
- Email: htayhtaythwe962@gmail.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- Stripe for secure payment processing
- All open-source contributors

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/htay-htay-thwe/Booking-Flights-React-JSX/issues) page
2. Create a new issue with detailed information
3. Contact via email: htayhtaythwe962@gmail.com

---

## 🔗 Related Projects

- **Backend API**: [Booking-Flights-Laravel](https://github.com/htay-htay-thwe/Booking-Flights-Laravel) - Laravel backend for this application

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---

<div align="center">

**Made with ❤️ by Htay Htay Thwe**

</div>
