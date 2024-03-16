import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Login } from "./Login"

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: { id: "1", name: 'John' }
        })
    }
}))

describe('Testing Login component', () => {
    test('username should be rendered', () => {
        render(<Login />);
        const placeholder = screen.getByPlaceholderText(/username/i);
        // expect(placeholder).toBeInTheDocument();
        expect(placeholder.placeholder).toEqual('username');
    })
    test('password should be rendered', () => {
        render(<Login />);
        const placeholder = screen.getByPlaceholderText(/password/i);
        // expect(placeholder).toBeInTheDocument();
        expect(placeholder.placeholder).toEqual('password');
    })
    test('button should be rendered', () => {
        render(<Login />);
        const buttonEle = screen.getByRole('button')
        expect(buttonEle).toBeInTheDocument();
    })

    test('username input should be empty', () => {
        render(<Login />);
        const usernameInput = screen.getByPlaceholderText('username')
        expect(usernameInput.value).toBe("")
    })

    test('password input should be empty', () => {
        render(<Login />);
        const passwordInput = screen.getByPlaceholderText('password')
        expect(passwordInput.value).toBe("")
    })

    test('button should be disabled', () => {
        render(<Login />);
        const button = screen.getByRole('button');
        expect(button.disabled).toBe(true)
    })

    test('loading should not be rendered', () => {
        render(<Login />);
        const button = screen.getByRole('button');
        expect(button).not.toHaveTextContent(/please wait.../i)
    })

    test('error message should not be visible', () => {
        render(<Login />);
        const error = screen.getByTestId('error');
        expect(error).not.toBeVisible()
    })

    test('username input should change', () => {
        render(<Login />);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const testValue = "test";
        fireEvent.change(usernameInput, { target: { value: testValue } })
        expect(usernameInput.value).toBe(testValue)
    })

    test('password input should change', () => {
        render(<Login />);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const password = "pass";
        fireEvent.change(passwordInput, { target: { value: password } })
        expect(passwordInput.value).toBe(password)
    })

    test('button should not be disabled when data exist', () => {
        render(<Login />);
        const button = screen.getByRole('button');

        const passwordInput = screen.getByPlaceholderText(/password/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const password = "pass";
        const testValue = "test";

        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(usernameInput, { target: { value: testValue } })
        expect(button.disabled).toBe(false)
    })

    test('loading should be rendered when button clicked', () => {
        render(<Login />);
        const button = screen.getByRole('button');

        const passwordInput = screen.getByPlaceholderText(/password/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const password = "pass";
        const testValue = "test";

        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(usernameInput, { target: { value: testValue } })

        fireEvent.click(button)

        expect(button).toHaveTextContent(/please wait.../i)
    })

    test('loading should not be visible when data is fetched', async () => {
        render(<Login />);
        const button = screen.getByRole('button');

        const passwordInput = screen.getByPlaceholderText(/password/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const password = "pass";
        const testValue = "test";

        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(usernameInput, { target: { value: testValue } })

        fireEvent.click(button);

        await waitFor(() => expect(button).not.toHaveTextContent(/please wait.../i))
    })

    test('user should be rendered once data is fetched', async () => {
        render(<Login />);
        const button = screen.getByRole('button');

        const passwordInput = screen.getByPlaceholderText(/password/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const password = "pass";
        const testValue = "test";

        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(usernameInput, { target: { value: testValue } })

        fireEvent.click(button);

        const name = await screen.findByText('John')

        await waitFor(() => expect(name).toBeInTheDocument());
    })
})