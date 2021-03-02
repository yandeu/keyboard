# Keyboard

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
```

todo

## KeyCode

This library always uses the keyCode (`KeyboardEvent.code`).
Why? Read this:

> ## The code attribute
>
> First up is the code attribute. This is set to a string representing the key that was pressed to generate the KeyboardEvent, without taking the current keyboard layout (for example, QWERTY vs. Dvorak), locale (for example, English vs. French), or any modifier keys into account. This is useful when you care about which physical key was pressed, rather than which character it corresponds to. For example, if you’re a writing a game, you might want a certain set of keys to move the player in different directions, and that mapping should ideally be independent of keyboard layout.
>
> _source: https://developers.google.com/web/updates/2016/04/keyboardevent-keys-codes#the_code_attribute_

## keycode&#46;info

Check [keycode.info (event.code)](https://keycode.info/) to get usefull information about your inputs.

todo

## License

[MIT](LICENSE)
