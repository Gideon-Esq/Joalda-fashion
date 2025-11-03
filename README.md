# Joalda Fashion

Joalda Fashion is a modern e-commerce platform for a culturally-inspired fashion brand. This application allows users to browse products, add them to a cart, and manage an inventory of fashion items. It's built with a modern tech stack, featuring a Bun server and a React frontend.

## Tech Stack

- **Backend:** Bun, Bun:SQLite
- **Frontend:** React, TypeScript
- **Styling:** CSS

## Project Structure

The project is organized into the following key files:

- `server.tsx`: The heart of the backend, this file sets up the Bun server, handles API routing, and manages the SQLite database.
- `App.tsx`: The main React component that houses the entire frontend of the application.
- `client.tsx`: The client-side entry point, responsible for rendering the `App` component in the browser.
- `styles.css`: The external stylesheet where all the application's styling is defined.
- `package.json`: Defines the project's metadata, dependencies, and scripts.
- `tsconfig.json`: The configuration file for the TypeScript compiler.
- `.gitignore`: Specifies which files and directories should be ignored by version control.

## Getting Started

Follow these steps to get the application up and running on your local machine.

### Prerequisites

- **Bun:** This project is built on the Bun runtime. If you don't have it installed, you can find the installation instructions on the [official Bun website](https://bun.sh/install).

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies:**
    Open your terminal and run the following command to install all the necessary packages:
    ```bash
    bun install
    ```

### Running the Application

Once you've installed the dependencies, you can start the server with this command:

```bash
bun start
```

This will launch the application, and you should see a confirmation in your terminal that the server is listening on `http://localhost:3000`.

Now, you can open your web browser and navigate to `http://localhost:3000` to see the Joalda Fashion application in action.
