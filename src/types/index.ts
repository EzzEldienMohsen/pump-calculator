/**
 * Type Definitions
 * Centralized type definitions for the application
 */

/**
 * File processing result
 */
export interface FileProcessResult {
  headers: string[];
  data: Array<Array<string | number>>;
}

/**
 * Price calculation result
 */
export interface PriceCalculationResult {
  success: boolean;
  price?: number;
  details?: PumpDetails | PanelDetails;
  error?: string;
}

/**
 * Pump pricing details
 */
export interface PumpDetails {
  pumpCount: string;
  suctionSize: string;
  headerType: string;
  basePrice: number;
  rowData: Array<string | number>;
}

/**
 * Panel pricing details
 */
export interface PanelDetails {
  panelPumpCount: string;
  motorPower: string;
  panelType: string;
  price: number;
  rowData: Array<string | number>;
}

/**
 * Pump count option
 */
export interface PumpCountOption {
  value: string;
  label: string;
}

/**
 * Template data structure
 */
export interface TemplateData {
  PUMP: Array<Array<string>>;
  PANEL: Array<Array<string>>;
}

/**
 * Error messages structure
 */
export interface ErrorMessages {
  INVALID_FILE_TYPE: string;
  NO_TABLES_FOUND: string;
  PUMP_FIELDS_REQUIRED: string;
  PANEL_FIELDS_REQUIRED: string;
  NO_MATCH_FOUND: string;
  NO_PRICE_FOUND: string;
}

/**
 * Accepted file types
 */
export interface AcceptedFileTypes {
  MECHANICAL: string;
  PANEL: string;
}
