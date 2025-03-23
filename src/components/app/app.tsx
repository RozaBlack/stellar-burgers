import '../../index.css';
import styles from './app.module.css';

import { AppHeader, AppBody } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppBody />
  </div>
);

export default App;
