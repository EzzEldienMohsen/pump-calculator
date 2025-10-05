/**
 * Template Generator Utility
 * Generates sample Excel templates for testing
 */

import * as XLSX from 'xlsx';
import { TEMPLATE_DATA } from '../constants';

/**
 * Downloads an Excel template file with sample data
 */
export const downloadTemplate = (): void => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create worksheets from template data
    const pumpSheet = XLSX.utils.aoa_to_sheet(TEMPLATE_DATA.PUMP);
    const panelSheet = XLSX.utils.aoa_to_sheet(TEMPLATE_DATA.PANEL);

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, pumpSheet, 'Pump Prices');
    XLSX.utils.book_append_sheet(workbook, panelSheet, 'Panel Prices');

    // Write and download the file
    XLSX.writeFile(workbook, 'Price_Template.xlsx');
  } catch (error) {
    console.error('Error generating template:', error);
    throw new Error('فشل في تحميل النموذج');
  }
};
