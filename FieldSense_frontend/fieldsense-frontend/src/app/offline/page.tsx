export const metadata = {
  title: 'Offline | FieldSense',
};

export default function OfflinePage() {
  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      <h1>You are offline</h1>
      <p>The network connection seems to be unavailable.</p>
      <p>Core features are still accessible. Reconnect to sync the latest data.</p>
    </div>
  );
}
