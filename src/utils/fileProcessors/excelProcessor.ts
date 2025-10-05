/**
 * Excel File Processor
 * Handles extraction of table data from Excel files (.xlsx, .xls)
 */

import * as XLSX from 'xlsx';
import type { FileProcessResult } from '../../types';

/**
 * Processes an Excel file and extracts table data
 */
export const processExcelFile = async (file: File): Promise<FileProcessResult> => {
  try {
    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Parse the workbook
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Get the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert sheet to JSON (2D array format)
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Array<Array<string | number>>;

    if (jsonData.length === 0) {
      throw new Error('errors.emptyFile');
    }

    // Extract headers (first row)
    const headers = jsonData[0].map(h => String(h || ''));

    // Extract data rows (filter out empty rows)
    const data = jsonData
      .slice(1)
      .filter(row => row.some(cell => cell !== undefined && cell !== ''));

    return { headers, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'errors.unknownError';
    throw new Error(`errors.excelProcessingError: ${errorMessage}`);
  }
};
