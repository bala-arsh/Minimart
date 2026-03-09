# Minimart (Ecommerce website)

A React and Vite ecommerce demo focused on product browsing, cart flow, checkout, and polished page-level UI.

## Features
- Product catalog with category filter, search, and sorting
- Product detail page with pricing, rating, stock, and purchase actions
- Cart management with quantity updates, remove, clear cart, and add-to-cart toast
- Checkout page with client-side validation
- Order success page after checkout
- Account page with local sign in, sign up, and logout concepts
- Contact page with animated background and mock message submission
- Responsive layouts across major pages

## Tech Stack
- React 19
- React Router
- Vite
- CSS modules by page/component structure
- Context API for cart state

## Project Structure
- `src/components`: shared UI pieces such as header, footer, search, filter, and product card
- `src/pages`: route-level pages
- `src/context`: shared cart state
- `src/data`: local product dataset
- `src/styles`: page and shared stylesheets
- `src/assets`: icons and product images

## Available Pages
- `/`: Home catalog
- `/products/:id`: Product detail
- `/cart`: Cart
- `/checkout`: Checkout
- `/order-success`: Order confirmation
- `/account`: Account concepts
- `/contact`: Contact page

## Scripts
- `npm run dev`: start development server
- `npm run lint`: run ESLint
- `npm run build`: create production build
- `npm run preview`: preview production build

## Current Status
This project is suitable as a working frontend demo. Authentication and contact submission are mocked locally and not backed by a server.
