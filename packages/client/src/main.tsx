import 'antd/dist/antd.css';
import type { FC } from 'react';
import * as ReactDOM from 'react-dom';
import './styles/index.less';

const App: FC = () => {
  // const { locale: currentLocale } = useAppState(state => state.system);
  // const initMessage = useMemo(() => getAppLocale(currentLocale), [currentLocale]);
  // return <IntlProvider messages={initMessage} locale={currentLocale.split('_')[0]}></IntlProvider>;
};

ReactDOM.render(<App />, document.getElementById('root'));
