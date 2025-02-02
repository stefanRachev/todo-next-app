import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import SocialLogin from '../src/components/SocialLogin'; 
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';




jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

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

//   it('should handle login delay and navigate to profile eventually', async () => {
//     signIn.mockResolvedValueOnce(new Promise((resolve) => setTimeout(() => resolve({ url: '/profile' }), 1000)));
  
//     render(<SocialLogin />);
  
//     const googleButton = screen.getByText('Влез чрез Google');
//     fireEvent.click(googleButton);
  
   
//     await waitFor(() => expect(window.location.pathname).toBe('/profile'), { timeout: 5000 });
//   });
  
});
