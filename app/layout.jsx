export const metadata = {
    title: "Flyrics — Real-time Floating Lyrics",
    description: "A transparent, always-on-top widget that follows your Spotify playback and shows lyrics in real time. Like a Dynamic Island for your desktop.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                backgroundColor: '#060608',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                color: '#ffffff',
                overflowX: 'hidden',
            }}>
                {children}
            </body>
        </html>
    );
}