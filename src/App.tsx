/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import CommunityView from './views/CommunityView';
import ProfileView from './views/ProfileView';
import PlansView from './views/PlansView';
import LoginView from './views/LoginView';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-sage flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-brand-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/community" element={<CommunityView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/plans" element={<PlansView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
