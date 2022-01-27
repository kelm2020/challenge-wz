  import {
    BrowserRouter ,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';
  import Table from '../Table';
  import ListAgents from '../ListAgents';
  import ListRules from '../ListRules';
  import DonutChart from '../../charts/DonutChart';
  import AgentDetail from '../AgentDetail';
  import RuleDetail from '../RuleDetail';
  import AlertDetail from '../AlertDetail';
  import { handleGetBack } from '../../utils';

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
            <Route path="/" element={<Table />} />
            <Route path="/alerts" element={<Table />} />
            <Route path="/alerts/:id" element={<AlertDetail />} />
            <Route path="/agents" element={<ListAgents />} />
            <Route path="/rules" element={<ListRules />} />
            <Route path="/dashboard" element={<DonutChart />} />
            <Route path="/agents/:id" element={<AgentDetail eventHandler={handleGetBack} />} />
            <Route path="/rules/:id" element={<RuleDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }