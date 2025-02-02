import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/app/login/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Мокване на `signIn` и `useRouter`
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  it("should successfully login and redirect to /profile", async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    signIn.mockResolvedValue({
      error: null,
      message: null,
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/имейл/i);
    const passwordInput = screen.getByLabelText(/парола/i);
    const submitButton = screen.getByRole("button", { name: /вход/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/profile");
    });
  });

  it("should show error when login fails", async () => {
    signIn.mockResolvedValue({
      error: { message: "Грешни входни данни." },
      message: null,
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/имейл/i);
    const passwordInput = screen.getByLabelText(/парола/i);
    const submitButton = screen.getByRole("button", { name: /вход/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Грешни входни данни/i)).toBeInTheDocument();
    });
  });
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
});
