import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {getFdxRuntime, UiIntent} from '@fedex-prism/runtime-core'


@customElement('fdx-stats-module')
export class StatsModule extends LitElement {
  @property()
  accessor message: string | null = ""

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    .container {
      min-height: 4rem;
      width: 100%;
      border: 1px solid green;
    }
  `

  async connectedCallback(): void {
    super.connectedCallback();
    const runtime = await getFdxRuntime()
    runtime.getUiIntent()?.subscribe((intent) => {
      this.message = `${intent}`
    })
  }

  render() {
    return html`
      <div class="container">
        <p>Milestone: ${this.message}</p>
      </div>
    `
  }
}
