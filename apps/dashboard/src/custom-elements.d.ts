import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { MilestoneModule, PingModule, StatsModule } from '@modern-visibility'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'milestone-module': DetailedHTMLProps<HTMLAttributes<MilestoneModule>, MilestoneModule>,
      'ping-module': DetailedHTMLProps<HTMLAttributes<PingModule>, PingModule>,
      'stats-module': DetailedHTMLProps<HTMLAttributes<StatsModule>, StatsModule>
    }
  }
}
