import { render, screen, fireEvent } from '@testing-library/react-native'
import { OTPInput } from '../src'

test('submit called if inputs filled and autoSubmit enabled', async () => {
    const onSubmit = jest.fn()

    render(<OTPInput inputQuantity={4} autoSubmit={true} onSubmit={onSubmit} />)

    const hiddenInput = await screen.getByTestId('hidden-input')

    // Type inputQuantity - 1 inputs
    fireEvent.changeText(hiddenInput, '432')

    // Check no submit call yet
    expect(onSubmit).not.toHaveBeenCalled()

    // Type one more input
    fireEvent.changeText(hiddenInput, '4321')

    // Check submit call with correct input args
    expect(onSubmit).toBeCalledWith('4321')
})

test('typing in hidden input renders digits on visible inputs', async () => {
    const onSubmit = jest.fn()

    render(<OTPInput inputQuantity={4} autoSubmit={true} onSubmit={onSubmit} />)

    const hiddenInput = await screen.getByTestId('hidden-input')

    // Type some characters into hidden input
    fireEvent.changeText(hiddenInput, '432')

    for (let i = 0; i < 3; i++) {
        // Make sure that those characters are rendering on visible inputs
        const visibleInput = await screen.getByTestId(`visible-input-text-${i}`)
        expect(visibleInput).toHaveTextContent('432'[i])
    }
})