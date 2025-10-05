/**
 * English Translation File
 */

export default {
  translation: {
    // Header
    header: {
      title: 'Pump Price Calculations'
    },

    // Languages
    language: {
      ar: 'Arabic',
      en: 'English'
    },

    // Theme
    theme: {
      light: 'Light',
      dark: 'Dark',
      cupcake: 'Cupcake',
      bumblebee: 'Bumblebee',
      emerald: 'Emerald',
      corporate: 'Corporate',
      synthwave: 'Synthwave',
      retro: 'Retro',
      cyberpunk: 'Cyberpunk',
      valentine: 'Valentine',
      halloween: 'Halloween',
      garden: 'Garden',
      forest: 'Forest',
      aqua: 'Aqua',
      lofi: 'Lofi',
      pastel: 'Pastel',
      fantasy: 'Fantasy',
      wireframe: 'Wireframe',
      black: 'Black',
      luxury: 'Luxury',
      dracula: 'Dracula',
      cmyk: 'CMYK',
      autumn: 'Autumn',
      business: 'Business',
      acid: 'Acid',
      lemonade: 'Lemonade',
      night: 'Night',
      coffee: 'Coffee',
      winter: 'Winter'
    },

    // Page Title
    pageTitle: 'Pump & Panel Price Calculator',
    pageSubtitle: 'Upload mechanical and panel files and calculate total price',

    // File Upload
    fileUpload: {
      mechanicalTitle: 'Mechanical File (Pumps)',
      panelTitle: 'Electrical Panel File',
      uploadLabel: {
        mechanical: 'Upload Pump File',
        panel: 'Upload Panel File'
      },
      fileTypes: 'Excel, Word, PDF',
      fileUploaded: 'File uploaded'
    },

    // Calculator
    calculator: {
      title: 'Calculate Total Price',
      pump: {
        title: 'Pumps',
        pumpCount: 'Number of Pumps',
        suctionSize: 'Suction Size (inches)',
        suctionPlaceholder: 'Example: 1, 1 1/4, 2, 3',
        selectCount: 'Select count',
        calculate: 'Calculate Pump Price',
        pumpLabel: {
          one: '1 Pump',
          two: '2 Pumps',
          three: '3 Pumps',
          four: '4 Pumps'
        }
      },
      panel: {
        title: 'Electrical Panels',
        pumpCount: 'Number of Pumps',
        motorPower: 'Motor Power (HP)',
        panelType: 'Panel Type',
        pumpPlaceholder: 'Example: 1, 2, 3',
        powerPlaceholder: 'Example: 5.5, 7.5, 10',
        typePlaceholder: 'DOL, Star Delta, VFD',
        calculate: 'Calculate Panel Price'
      },
      total: {
        title: 'Total Price',
        both: 'Pumps + Panels',
        pumpOnly: 'Pumps Only',
        panelOnly: 'Panels Only',
        pumps: 'Pumps',
        panels: 'Panels',
        currency: 'SAR',
        margin: 'Margin',
        marginPlaceholder: 'Enter margin (e.g., 1.3)',
        marginHint: 'Total price will be divided by this number',
        adjustedPrice: 'Adjusted Price',
        afterMargin: 'After margin division',
        exportExcel: 'Export to Excel'
      }
    },

    // Instructions
    instructions: {
      title: 'How to Use',
      steps: {
        step1: 'Upload mechanical file (Excel, Word, PDF) containing pump prices',
        step2: 'Upload panel file (Excel, Word, PDF) containing electrical panel prices',
        step3: 'Enter pump count and suction size to calculate pump price',
        step4: 'Enter pump count, motor power, and panel type to calculate panel price',
        step5: 'Total price will be calculated automatically'
      },
      tableFormat: 'Table Format Examples',
      pumpTable: {
        title: 'Pump Table',
        columns: 'Required Columns:',
        col1: 'Suction size (Example: Ø1", Ø2")',
        col2: 'Price (number)',
        col3: 'Header type (1 Pump, 2 Pump, etc.)'
      },
      panelTable: {
        title: 'Panel Table',
        columns: 'Required Columns:',
        col1: 'Pump count (1, 2, 3, 4)',
        col2: 'Motor power HP (5.5, 7.5, etc.)',
        col3: 'Panel type (DOL, Star Delta, VFD)',
        col4: 'Price (number)'
      },
      downloadTemplate: 'Download Excel Template for Testing'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },

    // Error Messages
    errors: {
      invalidFileType: 'Please upload Excel, Word, or PDF files only',
      noTablesFound: 'No tables found in the file',
      pumpFieldsRequired: 'Please enter pump count and suction size',
      panelFieldsRequired: 'Please enter all data (pump count, motor power, panel type)',
      noMatchFound: 'No match found',
      noPriceFound: 'No price found in matching row',
      emptyTable: 'Extracted table is empty',
      emptyFile: 'File is empty or contains no data',
      unknownError: 'Unknown error',
      mechanicalFileError: 'Error processing mechanical file',
      panelFileError: 'Error processing panel file',
      pdfProcessingError: 'Error processing PDF file',
      excelProcessingError: 'Error processing Excel file',
      wordProcessingError: 'Error processing Word file'
    }
  }
};
