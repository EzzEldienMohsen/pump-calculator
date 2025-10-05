/**
 * Word File Processor
 * Handles extraction of table data from Word documents (.docx, .doc)
 */

import * as mammoth from 'mammoth';
import { parseTablesFromText } from './tableParser';
import { ERROR_MESSAGES } from '../../constants';
import type { FileProcessResult } from '../../types';

/**
 * Processes a Word document and extracts table data
 */
export const processWordFile = async (file: File): Promise<FileProcessResult> => {
  try {
    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Extract raw text from Word document
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;

    // Split text into lines and filter empty lines
    const lines = text.split('\n').filter(line => line.trim());

    // Parse tables from text
    const tables = parseTablesFromText(lines);

    if (tables.length === 0) {
      throw new Error(ERROR_MESSAGES.NO_TABLES_FOUND);
    }

    // Use the first table found
    const table = tables[0];

    if (table.length === 0) {
      throw new Error('errors.emptyTable');
    }

    // Extract headers and data
    const headers = table[0];
    const data: Array<Array<string | number>> = table.slice(1);

    return { headers, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'errors.unknownError';
    throw new Error(`errors.wordProcessingError: ${errorMessage}`);
  }
};
