import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('ping-module')
export class PingModule extends LitElement {
  @state()
  now = new Date();

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    h2 {
      color: red;
    }
  `

  render() {
    return html`
      <h2>${this.now.toLocaleString()}</h2>
    `
  }
}
