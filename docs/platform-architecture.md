# TubaTours Marketplace Architecture

## Product Positioning
TubaTours is evolving from a marketing-led tourism website into a full Cape Verde tourism marketplace platform. The long-term platform supports three role families:

1. Traveler / customer
2. Partner / vendor
   - Tour guides
   - Airport transfer drivers
   - Hotels
   - Airbnb hosts
   - Restaurants
   - Local experience providers
3. Admin / TubaTours operations

The current implementation phase lays down the application structure, schema, route model, and dashboard foundation without pretending the backend is already complete.

## Recommended Technical Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Role-based authentication layer
- Stripe-ready payment service abstraction
- File/image upload abstraction
- Secure server actions / API routes / service layer

## Application Layers

### 1. Presentation Layer
- Marketing pages
- Marketplace catalog pages
- Dashboard layouts
- Partner public profiles
- Traveler account and booking views
- Admin management views

### 2. Application Layer
- Auth and session orchestration
- Booking workflows
- Availability logic
- Messaging workflows
- Payment orchestration
- Commission and payout logic
- Review moderation rules
- Featured listing / promotion logic

### 3. Domain Layer
- Users and roles
- Partner businesses and partner profiles
- Services / experiences / transfers / stays / food listings
- Destinations and categories
- Availability and inventory
- Bookings and booking items
- Payments, commissions, payouts
- Messaging threads and messages
- Reviews and moderation
- Promo / referral / featured listing modules

### 4. Infrastructure Layer
- PostgreSQL
- Prisma client
- Blob / cloud media storage
- Email / notification providers
- Payment provider
- Observability / audit logging

## Core Modules

### Marketplace Discovery
- Destination browsing
- Category browsing
- Search and filtering
- Featured listings
- Public partner profiles
- Service detail pages

### Traveler Module
- Sign up / sign in
- Saved items
- Booking history
- Upcoming trips
- Messaging with partners / support
- Reviews and ratings
- Payment history

### Partner Module
- Partner application
- Identity / business verification
- Partner dashboard
- Listing creation
- Availability calendar
- Booking inbox
- Messaging
- Reviews and reputation
- Featured listing upsells
- Commission and payout tracking

### Admin Module
- Approve / reject partners
- Approve / reject listings
- Destination and category management
- Featured listing management
- Booking oversight
- Commission tracking
- Promo / referral management
- Fraud / abuse monitoring
- Policy / legal content management

## Security and Permissions
- Role-based route protection
- Partner data scoped to owned businesses and services
- Traveler data scoped to owned bookings, messages, and reviews
- Admin-only access for approvals, commissions, featured listings, and moderation
- Audit logs for admin and financial actions
- Secure file access and upload validation
- Payment webhooks verified at server boundary

## Main Route Structure

### Public Marketplace
- `/[locale]`
- `/[locale]/experiences`
- `/[locale]/destinations`
- `/[locale]/transfers`
- `/[locale]/partners`
- `/[locale]/partners/[slug]`
- `/[locale]/services`
- `/[locale]/services/[slug]`
- `/[locale]/about`
- `/[locale]/contact`
- `/[locale]/legal/privacy`
- `/[locale]/legal/terms`

### Auth and Account Entry
- `/[locale]/signin`
- `/[locale]/signup`
- `/[locale]/dashboard`

### Traveler Area
- `/[locale]/traveler`
- `/[locale]/bookings`
- `/[locale]/messages`
- `/[locale]/saved`
- `/[locale]/reviews`

### Partner Area
- `/[locale]/partner/apply`
- `/[locale]/partner/dashboard`
- `/[locale]/partner/services`
- `/[locale]/partner/services/new`
- `/[locale]/partner/bookings`
- `/[locale]/partner/calendar`
- `/[locale]/partner/messages`
- `/[locale]/partner/featured`

### Admin Area
- `/[locale]/admin`
- `/[locale]/admin/partners`
- `/[locale]/admin/services`
- `/[locale]/admin/bookings`
- `/[locale]/admin/commissions`
- `/[locale]/admin/promotions`
- `/[locale]/admin/content`
- `/[locale]/admin/security`

## Implementation Phases

### Phase 1: Foundation
- Role model
- Route structure
- Dashboard layouts
- Prisma schema
- Legal pages
- Cookie consent banner
- Shared platform data types

### Phase 2: Data and Auth
- Prisma client setup
- PostgreSQL connection
- Authentication provider
- Role-based middleware
- Seed data

### Phase 3: Partner and Listing Management
- Partner onboarding
- Listing CRUD
- Media uploads
- Availability rules
- Admin approval queues

### Phase 4: Booking and Messaging
- Booking engine
- Messaging threads
- Email / notification triggers
- Booking state machine

### Phase 5: Payments, Commissions, Reputation
- Stripe integration
- Commission ledger
- Partner payouts
- Reviews and moderation
- Featured listing purchases

## Current Foundation Deliverables
This repo pass introduces:
- Platform architecture document
- Proposed Prisma schema
- Roles / permissions map
- Dashboard route foundation
- Platform-oriented navigation and shared components
- Cookie consent foundation

It does **not** claim that authentication, payments, database writes, availability, reviews, or messaging are complete yet.
