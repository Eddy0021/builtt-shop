# Product Collection App

## Description
This is a Vue 3 application that allows users to browse a collection of products, add them to a cart, and manage their selections. The app features a static login page, and a user-friendly interface.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the development server:
   ```bash
   npm run dev
   ```
## Usage
  - Access the app in your browser at `http://localhost:3000` (or whatever port Vite uses).
  - Add products to your cart by increasing the count and then clicking on the cart button.
  - Go to your cart to see all the products you've picked.
  - Change their quantity or remove them from the cart to see the total price and total savings (if the product is on sale).
  - If you aren't logged in, click the button to log in to proceed to checkout.
  ##
  - You can log in using the following static user credentials:
  - **Email**: `first.user@builtt.io`
  - **Password**: `1234`

## Features
  - Product collection page with a grid layout
  - Add to cart functionality
  - Quantity selector for products
  - Cart page with options to remove items and update quantity
  - Static login page for user validation

## Technologies Used
  - Vue 3
  - Vite
  - Vue Router
  - Pinia for state management (or Vuex, if applicable)
  - SCSS
  - Font awesome
  - TypeScript


### Instructions:
  - Be sure to replace `<project-directory>` with the actual name of your project folder.
