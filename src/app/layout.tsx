import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import './globals.css';
import theme from '@/theme';
import Navbar from '@/components/ui/Navbar';
import Container from '@mui/material/Container';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <StyledEngineProvider injectFirst>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              <Container component="main" className="mt-16">
                {children}
              </Container>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
