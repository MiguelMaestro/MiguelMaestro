---
description: How to deploy the portfolio to Vercel
---

# Deploying to Vercel

Vercel is the creators of Next.js and provides the easiest way to deploy your application.

## Option 1: Deploy via Vercel CLI (Fastest)

1.  **Install Vercel CLI** (if not already installed):
    ```bash
    npm i -g vercel
    ```

2.  **Login to Vercel**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run the following command in your project root:
    ```bash
    vercel
    ```
    - Follow the prompts (mostly just hit Enter for defaults).
    - It will give you a "Production" URL (e.g., `https://your-project.vercel.app`).

## Option 2: Deploy via GitHub (Recommended for CI/CD)

1.  **Initialize Git** (if you haven't):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Push to GitHub**:
    - Create a new repository on GitHub.
    - Follow the instructions to push your code.

3.  **Connect to Vercel**:
    - Go to [vercel.com/new](https://vercel.com/new).
    - Import your GitHub repository.
    - Click **Deploy**.

## Environment Variables

If you added any environment variables (e.g., API keys), make sure to add them in the Vercel Project Settings under **Environment Variables**.
