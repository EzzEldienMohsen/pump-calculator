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
 * Normalizes size values to handle fractions and decimals consistently
 * All values are converted to decimal format for comparison
 * Examples: "1 1/2", "11/2", "1-1/2", "1.5" all become "1.5"
 * Examples: "1 1/4", "11/4", "1.25" all become "1.25"
 */
export const normalizeSizeValue = (value: string | number): string => {
  // Convert to string and remove special characters
  let normalized = String(value).replace(/[Ø"]/g, '').trim();

  // If already a decimal number, return as is
  const decimalPattern = /^\d+(\.\d+)?$/;
  if (decimalPattern.test(normalized)) {
    return parseFloat(normalized).toString();
  }

  // Handle fractions: "1 1/2" or "11/2" or "1-1/2" → "1.5"
  const fractionPattern = /^(\d+)\s*[-\s]?\s*(\d+)\/(\d+)$/;
  const match = normalized.match(fractionPattern);

  if (match) {
    const whole = parseInt(match[1]);
    const numerator = parseInt(match[2]);
    const denominator = parseInt(match[3]);
    return (whole + numerator / denominator).toString();
  }

  // Simple fraction: "1/2" → "0.5", "1/4" → "0.25"
  const simpleFractionPattern = /^(\d+)\/(\d+)$/;
  const simpleMatch = normalized.match(simpleFractionPattern);

  if (simpleMatch) {
    const numerator = parseInt(simpleMatch[1]);
    const denominator = parseInt(simpleMatch[2]);
    return (numerator / denominator).toString();
  }

  // No fraction, return as-is
  return normalized;
};

/**
 * Checks if a row contains a specific value
 */
export const rowContains = (row: Array<string | number>, searchValue: string): boolean => {
  const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();
  return rowStr.includes(searchValue.toLowerCase());
};

/**
 * Extracts numeric price from a row (returns the LARGEST number above threshold)
 */
export const extractPriceFromRow = (row: Array<string | number>, minThreshold: number = 100): number | null => {
  let maxPrice: number | null = null;

  for (const cell of row) {
    const numValue = parseFloat(String(cell || '').replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue > minThreshold) {
      if (maxPrice === null || numValue > maxPrice) {
        maxPrice = numValue;
      }
    }
  }

  return maxPrice;
};
