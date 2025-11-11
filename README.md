# 🚖 TribeTaxi - Jharkhand's Community-Owned Ride-Hailing Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC.svg)](https://tailwindcss.com/)

**TribeTaxi** is Jharkhand's first community-owned ride-hailing platform built with the mission to provide affordable, reliable, and safe transportation across the state. With zero commission for drivers and transparent pricing for riders, we're revolutionizing mobility in Jharkhand.

## 🌟 Key Features

### 🚗 Core Ride-Hailing Features
- **Real-time Ride Tracking**: Live GPS tracking with Socket.io integration
- **Multiple Vehicle Options**: Auto Rickshaw, Car Economy, Car Premium, Bike
- **Dynamic Pricing**: Transparent fare calculation based on distance and vehicle type
- **Multi-payment Support**: Cash, UPI, Credit/Debit Cards, Digital Wallets
- **24/7 Availability**: Round-the-clock service across all operational cities

### 🗺️ Jharkhand-Specific Coverage
- **Current Cities**: Ranchi, Dhanbad, Bokaro, Deoghar, Jamshedpur
- **Expanding Soon**: Hazaribagh, Giridih, Ramgarh, Palamu, Chatra
- **Rural Connectivity**: Village hub system for last-mile connectivity
- **Tribal Area Support**: Special services for tribal regions
- **Industrial Zone Coverage**: Dedicated services for industrial areas

### 🛡️ Safety & Security
- **Verified Drivers**: Background-checked and licensed drivers
- **Women Safety**: Panic button, women-only driver options
- **Emergency Response**: Quick access to local emergency services
- **Real-time Monitoring**: Continuous ride monitoring and support
- **Insurance Coverage**: Comprehensive insurance for all rides

### 💰 Zero Commission Model
- **Driver Benefits**: 100% earnings retention for drivers
- **Affordable Rides**: Competitive pricing for riders
- **Community Owned**: Platform owned and governed by the community
- **Transparent Pricing**: No hidden fees or surge pricing

## 🏗️ Technology Stack

### Frontend
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe JavaScript
- **🎨 Tailwind CSS 4** - Utility-first CSS framework
- **🧩 shadcn/ui** - High-quality accessible components
- **🗺️ Leaflet** - Interactive maps
- **🔄 Socket.io Client** - Real-time communication
- **🎭 Framer Motion** - Smooth animations

### Backend
- **🚀 Node.js** - Server runtime
- **🗄️ Prisma ORM** - Database management
- **💾 SQLite** - Database
- **🔐 NextAuth.js** - Authentication
- **⚡ Socket.io** - Real-time server
- **💳 Razorpay** - Payment processing

### Development Tools
- **🎣 React Hook Form** - Form management
- **✅ Zod** - Schema validation
- **🐻 Zustand** - State management
- **🔄 TanStack Query** - Server state
- **🌍 Next Intl** - Internationalization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jitenkr2030/TribeTaxi.git
cd TribeTaxi
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Socket.io
NEXT_PUBLIC_SOCKET_URL="http://localhost:3000"
```

4. **Set up database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 App Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=TribeTaxi+Landing+Page)

### Rider Dashboard
![Rider Dashboard](https://via.placeholder.com/800x400?text=Rider+Dashboard)

### Booking Interface
![Booking Interface](https://via.placeholder.com/800x400?text=Booking+Interface)

### Real-time Tracking
![Real-time Tracking](https://via.placeholder.com/800x400?text=Real-time+Tracking)

## 🎯 Phase 1: Immediate Implementation (0-6 months)

### 🏙️ City Expansion
We're expanding our services to 5 additional cities across Jharkhand:

- **Hazaribagh**: Educational hub with growing transportation needs
- **Giridih**: Industrial area with worker transportation demand  
- **Ramgarh**: Mining region with daily commuter needs
- **Palamu**: Rural connectivity improvement
- **Chatra**: Religious tourism transportation

### 🌾 Rural Hub System
Implementing comprehensive rural connectivity:

- **Village Pickup Points**: Designated locations in rural areas
- **Offline Booking**: Book rides without internet connectivity
- **Shared Transportation**: Cost-effective shared auto and bike services
- **Mobile Signal Optimization**: Enhanced performance in low-connectivity areas

### 🏭 Industrial Zone Partnerships
Strategic partnerships with major industries:

- **Tata Steel (Jamshedpur)**: Employee transportation solutions
- **SAIL (Bokaro)**: Shift-based transportation services
- **BCCL (Dhanbad)**: Mining worker transportation
- **Corporate Packages**: Bulk booking and subscription services

### 🗣️ Tribal Language Support
Adding support for local tribal languages:

- **Santhali (संथाली)**: Widely spoken tribal language
- **Mundari (मुण्डारी)**: Major tribal language in the region
- **Ho (हो)**: Important tribal language in Jharkhand
- **Localized Content**: App interface and customer support in local languages

### 🛡️ Safety Enhancements
Comprehensive safety features:

- **Women Safety Features**: Panic button, women-only driver option
- **Emergency Response**: Integration with local hospitals and police
- **Tribal Area Safety**: Enhanced safety features for remote areas
- **24/7 Support**: Round-the-clock customer support and emergency assistance

## 🌍 Jharkhand Impact

### Economic Empowerment
- **Driver Income**: Zero commission model increases driver earnings by 20-30%
- **Job Creation**: Creating thousands of driver and support jobs
- **Local Economy**: Stimulating local transportation and service economy

### Social Impact
- **Tribal Empowerment**: Special programs for tribal community drivers
- **Women Safety**: Safe transportation options for women
- **Rural Connectivity**: Connecting villages to urban centers
- **Educational Access**: Affordable transportation for students

### Environmental Benefits
- **Shared Rides**: Reducing number of vehicles on roads
- **Route Optimization**: Efficient routing reducing fuel consumption
- **Future EV Integration**: Preparing for electric vehicle transition

## 🤝 How to Contribute

We welcome contributions from the community! Here's how you can help:

### Development
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Non-Technical Contributions
- **Spread the Word**: Share TribeTaxi with friends and family
- **Driver Recruitment**: Help us find reliable drivers in your area
- **Feedback**: Provide feedback on the app experience
- **Local Knowledge**: Share insights about your city's transportation needs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Government of Jharkhand**: For supporting local entrepreneurship
- **Tribal Communities**: For their valuable insights and feedback
- **Driver Partners**: For trusting us with their livelihood
- **Rider Community**: For embracing community-owned transportation

## 📞 Contact

- **Website**: [www.tribetaxi.in](https://www.tribetaxi.in)
- **Email**: [hello@tribetaxi.in](mailto:hello@tribetaxi.in)
- **Phone**: +91-XXXXXXXXXX
- **Address**: Ranchi, Jharkhand, India

---

**Built with ❤️ for Jharkhand, by the people of Jharkhand**

*TribeTaxi - Transforming mobility, empowering communities*