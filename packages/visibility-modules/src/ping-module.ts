import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { getFdxRuntime } from '@fedex-prism/runtime-core'

@customElement('fdx-ping-module')
export class PingModule extends LitElement {
  @state()
  accessor now = new Date()

  @state()
  accessor shipmentCount: number | null = null

  @state()
  accessor shipmentId: string | null = null

  @state()
  accessor errorMessage: string | null = null

  protected override firstUpdated(): void {
    void this.loadShipments()
  }

  private async loadShipments(): Promise<void> {
    try {
      console.log('🚀 Loading Shipments')
      const runtime = await getFdxRuntime()
      const shipmentsService = await runtime.getShipmentsService()
      const result = await shipmentsService.readAllShipments()
      this.shipmentCount = result.shipments.length
      this.shipmentId = result.shipments[0]?.id ?? null
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : String(error)
    }
  }

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
      ${this.errorMessage
        ? html`<p>Unable to load shipments: ${this.errorMessage}</p>`
        : this.shipmentCount === null
          ? html`<p>Loading shipments...</p>`
          : html`<p>Shipments: ${this.shipmentCount}: ${this.shipmentId}</p>`}
    `
  }
}
