import { render, fireEvent, screen } from '@testing-library/react';
import AgentDetail from '../components/AgentDetail';

describe('Tests of Agent Detail', () => {
  it('should match snapshot', () => {
    const props = {
      eventHandler: jest.fn(),
    };

    const { asFragment } = render(<AgentDetail {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Test get back event handler', async () => {
    const props = {
      eventHandler: jest.fn(),
    };

    render(<AgentDetail {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(props.eventHandler).toBeCalled();
  });

});