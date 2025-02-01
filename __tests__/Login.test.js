import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/login/page"; 
import { signIn } from "next-auth/react"; // Импортирайте signIn за да mock-нете функцията
import { useRouter } from "next/navigation";

// Mock-ване на `next-auth/react` и `next/navigation` за да не се изпълняват истински HTTP заявки
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  it("should render the login form correctly", () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/имейл/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/парола/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /вход/i })).toBeInTheDocument();
  });

  it("should show error when email or password is missing", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /вход/i }));

    await waitFor(() => expect(screen.getByText(/моля, попълнете всички полета/i)).toBeInTheDocument());
  });

  it("should call signIn with the correct parameters", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/имейл/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/парола/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /вход/i }));

    await waitFor(() => expect(signIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      email: "test@example.com",
      password: "password123",
    }));
  });

  it("should redirect to profile on successful login", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    signIn.mockResolvedValue({ error: null });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/имейл/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/парола/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /вход/i }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/profile"));
  });

  it("should display an error message on login failure", async () => {
    render(<Login />);

    signIn.mockResolvedValue({ error: { message: "Грешни входни данни." } });

    fireEvent.change(screen.getByLabelText(/имейл/i), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByLabelText(/парола/i), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByRole("button", { name: /вход/i }));

    await waitFor(() => expect(screen.getByText(/грешни входни данни/i)).toBeInTheDocument());
  });
});

