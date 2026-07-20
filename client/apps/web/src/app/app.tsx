// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { OrgSharedUi } from '@org/shared-ui';
import { sharedUtils } from '@org/shared-utils';
//import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      {/* <NxWelcome title="@org/web" /> */}
      <OrgSharedUi />
      {sharedUtils()}
    </div>
  );
}
