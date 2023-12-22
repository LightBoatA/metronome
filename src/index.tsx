import React from 'react';
import ReactDOM from 'react-dom';
import Home, { Index } from './pages/Index';
import './assets/less/index.less';

const App: React.FC = () => {
  return <Index/>
};

ReactDOM.render(<App />, document.getElementById('root'));
