import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MilestoneEnum, type Milestone } from './domain/milestone'

@customElement('milestone-module')
export class MilestoneModule extends LitElement {
  @property()
  milestone: Milestone | null = null;

  private handleMilestoneChange(event: Event) {
    const select = event.currentTarget
    if (!(select instanceof HTMLSelectElement)) {
      throw new TypeError('Milestone change must come from a select element')
    }

    this.milestone = MilestoneEnum.parse(select.value)
  }

  render() {
    return html`
      <h3>Milestone: ${this.milestone}</h3>
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
