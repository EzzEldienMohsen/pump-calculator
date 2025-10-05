/**
 * PDF File Processor
 * Handles extraction of table data from PDF files
 */

import * as pdfjsLib from 'pdfjs-dist';
import { parseTablesFromText } from './tableParser';
import { ERROR_MESSAGES } from '../../constants';
import type { FileProcessResult } from '../../types';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

/**
 * Processes a PDF file and extracts table data
 */
export const processPDFFile = async (file: File): Promise<FileProcessResult> => {
  try {
    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const allRows: Array<Array<string | number>> = [];

    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      // Group items by Y position (same row)
      const rows = new Map<number, any[]>();

      for (const item of textContent.items as any[]) {
        const y = Math.round(item.transform[5]); // Y coordinate
        if (!rows.has(y)) {
          rows.set(y, []);
        }
        rows.get(y)!.push(item);
      }

      // Sort rows by Y position (top to bottom)
      const sortedRows = Array.from(rows.entries()).sort((a, b) => b[0] - a[0]);

      // Convert each row to text
      for (const [, items] of sortedRows) {
        // Sort items by X position (left to right)
        items.sort((a, b) => a.transform[4] - b.transform[4]);

        // Extract text from items
        const rowText = items.map(item => item.str.trim()).filter(str => str);

        if (rowText.length > 0) {
          allRows.push(rowText);
        }
      }
    }

    if (allRows.length === 0) {
      throw new Error(ERROR_MESSAGES.NO_TABLES_FOUND);
    }

    // Extract headers (first row)
    const headers = allRows[0].map(h => String(h || ''));

    // Extract data rows
    const data = allRows.slice(1).filter(row => row.length > 0);

    // Debug: Log extracted table structure
    console.log('📄 PDF Extraction - Full Table:', {
      totalRows: allRows.length,
      headers,
      sampleRows: data.slice(0, 10)
    });

    return { headers, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'errors.unknownError';
    throw new Error(`errors.pdfProcessingError: ${errorMessage}`);
  }
};
