/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Report from './pages/Report';
import RoutesPage from './pages/Routes';
import MapView from './pages/Map';
import Dashboard from './pages/Dashboard';
import WasteSegregation from './pages/WasteSegregation';
import Rewards from './pages/Rewards';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="report" element={<Report />} />
          <Route path="wastesegregation" element={<WasteSegregation />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="map" element={<MapView />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
