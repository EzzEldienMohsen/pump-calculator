/**
 * Excel Exporter Utility
 * Exports calculation results to Excel
 */

import * as XLSX from 'xlsx';

interface ExportData {
  pumpCount: string;
  suctionSize?: string;
  motorPower?: string;
  panelType?: string;
  pumpPrice: number | null;
  panelPrice: number | null;
  totalPrice: number;
  margin: string;
  adjustedPrice: number | null;
}

/**
 * Exports calculation results to Excel file
 */
export const exportToExcel = (data: ExportData): void => {
  try {
    const marginValue = parseFloat(data.margin);
    const adjustedPrice = marginValue && marginValue > 0 ? data.totalPrice / marginValue : null;

    // Prepare data for Excel
    const excelData = [
      ['Pump & Panel Price Calculation', '', 'حساب أسعار المضخات واللوحات'],
      [''],
      ['Description', 'Value', 'الوصف'],
      [''],
      // Pump Details
      ['=== PUMP DETAILS / تفاصيل المضخات ===', '', ''],
      ['Pump Count / عدد المضخات', data.pumpCount, ''],
    ];

    if (data.suctionSize) {
      excelData.push(['Suction Size / قطر السحب', data.suctionSize, '']);
    }

    if (data.pumpPrice !== null) {
      excelData.push(['Pump Price / سعر المضخات', data.pumpPrice.toFixed(2) + ' SAR', '']);
    }

    excelData.push(['']);

    // Panel Details
    if (data.panelPrice !== null) {
      excelData.push(['=== PANEL DETAILS / تفاصيل اللوحات ===', '', '']);
      excelData.push(['Pump Count / عدد المضخات', data.pumpCount, '']);

      if (data.motorPower) {
        excelData.push(['Motor Power / قدرة المحرك', data.motorPower + ' HP', '']);
      }

      if (data.panelType) {
        excelData.push(['Panel Type / نوع اللوحة', data.panelType, '']);
      }

      excelData.push(['Panel Price / سعر اللوحة', data.panelPrice.toFixed(2) + ' SAR', '']);
      excelData.push(['']);
    }

    // Totals
    excelData.push(['=== TOTALS / الإجمالي ===', '', '']);
    excelData.push(['Total Price / السعر الإجمالي', data.totalPrice.toFixed(2) + ' SAR', '']);

    if (marginValue && marginValue > 0 && adjustedPrice) {
      excelData.push(['']);
      excelData.push(['Margin / الهامش', marginValue.toString(), '']);
      excelData.push(['Adjusted Price / السعر بعد الهامش', adjustedPrice.toFixed(2) + ' SAR', '']);
      excelData.push(['Formula / الصيغة', `Total Price ÷ Margin = ${data.totalPrice.toFixed(2)} ÷ ${marginValue} = ${adjustedPrice.toFixed(2)}`, '']);
    }

    excelData.push(['']);
    excelData.push(['Generated on / تاريخ الإنشاء', new Date().toLocaleString(), '']);

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 35 },
      { wch: 20 },
      { wch: 30 }
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calculation Results');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `Pump_Panel_Calculation_${timestamp}.xlsx`;

    // Write and download the file
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('فشل في تصدير البيانات إلى Excel | Failed to export data to Excel');
  }
};
