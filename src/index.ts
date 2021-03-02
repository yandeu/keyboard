/**
 * @package      npmjs.com/package/@yandeu/keyboard (keyboard.min.js)
 *
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/keyboard
 * @license      {@link https://github.com/yandeu/keyboard/blob/master/LICENSE|MIT}
 * @description  Inspired by keyboardjs (https://www.npmjs.com/package/keyboardjs)
 */

import { Events } from '@yandeu/events'
import type { EventListener } from '@yandeu/events'
import { VERSION } from './version'

interface EventMap {
  down: (keyCode: KeyCode) => void
  up: (keyCode: KeyCode) => void
}

type KeyCode = KeyboardEvent['code']
type IsDown = boolean

export class Keyboard {
  static get VERSION() {
    return VERSION
  }

  private _events = new Events<EventMap>()
  _isPaused = false
  _isActive = false

  _state: Map<KeyCode, IsDown> = new Map()

  constructor() {
    this.add()
  }

  private _onKeyDown(ev: KeyboardEvent) {
    const keyCode = ev.code

    if (this._state.has(keyCode)) {
      if (!this._state.get(keyCode)) {
        this._state.set(keyCode, true)
        this._events.emit('down', keyCode)
      }
    } else {
      this._state.set(keyCode, true)
      this._events.emit('down', keyCode)
    }
  }

  private _onKeyUp(ev: KeyboardEvent) {
    const keyCode = ev.code

    if (this._state.has(keyCode)) {
      if (this._state.get(keyCode) === true) {
        this._state.set(keyCode, false)
        this._events.emit('up', keyCode)
      }
    } else {
      this._state.set(keyCode, false)
      this._events.emit('up', keyCode)
    }
  }

  public key(keyCode: KeyCode): { isDown: IsDown; isUp: IsDown } {
    return {
      isDown: this._state.get(keyCode) || false,
      isUp: !this._state.get(keyCode) || true
    }
  }

  public get watch() {
    return {
      down: (callback: any) => {
        this._events.on('down', data => {
          if (!this._isPaused) callback(data)
        })
      },
      up: (callback: any) => {
        this._events.on('up', data => {
          if (!this._isPaused) callback(data)
        })
      }
    }
  }

  /** (once ignores paused) */
  public get once() {
    return {
      down: (keyCode: KeyCode, callback: (keyCode: KeyCode) => void) => {
        const listener: EventListener<EventMap, 'down'> = _keyCode => {
          if (keyCode.split(' ').includes(_keyCode)) {
            callback(_keyCode)
            this._events.removeListener('down', listener)
          }
        }
        this._events.on('down', listener)
      },
      up: (keyCode: KeyCode, callback: (keyCode: KeyCode) => void) => {
        const listener: EventListener<EventMap, 'up'> = _keyCode => {
          if (keyCode.split(' ').includes(_keyCode)) {
            callback(_keyCode)
            this._events.removeListener('up', listener)
          }
        }
        this._events.on('up', listener)
      }
    }
  }

  public get on() {
    return {
      down: (keyCode: KeyCode, callback: (keyCode: KeyCode) => void) => {
        this._events.on('down', _keyCode => {
          if (!this._isPaused && keyCode.split(' ').includes(_keyCode)) callback(_keyCode)
        })
      },
      up: (keyCode: KeyCode, callback: (keyCode: KeyCode) => void) => {
        this._events.on('up', _keyCode => {
          if (!this._isPaused && keyCode.split(' ').includes(_keyCode)) callback(_keyCode)
        })
      }
    }
  }

  public add() {
    if (this._isActive) return

    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyUp = this._onKeyUp.bind(this)

    document.addEventListener('keydown', this._onKeyDown, false)
    document.addEventListener('keyup', this._onKeyUp, false)

    this._isActive = true
  }

  public remove() {
    if (!this._isActive) return

    document.removeEventListener('keydown', this._onKeyDown, false)
    document.removeEventListener('keyup', this._onKeyUp, false)

    this._isActive = true
  }

  public get isPaused() {
    return this._isPaused
  }

  pause() {
    this._isPaused = true
  }

  resume() {
    this._isPaused = false
  }

  public destroy() {
    this.pause()

    this.remove()

    this._events.removeAllListeners()

    // @ts-ignore
    this._events = null
    // @ts-ignore
    this._isPaused = null
    // @ts-ignore
    this._isActive = null
    // @ts-ignore
    this._state = null
  }
}
