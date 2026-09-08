import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('stats-module')
export class StatsModule extends LitElement {
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

  render() {
    return html`
      <div class="container">
        <p>Hello, World</p>
      </div>
    `
  }
}
