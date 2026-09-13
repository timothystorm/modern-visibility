import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { installFdxRuntime } from '@fedex-prism/runtime-core'
import { createFdxRuntimeInternal } from '@fedex-prism/runtime-internal'
// import { createFdxRuntimeExternal } from '@fedex-prism/runtime-external'
import './index.css'
import App from './App.tsx'

// Install the FedEx Visibility Runtime into the global scope. This should be done before rendering the application to
// ensure that the runtime is available for any components that may need it.
installFdxRuntime(createFdxRuntimeInternal())
// installFdxRuntime(createFdxRuntimeExternal())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
