import littlefoot from '../../src'
import { setup, getFixture, waitForTransition } from '../helper'
import { fireEvent, getByTitle } from 'dom-testing-library'

test('setup with custom contentTemplate', async () => {
  setup('single.html')

  littlefoot({
    activateDelay: 1,
    contentTemplate: getFixture('contentTemplate.html')
  })

  const button = getByTitle(document.body, 'See Footnote 1')
  fireEvent.click(button)
  await waitForTransition(button)

  const footnote = document.querySelector('aside.custom')!
  const content = footnote.querySelector('.littlefoot-footnote__content')

  expect(footnote).toHaveAttribute('data-footnote-id', '1')
  expect(footnote).toHaveAttribute('data-footnote-number', '1')
  expect(content).toContainHTML(button.getAttribute('data-footnote-content')!)
})