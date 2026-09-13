import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { MilestoneModule, PingModule, StatsModule } from '@fedex-prism/visibility-modules'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'fdx-milestone-module': DetailedHTMLProps<HTMLAttributes<MilestoneModule>, MilestoneModule>,
      'fdx-ping-module': DetailedHTMLProps<HTMLAttributes<PingModule>, PingModule>,
      'fdx-stats-module': DetailedHTMLProps<HTMLAttributes<StatsModule>, StatsModule>
    }
  }
}
