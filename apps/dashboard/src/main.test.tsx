// @vitest-environment jsdom

import { expect, test, vi } from 'vitest'

test('renders the ping module into the dashboard root', async () => {
  document.body.innerHTML = '<div id="root"></div>'

  await import('./main')

  await vi.waitFor(() => {
    expect(document.querySelector('#root ping-module')).not.toBeNull()
  })
})
