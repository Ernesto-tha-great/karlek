import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './navigation/navigation';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

export default function App() {
  return (
    <AuthProvider>
    <Navigation />
    </AuthProvider>
  );
}


