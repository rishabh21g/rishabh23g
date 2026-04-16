
# macOS-Portfolio

[![macOS-Portfolio](httpshttps://img.shields.io/badge/macOS--Portfolio-2.0-blue.svg)](https://github.com/rishabh23g/macOS-Portfolio)
[![License](https://img.shields.io/github/license/rishabh23g/macOS-Portfolio)](https://github.com/rishabh23g/macOS-Portfolio/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rishabh23g/macOS-Portfolio)](https://github.com/rishabh23g/macOS-Portfolio/stargazers)
[![Forks](https://img.shields.io/github/forks/rishabh23g/macOS-Portfolio)](https://github.com/rishabh23g/macOS-Portfolio/network/members)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is a portfolio website designed to look and feel like a macOS desktop.

## Features

- **macOS-like UI**: A portfolio that mimics the look and feel of a macOS desktop.
- **Customizable**: Easily customizable with your own information, projects, and themes.
- **Next.js 14**: Built with the latest version of Next.js, using App Router.
- **Tailwind CSS**: Styled with Tailwind CSS for a modern and responsive design.
- **TypeScript**: Written in TypeScript for type safety and better developer experience.
- **Redis**: Uses Redis for tracking visitor count.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

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

    Create a `.env.local` file in the root of your project. You will get the environment variables from Vercel Redis.

    - Go to your Vercel Dashboard.
    - Select your project.
    - Go to the "Storage" tab.
    - Create a new Redis database.
    - Connect the database to your project.
    - Vercel will automatically add the required environment variables to your project. For local development, you'll need to copy these into a new `.env.local` file in your project root. You can get these by running the following command and following the prompts:
    
    ```bash
    npx vercel env pull
    ```

    This will create a `.env.local` file with the necessary Redis credentials.

6.  **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

You can customize the portfolio by modifying the files in the `constants` and `public` directories.

### Personal Information

To change the personal information, edit the `RESUME.ts` file in the `constants` directory.

```typescript
// constants/RESUME.ts

export const RESUME_DATA = {
  name: "Your Name",
  location: "Your Location",
  about: "About You",
  // ... and so on
};
```

### Terminal Commands

To add or modify terminal commands, edit the `TERMINAL.ts` file in the `constants` directory.

```typescript
// constants/TERMINAL.ts

export const COMMANDS = {
  help: "List of available commands",
  // ... and so on
};
```

### Themes

You can change the theme by modifying the `globals.css` file. There are several themes available:

- `theme-default`
- `theme-midnight`
- `theme-logic`
- `theme-weeknd`
- `theme-radiohead`

To change the theme, update the `className` of the `body` tag in `app/layout.tsx`.

```tsx
// app/layout.tsx

<body className="min-h-full flex flex-col dark theme-default">{children}</body>
```

You can also create your own theme by adding a new theme class in `app/globals.css`.

### Wallpapers

To change the wallpaper, replace the images in the `public/wallpapers` directory with your own images. Make sure to keep the same file names.

### Spotify Integration

The portfolio includes a music widget that displays the currently playing song on Spotify. To enable this feature, you need to set up a Spotify application and add the credentials to your environment variables.

1.  **Create a Spotify App**

    - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
    - Click on "Create an App".
    - Give your app a name and description.
    - Once the app is created, you will get a `Client ID` and `Client Secret`.

2.  **Set up Redirect URI**

    - In your Spotify app settings, add a "Redirect URI".
    - For local development, you can use `http://localhost:3000/api/spotify/callback`.

3.  **Add Environment Variables**

    Add the following environment variables to your `.env.local` file:

    ```
    SPOTIFY_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
    SPOTIFY_CLIENT_SECRET=<YOUR_SPOTIFY_CLIENT_SECRET>
    SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
    ```

4.  **Get Refresh Token**

    To get the `SPOTIFY_REFRESH_TOKEN`, you need to authorize your app.

    - Construct the following URL and open it in your browser:

      ```
      https://accounts.spotify.com/authorize?client_id=<YOUR_SPOTIFY_CLIENT_ID>&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-currently-playing
      ```

    - After authorizing, you will be redirected to your callback URL. The response in your browser will contain a `refresh_token`.
    - Copy this `refresh_token` and add it to your `.env.local` file:

      ```
      SPOTIFY_REFRESH_TOKEN=<YOUR_SPOTIFY_REFRESH_TOKEN>
      ```

    Now the music widget should be able to display your currently playing song.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Please make sure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

