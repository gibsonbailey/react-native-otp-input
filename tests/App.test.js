import { render, screen, fireEvent } from '@testing-library/react-native'
import { OTPInput } from '../src'

test('submit called if inputs filled and autoSubmit enabled', async () => {
    const onSubmit = jest.fn()

    render(<OTPInput inputQuantity={4} autoSubmit={true} onSubmit={onSubmit} />)

    const hiddenInput = (await screen.findAllByTestId('hidden-input'))[0]

    // Type inputQuantity - 1 inputs
    fireEvent.changeText(hiddenInput, '432')

    // Check no submit call yet
    expect(onSubmit).not.toHaveBeenCalled()

    // Type one more input
    fireEvent.changeText(hiddenInput, '4321')

    // Check submit call with correct input args
    expect(onSubmit).toBeCalledWith('4321')
})