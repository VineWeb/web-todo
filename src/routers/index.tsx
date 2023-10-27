import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Frame from '@/components/Frame';
import Home from '@/pages/Home/index';

const router = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<div>About</div>} />
  </Routes>
);

export default router;