import 'antd/dist/antd.css';
import type { FC } from 'react';
import { Inspector } from 'react-dev-inspector';
import * as ReactDOM from 'react-dom';
import './styles/index.less';

const App: FC = () => {
  return <Inspector disableLaunchEditor={!import.meta.env.DEV}></Inspector>;
};

ReactDOM.render(<App />, document.getElementById('root'));
