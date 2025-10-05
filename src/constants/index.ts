/**
 * Application Constants
 * Contains all constant values used throughout the application
 */

import type { AcceptedFileTypes, ErrorMessages, PumpCountOption, TemplateData } from '../types';

// File Type Configurations
export const ACCEPTED_FILE_TYPES: AcceptedFileTypes = {
  MECHANICAL: '.xlsx,.xls,.docx,.doc,.pdf',
  PANEL: '.xlsx,.xls,.docx,.doc,.pdf'
};

// Pump Count Options
export const PUMP_COUNT_OPTIONS: PumpCountOption[] = [
  { value: '1', label: '1 مضخة' },
  { value: '2', label: '2 مضخة' },
  { value: '3', label: '3 مضخة' },
  { value: '4', label: '4 مضخة' }
];

// Panel Type Options
export const PANEL_TYPE_OPTIONS: string[] = [
  'DOL',
  'Star Delta',
  'VFD',
  'Soft Starter'
];

// Sample Template Data
export const TEMPLATE_DATA: TemplateData = {
  PUMP: [
    ['Pump Suction Size', 'Price', 'Header Size', 'Description'],
    ['Ø1"', '800', '1"', '1 Pump Headers'],
    ['Ø1 1/4"', '950', '1 1/4"', '1 Pump Headers'],
    ['Ø2"', '1800', '2"', '2 Pump 1D/1S Headers'],
    ['Ø3"', '2500', '3"', '3 Pump D/S/A Headers']
  ],
  PANEL: [
    ['Pump Count', 'Motor Power (HP)', 'Panel Type', 'Price'],
    ['1', '5.5', 'DOL', '1200'],
    ['2', '7.5', 'Star Delta', '2500'],
    ['3', '10', 'VFD', '4500'],
    ['4', '15', 'Soft Starter', '5500']
  ]
};

// Error Message Keys (for translation)
export const ERROR_MESSAGES: ErrorMessages = {
  INVALID_FILE_TYPE: 'errors.invalidFileType',
  NO_TABLES_FOUND: 'errors.noTablesFound',
  PUMP_FIELDS_REQUIRED: 'errors.pumpFieldsRequired',
  PANEL_FIELDS_REQUIRED: 'errors.panelFieldsRequired',
  NO_MATCH_FOUND: 'errors.noMatchFound',
  NO_PRICE_FOUND: 'errors.noPriceFound'
};

// Minimum price threshold for validation
export const MIN_PRICE_THRESHOLD: number = 100;
