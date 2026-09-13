import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {getFdxRuntime, type ShipmentStatus, ShipmentStatusEnum, UiIntent} from '@fedex-prism/runtime-core'

@customElement('fdx-milestone-module')
export class MilestoneModule extends LitElement {
  @property()
  accessor milestone: ShipmentStatus | null = null;

  private _uiIntent: UiIntent | null = null;

  protected override async firstUpdated(): Promise<void> {
    const runtime = await getFdxRuntime()
    if (typeof runtime.getUiIntent !== 'function') {
      throw new TypeError('FedEx runtime is missing getUiIntent()')
    }
    this._uiIntent = runtime.getUiIntent()
  }

  private handleMilestoneChange(event: Event): void {
    const select = event.currentTarget
    if (!(select instanceof HTMLSelectElement)) {
      throw new TypeError('Milestone change must come from a select element')
    }

    this.milestone = select.value === '' ? null : ShipmentStatusEnum.parse(select.value)
    this._uiIntent?.publish(this.milestone ?? '')
  }

  render() {
    return html`
        <select .value=${this.milestone ?? ''} @change=${this.handleMilestoneChange}>
            <option value="" disabled>Select a milestone</option>
            <option value="LabelCreated">Label Created</option>
            <option value="InTransit">In Transit</option>
            <option value="OutForDelivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
        </select>
    `
  }
}
