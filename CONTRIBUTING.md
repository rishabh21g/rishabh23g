# Contributing to macOS-Portfolio

First off, thank you for considering contributing to macOS-Portfolio. It's people like you that make the open source community such a great community!

## How Can I Contribute?

There are many ways you can contribute to this project. Here are a few ideas:

- **Reporting Bugs**: If you find a bug, please open an issue and let us know. Make sure to include as much information as possible, including steps to reproduce the bug.
- **Suggesting Enhancements**: If you have an idea for a new feature or an improvement to an existing one, please open an issue to discuss it.
- **Pull Requests**: If you've fixed a bug or implemented a new feature, you can submit a pull request.

## Setting Up Your Development Environment

To get started with development, you'll need to have [Node.js](https://nodejs.org/en/) (v18 or later) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed on your machine.

1.  **Fork the repository**

    Fork this repository by clicking on the "Fork" button on the top right corner of this page.

2.  **Clone the repository**

    ```bash
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/macOS-Portfolio.git
    ```

3.  **Navigate to the project directory**

    ```bash
    cd macOS-Portfolio
    ```

4.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

5.  **Set up environment variables**

    Create a `.env.local` file in the root of your project and add the following environment variables:

    ```
    REDIS_URL=<YOUR_REDIS_URL>
    REDIS_PASSWORD=<YOUR_REDIS_PASSWORD>
    ```

    You can get these credentials from [Upstash](https://upstash.com/) or any other Redis provider.

6.  **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Submitting a Pull Request

When you're ready to submit a pull request, please make sure to follow these steps:

1.  **Create a new branch** for your feature or bug fix.

    ```bash
    git checkout -b feature/your-feature-name
    ```

2.  **Make your changes** and commit them with a descriptive commit message.

    ```bash
    git commit -m "Add your descriptive commit message"
    ```

3.  **Push your changes** to your forked repository.

    ```bash
    git push origin feature/your-feature-name
    ```

4.  **Open a pull request** to the `main` branch of the original repository.

Please make sure your pull request follows these guidelines:

-   **Keep it focused**: Each pull request should address a single issue or feature.
-   **Write a good description**: Explain the changes you've made and why you've made them.
-   **Follow the coding style**: Make sure your code follows the existing coding style and conventions.

Thank you for your contribution!
