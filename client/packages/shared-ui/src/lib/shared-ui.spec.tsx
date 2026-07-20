import { render } from '@testing-library/react';

import { OrgSharedUi } from './shared-ui';

describe('OrgSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrgSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
