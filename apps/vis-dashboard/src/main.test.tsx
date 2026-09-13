// @vitest-environment jsdom

import { expect, test, vi } from 'vitest'

test('renders shipment data from the shared runtime', async () => {
  document.body.innerHTML = '<div id="root"></div>'

  await import('./main')

  await vi.waitFor(() => {
    const pingModule = document.querySelector('#root fdx-ping-module')
    expect(pingModule?.shadowRoot?.textContent).toContain('Shipments: 1')
  })
})
