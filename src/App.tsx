/**
 * Main App Component
 * Pump and Panel Price Calculator Application
 *
 * This application allows users to:
 * - Upload mechanical and electrical panel pricing files
 * - Calculate pump prices based on pump count and suction size
 * - Calculate panel prices based on motor power and panel type
 * - View total combined pricing
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, Zap, Calculator } from 'lucide-react';

// Components
import Header from './components/Header/Header';
import FileUploadCard from './components/FileUpload/FileUploadCard';
import PumpCalculator from './components/Calculator/PumpCalculator';
import PanelCalculator from './components/Calculator/PanelCalculator';
import TotalPrice from './components/Calculator/TotalPrice';
import ErrorAlert from './components/common/ErrorAlert';
import LoadingSpinner from './components/common/LoadingSpinner';
import Instructions from './components/Instructions';

// Utilities
import { processExcelFile } from './utils/fileProcessors/excelProcessor';
import { processWordFile } from './utils/fileProcessors/wordProcessor';
import { processPDFFile } from './utils/fileProcessors/pdfProcessor';
import { calculatePumpPrice as calcPumpPrice } from './utils/priceCalculators/pumpPriceCalculator';
import { calculatePanelPrice as calcPanelPrice } from './utils/priceCalculators/panelPriceCalculator';
import { downloadTemplate } from './utils/templateGenerator';
import { exportToExcel } from './utils/excelExporter';

// Constants
import { ACCEPTED_FILE_TYPES, ERROR_MESSAGES } from './constants';
import type { PumpDetails, PanelDetails } from './types';

/**
 * Main Application Component
 */
export default function App() {
  const { t } = useTranslation();

  /**
   * Translates error messages by checking if they contain translation keys
   */
  const translateError = (errorMessage: string): string => {
    // Check if error starts with 'errors.' indicating it's a translation key
    if (errorMessage.startsWith('errors.')) {
      // Simple translation key
      if (!errorMessage.includes(':')) {
        return t(errorMessage);
      }

      // Has detail after the key (e.g., "errors.pdfProcessingError: details")
      const colonIndex = errorMessage.indexOf(':');
      const key = errorMessage.substring(0, colonIndex).trim();
      const detail = errorMessage.substring(colonIndex + 1).trim();

      // Check if detail is also a translation key
      if (detail.startsWith('errors.')) {
        return t(detail);
      }

      // Return translated key with detail
      return `${t(key)}: ${detail}`;
    }

    // Check if it contains translation key pattern (errors.something)
    const match = errorMessage.match(/errors\.\w+/);
    if (match) {
      const key = match[0];
      const translated = t(key);
      return errorMessage.replace(key, translated);
    }

    return errorMessage;
  };

  // File state
  const [mechanicalFile, setMechanicalFile] = useState<File | null>(null);
  const [panelFile, setPanelFile] = useState<File | null>(null);

  // Table data state
  const [pumpTableData, setPumpTableData] = useState<Array<Array<string | number>>>([]);
  const [pumpHeaders, setPumpHeaders] = useState<string[]>([]);
  const [panelTableData, setPanelTableData] = useState<Array<Array<string | number>>>([]);
  const [panelHeaders, setPanelHeaders] = useState<string[]>([]);

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Pump calculator state
  const [pumpCount, setPumpCount] = useState<string>('');
  const [suctionSize, setSuctionSize] = useState<string>('');
  const [calculatedPumpPrice, setCalculatedPumpPrice] = useState<number | null>(null);
  const [pumpDetails, setPumpDetails] = useState<PumpDetails | null>(null);

  // Panel calculator state
  const [panelPumpCount, setPanelPumpCount] = useState<string>('');
  const [motorPower, setMotorPower] = useState<string>('');
  const [panelType, setPanelType] = useState<string>('');
  const [calculatedPanelPrice, setCalculatedPanelPrice] = useState<number | null>(null);
  const [panelDetails, setPanelDetails] = useState<PanelDetails | null>(null);

  // Total price state
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  // Margin state
  const [margin, setMargin] = useState<string>('');

  /**
   * Processes uploaded file based on file type
   */
  const processFile = async (file: File, type: 'mechanical' | 'panel'): Promise<void> => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    try {
      let result;

      // Determine file type and process accordingly
      if (fileType.includes('sheet') || fileType.includes('excel') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        result = await processExcelFile(file);
      } else if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        result = await processWordFile(file);
      } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        result = await processPDFFile(file);
      } else {
        throw new Error(ERROR_MESSAGES.INVALID_FILE_TYPE);
      }

      // Update state based on file type
      if (type === 'mechanical') {
        setPumpHeaders(result.headers);
        setPumpTableData(result.data);
      } else if (type === 'panel') {
        setPanelHeaders(result.headers);
        setPanelTableData(result.data);
      }
    } catch (err) {
      console.error('File processing error:', err);
      throw err;
    }
  };

  /**
   * Handles mechanical file upload
   */
  const handleMechanicalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setLoading(true);
    setError('');
    setMechanicalFile(uploadedFile);

    try {
      await processFile(uploadedFile, 'mechanical');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errors.unknownError');
      console.error('Mechanical file error:', errorMessage);
      setError(translateError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles panel file upload
   */
  const handlePanelFileUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setLoading(true);
    setError('');
    setPanelFile(uploadedFile);

    try {
      await processFile(uploadedFile, 'panel');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errors.unknownError');
      console.error('Panel file error:', errorMessage);
      setError(translateError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calculates total price from pump and panel prices
   */
  const calculateTotal = (pumpPrice: number | null, panelPrice: number | null): void => {
    if (pumpPrice !== null && panelPrice !== null) {
      setTotalPrice(pumpPrice + panelPrice);
    } else if (pumpPrice !== null) {
      setTotalPrice(pumpPrice);
    } else if (panelPrice !== null) {
      setTotalPrice(panelPrice);
    } else {
      setTotalPrice(null);
    }
  };

  /**
   * Handles pump price calculation
   */
  const handleCalculatePumpPrice = (): void => {
    setError('');
    const result = calcPumpPrice(pumpTableData, pumpCount, suctionSize);

    if (result.success && result.price !== undefined && result.details) {
      setCalculatedPumpPrice(result.price);
      setPumpDetails(result.details as PumpDetails);
      calculateTotal(result.price, calculatedPanelPrice);
    } else {
      let errorMsg = translateError(result.error || '');

      // Add details for "no match found" errors
      if (result.error === ERROR_MESSAGES.NO_MATCH_FOUND && pumpCount && suctionSize) {
        errorMsg = `${errorMsg} (${pumpCount} ${t('calculator.pump.pumpCount')}, ${suctionSize} ${t('calculator.pump.suctionSize')})`;
      }

      setError(errorMsg);
      setCalculatedPumpPrice(null);
      setPumpDetails(null);
    }
  };

  /**
   * Handles panel price calculation
   */
  const handleCalculatePanelPrice = (): void => {
    setError('');
    const result = calcPanelPrice(panelTableData, panelPumpCount, motorPower, panelType);

    if (result.success && result.price !== undefined && result.details) {
      setCalculatedPanelPrice(result.price);
      setPanelDetails(result.details as PanelDetails);
      calculateTotal(calculatedPumpPrice, result.price);
    } else {
      let errorMsg = translateError(result.error || '');

      // Add details for "no match found" errors
      if (result.error === ERROR_MESSAGES.NO_MATCH_FOUND && panelPumpCount && motorPower && panelType) {
        errorMsg = `${errorMsg} (${panelPumpCount} ${t('calculator.panel.pumpCount')}, ${motorPower} ${t('calculator.panel.motorPower')}, ${panelType})`;
      }

      setError(errorMsg);
      setCalculatedPanelPrice(null);
      setPanelDetails(null);
    }
  };

  /**
   * Handles Excel export
   */
  const handleExportToExcel = (): void => {
    if (totalPrice === null) return;

    try {
      exportToExcel({
        pumpCount: pumpCount || panelPumpCount,
        suctionSize: suctionSize,
        motorPower: motorPower,
        panelType: panelType,
        pumpPrice: calculatedPumpPrice,
        panelPrice: calculatedPanelPrice,
        totalPrice: totalPrice,
        margin: margin,
        adjustedPrice: null // calculated inside exportToExcel
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errors.unknownError');
      setError(translateError(errorMessage));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Page Title */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">
            {t('pageTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t('pageSubtitle')}</p>
        </div>

        {/* File Upload Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Mechanical File Upload */}
          <FileUploadCard
            title={t('fileUpload.mechanicalTitle')}
            icon={<DollarSign className="w-6 h-6" />}
            titleColor="text-indigo-900 dark:text-indigo-300"
            file={mechanicalFile}
            onFileUpload={handleMechanicalFileUpload}
            acceptedTypes={ACCEPTED_FILE_TYPES.MECHANICAL}
            uploadLabel={t('fileUpload.uploadLabel.mechanical')}
            borderColor="border-blue-300 hover:border-blue-500"
          />

          {/* Panel File Upload */}
          <FileUploadCard
            title={t('fileUpload.panelTitle')}
            icon={<Zap className="w-6 h-6" />}
            titleColor="text-purple-900 dark:text-purple-300"
            file={panelFile}
            onFileUpload={handlePanelFileUpload}
            acceptedTypes={ACCEPTED_FILE_TYPES.PANEL}
            uploadLabel={t('fileUpload.uploadLabel.panel')}
            borderColor="border-purple-300 hover:border-purple-500"
          />
        </div>

        {/* Loading and Error States */}
        <LoadingSpinner loading={loading} />
        <ErrorAlert message={error} />

        {/* Download Template Button */}
        <div className="text-center mb-4">
          <button className="btn btn-outline btn-sm" onClick={downloadTemplate}>
            {t('instructions.downloadTemplate')}
          </button>
        </div>

        {/* Calculator Section */}
        {(pumpTableData.length > 0 || panelTableData.length > 0) && (
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl text-indigo-900 dark:text-indigo-300 mb-6">
                <Calculator className="w-7 h-7" />
                {t('calculator.title')}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Pump Calculator */}
                {pumpTableData.length > 0 && (
                  <PumpCalculator
                    pumpCount={pumpCount}
                    setPumpCount={setPumpCount}
                    suctionSize={suctionSize}
                    setSuctionSize={setSuctionSize}
                    onCalculate={handleCalculatePumpPrice}
                    calculatedPrice={calculatedPumpPrice}
                    details={pumpDetails}
                  />
                )}

                {/* Panel Calculator */}
                {panelTableData.length > 0 && (
                  <PanelCalculator
                    panelPumpCount={panelPumpCount}
                    setPanelPumpCount={setPanelPumpCount}
                    motorPower={motorPower}
                    setMotorPower={setMotorPower}
                    panelType={panelType}
                    setPanelType={setPanelType}
                    onCalculate={handleCalculatePanelPrice}
                    calculatedPrice={calculatedPanelPrice}
                    details={panelDetails}
                  />
                )}
              </div>

              {/* Total Price Display */}
              <TotalPrice
                totalPrice={totalPrice}
                pumpPrice={calculatedPumpPrice}
                panelPrice={calculatedPanelPrice}
                margin={margin}
                setMargin={setMargin}
                onExport={handleExportToExcel}
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        <Instructions
          show={pumpTableData.length === 0 && panelTableData.length === 0 && !loading}
        />
      </div>
    </div>
  );
}
