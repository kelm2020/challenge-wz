  import {
    BrowserRouter ,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';
  import Table from '../Table';
  import ListAgents from '../ListAgents';
  import ListRules from '../ListRules';
  import Sunburst from '../../charts/Sunburst';

  import './index.scss';

  export const Navigation = () => {
    return (
      <BrowserRouter>
        <div className="main-layout">
          <nav className="nav-bar">
            <NavLink to="/alerts" className={'nav-bar__item'} children={<><img style={{ height: '48px' }} alt='wazuh' src="logo.png" /><div>ALERTS</div></>}></NavLink>
            <NavLink to="/agents" className={'nav-bar__item'} children={'AGENTS'}></NavLink>
            <NavLink to="/rules" className={'nav-bar__item'} children={'RULES'}></NavLink>
            <NavLink to="/dashboard" className={'nav-bar__item'} children={'DASHBOARD'}></NavLink> 
          </nav>
          <Routes>
            <Route path="/alerts" element={<Table />} />
            <Route path="/agents" element={<ListAgents />} />
            <Route path="/rules" element={<ListRules />} />
            <Route path="/dashboard" element={<Sunburst />} />  
          </Routes>
        </div>
      </BrowserRouter>
    );
  }