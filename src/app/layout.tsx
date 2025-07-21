import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { PropsWithChildren } from 'react';
import './globals.css';
import theme from '@/theme';
import Navbar from '@/components/ui/Navbar';

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
              <Box
                component="main"
                sx={{
                  minHeight: 'calc(100vh - 64px)',
                  backgroundColor: 'background.default',
                }}
              >
                <Container maxWidth="lg" sx={{ mt: 8 }}>
                  {children}
                </Container>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
