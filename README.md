![GitHub CI](https://github.com/gibsonbailey/react-native-otp-input/actions/workflows/test.yml/badge.svg)
# react-native-otp-input
This is a lag-free One Time Password component for react-native.


## Usage
```ts
export const MyComponent = () => {
    const onSubmit = (code: string) => {
        console.log(code)
    }

    return (
        <OTPInput
            inputQuantity={4}
            onSubmit={onSubmit}
        />
    )
}
```