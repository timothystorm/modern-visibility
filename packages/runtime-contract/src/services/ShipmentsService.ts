import type {Shipment} from '@fedex-prism/visibility-domain'

/**
 * The NextToken type represents a pagination token used to retrieve the next page of shipments.
 */
export type NextToken = string | undefined;

/**
 * The IterableShipments interface represents a paginated collection of shipments. It contains an array of Shipment
 * objects and an optional nextToken for pagination.
 */
export interface IterableShipments {
  shipments: Shipment[];
  nextToken?: NextToken;
}

/**
 * The ShipmentsService interface defines the contract for interacting with shipment data. It provides methods to read
 * shipments and retrieve specific shipment details.
 */
export interface ShipmentsService {
  /**
   * Reads a list of shipments. If a nextToken is provided, it retrieves the next page of shipments.
   * @param nextToken - An optional token to retrieve the next page of shipments.
   * @return A promise that resolves to an IterableShipments object containing the list of shipments and an optional
   * nextToken for pagination.
   */
  readNextShipments(nextToken?: NextToken): Promise<IterableShipments>;

  /**
   * Reads a specific shipment details by its ID.
   * @param shipmentId - The ID of the shipment to retrieve.
   * @return A promise that resolves to the Shipment object.
   */
  readShipment(shipmentId: string): Promise<Shipment>;
}