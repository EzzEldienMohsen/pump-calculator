/**
 * Table Parser Utility
 * Parses tables from text content extracted from various file formats
 */

/**
 * Parses tables from an array of text lines
 */
export const parseTablesFromText = (lines: string[]): string[][][] => {
  const tables: string[][][] = [];
  let currentTable: string[][] = [];

  for (const line of lines) {
    // Split by tabs or multiple spaces to identify columns
    const cells = line.split(/\t+|\s{2,}/).filter(cell => cell.trim());

    // If line has multiple cells, it's likely part of a table
    if (cells.length > 1) {
      currentTable.push(cells);
    } else if (currentTable.length > 0) {
      // End of current table, start a new one
      tables.push(currentTable);
      currentTable = [];
    }
  }

  // Add the last table if it exists
  if (currentTable.length > 0) {
    tables.push(currentTable);
  }

  return tables;
};

/**
 * Normalizes cell values by removing special characters
 */
export const normalizeCell = (cell: unknown): string => {
  return String(cell || '').replace(/[Ø"]/g, '').trim();
};

/**
 * Checks if a row contains a specific value
 */
export const rowContains = (row: Array<string | number>, searchValue: string): boolean => {
  const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();
  return rowStr.includes(searchValue.toLowerCase());
};

/**
 * Extracts numeric price from a row
 */
export const extractPriceFromRow = (row: Array<string | number>, minThreshold: number = 100): number | null => {
  for (const cell of row) {
    const numValue = parseFloat(String(cell || '').replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue > minThreshold) {
      return numValue;
    }
  }
  return null;
};
