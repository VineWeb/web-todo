import { SetStateAction, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Frame from '@/components/Frame.tsx';
import Home from '@/pages/Home/index.tsx';
import Header from '@/components/Header/index.tsx';
import ClassCom from '@/pages/Class/index.tsx';
import FunCom from '@/pages/Function/index.tsx';
import EventCom from '@/pages/Event/index.tsx';
import CommunicateCom from '@/pages/communicate/index.tsx';
import RefCom from '@/pages/Ref/index.tsx';
import SCUCom from '@/pages/ShouldComponentUpdate/index.tsx';
import HOCCom from '@/pages/HOC/index.tsx';
const Router = () => {
  const [mode, setMode] = useState('')
  return (
    <Routes>
      <Route path="about" element={<div>About</div>} />
      <Route
        path="/"
        element={
          <>
            <Header onChangeMode={ (mode: SetStateAction<string>) => setMode(mode) } mode={mode}/>
            {/* 使用 Outlet 显示嵌套的子路由 */}
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<Home mode={mode}/>} />
        <Route path="/class" element={<ClassCom />} />
        <Route path="/function" element={<FunCom />} />
        <Route path="/event" element={<EventCom />} />
        <Route path="/info" element={<CommunicateCom />} />
        <Route path="/ref" element={<RefCom />} />
        <Route path="/scu" element={<SCUCom />} />
        <Route path="/hoc" element={<HOCCom />} />
      </Route>
    </Routes>
  )
};

export default Router;