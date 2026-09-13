import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { installFdxRuntime } from '@fedex-prism/runtime-core'
import { createFdxRuntimeInternal } from '@fedex-prism/runtime-internal'
// import { createFdxRuntimeExternal } from '@fedex-prism/runtime-external'
import './index.css'

// Install the FedEx Visibility Runtime into the global scope before any modules that depend on it mount.
installFdxRuntime(createFdxRuntimeInternal())
// installFdxRuntime(createFdxRuntimeExternal({client_id: '000-111-222'}))

const root = createRoot(document.getElementById('root')!)

void import('./App.tsx').then(({ default: App }) => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
