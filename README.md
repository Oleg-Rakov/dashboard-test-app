# Dashboard Application

## Description

This project is a single-page dashboard application built with Angular, Chart.js, and Angular Universal (SSR). It visualizes interactive data using dynamic charts and is optimized for SEO and performance with server-side rendering.

---

## Features

- **Interactive Charts**:
  - Line chart for time-series data.
  - Bar chart for categorical comparisons.
- **Data Filtering**:
  - Users can filter data by date range or categories via a form.
- **Responsive Design**:
  - The application is fully optimized for desktop devices.
- **Server-Side Rendering (SSR)**:
  - Angular Universal is implemented to improve SEO and load times.
- **Dynamic Data Loading**:
  - Data is fetched dynamically from a mock API.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Angular CLI](https://angular.io/cli) (version 16 or higher)

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dashboard-app
   npm install
   npm start
   for ssr - npm run serve:ssr:dashboard-app
   for test - npm run test

Architectural Decisions 
Modular Design:

The application uses Angular's standalone components to streamline module dependencies.
Key components such as LineChart, BarChart, FilterForm, and Summary are isolated for reusability and testability.
Data Service with SSR Support:

A DataService is implemented to fetch data from a mock API.
TransferState is used to handle data prefetching during server-side rendering to avoid duplicate API calls on the client.

Chart Integration:
ng2-charts (a wrapper around Chart.js) is used for rendering charts.
Charts are dynamically updated based on user input and server-provided data.

How SSR is Implemented
Angular Universal Setup:

The project uses Angular Universal to enable server-side rendering.
The @nguniversal/express-engine package is used to set up an Express server for SSR.
Server Configuration:

The server is defined in server.ts, which handles rendering the Angular application and serving static files.
API calls are adjusted to handle server-side requests by using absolute paths during rendering.
TransferState:

Data prefetched during server rendering is injected into the DOM using TransferState.
This avoids redundant API calls when the application is hydrated on the client.
Meta Tags for SEO:

Meta and Title services are used to set dynamic meta tags, improving SEO and sharing on social media.
