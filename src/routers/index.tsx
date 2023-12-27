import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Frame from '@/components/Frame.tsx';
import Home from '@/pages/Home/index.tsx';
import Header from '@/components/Header/index.tsx';
import ClassCom from '@/pages/Class/index.tsx';
import FunCom from '@/pages/Function/index.tsx';
const Router = () => {
  const [mode, setMode] = useState('')
  return (
    <Routes>
      <Route path="about" element={<div>About</div>} />
      <Route
        path="/"
        element={
          <>
            <Header onChangeMode={ mode => setMode(mode) } mode={mode}/>
            {/* 使用 Outlet 显示嵌套的子路由 */}
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<Home mode={mode}/>} />
        <Route path="/class" element={<ClassCom />} />
        <Route path="/function" element={<FunCom />} />
      </Route>
    </Routes>
  )
};

export default Router;