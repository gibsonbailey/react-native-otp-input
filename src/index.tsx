import { useState, useEffect, useRef } from 'react'
import { Pressable, KeyboardAvoidingView, View, Text, TextInput, GestureResponderEvent } from 'react-native'

type OTPInputProps = {
  inputQuantity: number,
  autoSubmit: boolean,
  onSubmit: (code: string) => void,
}

export const OTPInput = ({ inputQuantity, autoSubmit, onSubmit }: OTPInputProps) => {
  /* 
  This field group should pass a few tests
  1. Autocomplete on iOS (and hopefully android), if clicked, should fill out all of the cells.
  2. If numbers are typed in sequence, the focus should move from one cell to another.
  3. If backspace is pressed and something is in the cell, delete that number.
  4. If backspace is pressed and nothing is in the cell, delete the number of the previous cell.
  */
  const [ text, setText ] = useState('')
  const inputRef = useRef<TextInput | null>(null)

  useEffect(() => {
    focusHiddenInput()
  }, [])

  useEffect(() => {
    if (text.length === inputQuantity && autoSubmit) {
      onSubmit(text)
    }
  }, [ text ])

  const focusHiddenInput = () => {
    inputRef.current?.focus()
  }

  const getValueCharacter = (index: number) => {
    if (text.length >= index) {
      return text[ index ]
    }
    return ''
  }

  const onChangeText = (text: string) => {
    setText(text.replace(/[^0-9]/g, ''))
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{
        display: 'flex',
        width: '100%',
        marginTop: 50,
        marginBottom: 30,
      }}
    >
      <TextInput
        testID='hidden-input'
        ref={inputRef}
        maxLength={inputQuantity}
        value={text}
        onChangeText={onChangeText}
        keyboardType='number-pad'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          height: 50,
          width: '100%',
          marginBottom: 20,
          display: 'none',
        }}
      />
      < View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {
          Array.from(Array(inputQuantity).keys()).map(index => {
            return (
              <CodeField
                key={index}
                index={index}
                value={getValueCharacter(index)}
                focused={Math.min(text.length, inputQuantity - 1) == index}
                onPress={focusHiddenInput}
              />
            )
          })}
      </View>
    </KeyboardAvoidingView>
  )
}

type CodeFieldProps = {
  index: number,
  value: string,
  focused: boolean,
  onPress: (e: GestureResponderEvent, index: number) => void,
}

const CodeField = (
  {
    index,
    value,
    focused,
    onPress,
  }: CodeFieldProps,
) => {
  const [ cursorBlinkOn, setCursorBlinkOn ] = useState(true)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (focused) {
      timeout = setTimeout(() => {
        setCursorBlinkOn(!cursorBlinkOn)
      }, 600)
    }
    () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [ focused, cursorBlinkOn ])

  return (
    <Pressable
      onPress={e => onPress(e, index)}
    >
      <View
        style={
          {
            borderRadius: 6,
            borderWidth: 3,
            borderColor: focused ? 'blue' : '#E8E8E8', // TODO: Make this configurable
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            width: 60,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
          }
        }
      >
        <View
          style={
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }
          }
        >
          <Text
            style={
              {
                color: 'white',
                fontSize: 35,
                height: '100%',
                alignSelf: 'flex-start',
              }
            }
          >{value || ' '}</Text>
          <View
            style={{
              width: 0,
              height: '100%',
              borderColor: '#E8E8E8',
              borderWidth: (focused && cursorBlinkOn) ? 1 : 0,
              marginLeft: (focused && cursorBlinkOn) ? -2 : 0,
            }}
          />
        </View >
      </View>
    </Pressable >
  )
}

export default {
  OTPInput,
}