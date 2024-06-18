import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ThePrismAppWithProviders } from "~~/components/ThePrismAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

const title = "The Prism";
const titleTemplate = "%s | The Prism";
const description = "Built with 🏗 Scaffold-ETH 2";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ThePrismApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ThePrismAppWithProviders>{children}</ThePrismAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ThePrismApp;
