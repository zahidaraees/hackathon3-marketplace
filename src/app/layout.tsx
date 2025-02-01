// app/layout.tsx
import './globals.css';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'; // Import Clerk components

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head />
      <body>
        <Header />
        
        <main>
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}</main>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
