import { render, screen, waitFor } from '@testing-library/react';
import CountUp from '../CountUp';

describe('CountUp', () => {
  it('finishes at the customer-facing value and suffix', async () => {
    render(<CountUp value={500} suffix="+" />);

    const value = screen.getByLabelText('500+');
    await waitFor(() => expect(value).toHaveTextContent('500+'));
  });
});
