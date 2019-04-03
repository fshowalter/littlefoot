import { fireEvent } from 'dom-testing-library'
import littlefoot from '../src'
import {
  setDocumentBody,
  waitForTransition,
  query,
  queryPopoverByText
} from './helper'

const TEST_SETTINGS = { activateDelay: 0, dismissDelay: 0 }

beforeEach(() => {
  setDocumentBody('single.html')
})

test('dismiss footnote when clicking the button again', async () => {
  littlefoot(TEST_SETTINGS)

  const button = query('button')
  fireEvent.click(button)
  await waitForTransition(button)

  fireEvent.click(button)

  expect(button).toHaveClass('is-changing')
  await waitForTransition(button)
  expect(
    queryPopoverByText(/This is the document's only footnote./)
  ).not.toBeInTheDocument()
  expect(button).not.toHaveClass('is-active')
})

test('dismiss footnote when clicking the document body', async () => {
  littlefoot(TEST_SETTINGS)

  const button = query('button')
  fireEvent.click(button)
  await waitForTransition(button)

  fireEvent.click(document.body)

  expect(button).toHaveClass('is-changing')
  await waitForTransition(button)
  expect(button).not.toHaveClass('is-active')
})

test('do not dismiss footnote when clicking the popover', async () => {
  littlefoot(TEST_SETTINGS)

  const button = query('button')
  fireEvent.click(button)
  await waitForTransition(button)

  const popover = queryPopoverByText(/This is the document's only footnote./)!
  fireEvent.click(popover)

  await waitForTransition(button)
  expect(popover).toBeInTheDocument()
  expect(button).toHaveClass('is-active')
})

test('dismiss a single footnote by ID when calling .dismiss()', async () => {
  const instance = littlefoot(TEST_SETTINGS)

  const button = query('button')
  instance.activate('1')
  await waitForTransition(button)

  instance.dismiss('1')

  expect(button).toHaveClass('is-changing')
  await waitForTransition(button)
  expect(button).not.toHaveClass('is-active')
})

test('dismiss all footnotes when calling .dismiss()', async () => {
  const instance = littlefoot(TEST_SETTINGS)

  const button = query('button')
  instance.activate('1')
  await waitForTransition(button)

  instance.dismiss()

  expect(button).toHaveClass('is-changing')
  await waitForTransition(button)
  expect(button).not.toHaveClass('is-active')
})

test('dismiss footnote when pressing the Escape key', async () => {
  const KEY_ESCAPE = '27'
  littlefoot(TEST_SETTINGS)

  const button = query('button')
  fireEvent.click(button)
  await waitForTransition(button)

  fireEvent.keyUp(document.body, { key: KEY_ESCAPE })

  expect(button).toHaveClass('is-changing')
  await waitForTransition(button)
  expect(button).not.toHaveClass('is-active')
})
