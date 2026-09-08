import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { PingModule } from '@modern-visibility/ping-module'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ping-module': DetailedHTMLProps<HTMLAttributes<PingModule>, PingModule>,
      'stats-module': DetailedHTMLProps<HTMLAttributes<StatsModule>, StatsModule>
    }
  }
}
