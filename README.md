# ⌨️ Keyboard

Handling of keyboard events.
(_Inspired by [keyboardjs](https://www.npmjs.com/package/keyboardjs)_)

## Installation

```console
npm install @yandeu/keyboard
```

## CDN

```console
https://unpkg.com/@yandeu/keyboard/umd/keyboard.min.js
```

## Usage

```ts
// print the current version
console.log('Keyboard VERSION: ', Keyboard.VERSION)

// instantiate
const keyboard = new Keyboard()

// watch all keys down
keyboard.watch.down(keyCode => {
  console.log('down', keyCode)
})

// watch all keys up
keyboard.watch.up(keyCode => {
  console.log('up', keyCode)
})

// listen for Q down
keyboard.on.down('KeyQ', keyCode => {
  console.log(`${keyCode} is down.`)
})

// listen for L, K or Space down
keyboard.on.down('KeyL KeyK Space', keyCode => {
  console.log(`${keyCode} is down.`)

  const L = keyboard.key('KeyL').isDown
  const K = keyboard.key('KeyK').isDown
  const Space = keyboard.key('Space').isDown

  if (L && K && Space) {
    console.log('All 3 keys are down!')
  }
})

// listen for L up
keyboard.on.up('KeyL', () => {
  console.log('KeyL is up.')
})

// listen for key E or R down (once)
keyboard.once.down('KeyE KeyR', keyCode => {
  console.log(`${keyCode} is down.`)
})

// check if W is down
keyboard.key('KeyW').isDown

// check if U is up
keyboard.key('KeyU').isDown

// check if paused
keyboard.isPaused

// pause all events (except .once())
keyboard.pause()

// resume all events
keyboard.resume()

// destroy all events once you are done
keyboard.destroy()
```

## KeyCode

This library always uses the keyCode (`KeyboardEvent.code`).
Why? Read this:

> ## The code attribute
>
> First up is the code attribute. This is set to a string representing the key that was pressed to generate the KeyboardEvent, without taking the current keyboard layout (for example, QWERTY vs. Dvorak), locale (for example, English vs. French), or any modifier keys into account. This is useful when you care about which physical key was pressed, rather than which character it corresponds to. For example, if you’re a writing a game, you might want a certain set of keys to move the player in different directions, and that mapping should ideally be independent of keyboard layout.
>
> _source: https://developers.google.com/web/updates/2016/04/keyboardevent-keys-codes#the_code_attribute_

## keycode&#46;info

Check [keycode.info (event.code)](https://keycode.info/) to get useful information about your inputs.

## License

[MIT](LICENSE)
