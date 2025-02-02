import { render, screen, fireEvent } from '@testing-library/react';
import SocialLogin from '../src/components/SocialLogin'; 
import { signIn } from 'next-auth/react';


jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('SocialLogin component', () => {
  it('should render Google and GitHub login buttons', () => {
    render(<SocialLogin />);
    
   
    const googleButton = screen.getByText('Влез чрез Google');
    const githubButton = screen.getByText('Влез чрез GitHub');
    
    expect(googleButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
  });

  it('should call signIn function when Google button is clicked', () => {
    render(<SocialLogin />);
    
    
    const googleButton = screen.getByText('Влез чрез Google');
    fireEvent.click(googleButton);

  
    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/profile' });
  });

  it('should call signIn function when GitHub button is clicked', () => {
    render(<SocialLogin />);
    
   
    const githubButton = screen.getByText('Влез чрез GitHub');
    fireEvent.click(githubButton);

  
    expect(signIn).toHaveBeenCalledWith('github', { callbackUrl: '/profile' });
  });
});
