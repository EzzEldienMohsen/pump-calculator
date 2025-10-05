# 🚰 Pump & Panel Price Calculator

A professional React application for calculating pump and electrical panel prices based on uploaded specification files.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [File Format Requirements](#file-format-requirements)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [License](#license)

## 🎯 Overview

This application provides an intuitive interface for mechanical and electrical engineers to calculate pump system costs by uploading pricing files and entering system specifications. It supports multiple file formats (Excel, Word, PDF) and automatically extracts pricing data to provide instant cost calculations.

## ✨ Features

- **Multi-Format File Support**: Upload Excel (.xlsx, .xls), Word (.docx, .doc), or PDF files
- **Pump Price Calculation**: Calculate prices based on:
  - Number of pumps (1-4)
  - Suction size (in inches)
  - Header type (1D/1S, D/S/A, etc.)
- **Panel Price Calculation**: Calculate electrical panel prices based on:
  - Number of pumps
  - Motor power (HP)
  - Panel type (DOL, Star Delta, VFD, Soft Starter)
- **Total Price Summary**: Automatic calculation of combined pump and panel costs
- **Margin Calculation**: Adjust final price with custom margin/division factor
- **Excel Export**: Export calculation results to formatted Excel spreadsheet
- **Template Generator**: Download sample Excel files to test the application
- **Multi-Language Support**:
  - Arabic (RTL) - Default
  - English (LTR)
  - Automatic language detection and localStorage persistence
- **Theme Customization**: 27+ DaisyUI themes to choose from
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS and DaisyUI
- **Type Safety**: Full TypeScript implementation for better code quality

## 🛠 Tech Stack

- **Framework**: React 19.1.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Styling**:
  - Tailwind CSS 4.1.14
  - DaisyUI 5.1.27
- **Icons**: Lucide React 0.544.0
- **Internationalization**:
  - i18next 25.5.3
  - react-i18next 16.0.0
  - i18next-browser-languagedetector 8.2.0
- **File Processing**:
  - XLSX 0.18.5 (Excel files)
  - Mammoth 1.11.0 (Word files)
  - PDF.js 5.4.149 (PDF files)

## 📁 Project Structure

```
pump-calculator/
├── src/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── PumpCalculator.tsx      # Pump price calculator component
│   │   │   ├── PanelCalculator.tsx     # Panel price calculator component
│   │   │   └── TotalPrice.tsx          # Total price display with margin & export
│   │   ├── FileUpload/
│   │   │   ├── FileUploadCard.tsx      # File upload card wrapper
│   │   │   └── FileUploadZone.tsx      # Drag-and-drop upload zone
│   │   ├── Header/
│   │   │   └── Header.tsx              # App header with language/theme switcher
│   │   ├── common/
│   │   │   ├── ErrorAlert.tsx          # Error message component
│   │   │   └── LoadingSpinner.tsx      # Loading state component
│   │   └── Instructions.tsx            # Usage instructions component
│   ├── utils/
│   │   ├── fileProcessors/
│   │   │   ├── excelProcessor.ts       # Excel file handler
│   │   │   ├── wordProcessor.ts        # Word file handler
│   │   │   ├── pdfProcessor.ts         # PDF file handler
│   │   │   └── tableParser.ts          # Table parsing utilities
│   │   ├── priceCalculators/
│   │   │   ├── pumpPriceCalculator.ts  # Pump pricing logic
│   │   │   └── panelPriceCalculator.ts # Panel pricing logic
│   │   ├── templateGenerator.ts        # Excel template generator
│   │   └── excelExporter.ts            # Export calculations to Excel
│   ├── locales/
│   │   ├── ar.ts                       # Arabic translations
│   │   └── en.ts                       # English translations
│   ├── constants/
│   │   └── index.ts                    # Application constants
│   ├── types/
│   │   └── index.ts                    # TypeScript type definitions
│   ├── i18n.ts                         # i18next configuration
│   ├── App.tsx                         # Main application component
│   ├── main.tsx                        # Application entry point
│   └── index.css                       # Global styles
├── public/                             # Static assets
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
└── README.md                           # This file
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd pump-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### 1. Upload Pricing Files

**Mechanical File (Pumps)**:
- Upload an Excel, Word, or PDF file containing pump pricing data
- File should include columns for: Suction Size, Price, Header Type

**Panel File (Electrical Panels)**:
- Upload an Excel, Word, or PDF file containing panel pricing data
- File should include columns for: Pump Count, Motor Power, Panel Type, Price

### 2. Calculate Pump Price

1. Select the number of pumps (1-4)
2. Enter the suction size (e.g., 1, 1 1/4, 2, 3)
3. Click "احسب سعر المضخات" (Calculate Pump Price)

### 3. Calculate Panel Price

1. Enter the number of pumps
2. Enter motor power in HP (e.g., 5.5, 7.5, 10)
3. Select or enter panel type (DOL, Star Delta, VFD, Soft Starter)
4. Click "احسب سعر اللوحة" (Calculate Panel Price)

### 4. View Total & Export

The application automatically calculates and displays the total price combining both pump and panel costs.

**Optional Margin Calculation**:
- Enter a margin value (e.g., 1.3) to divide the total price
- The adjusted price will be displayed automatically

**Export to Excel**:
- Click "تصدير إلى Excel" (Export to Excel) to download a formatted Excel file
- The file includes all calculation details and results

## 📄 File Format Requirements

### Pump Pricing File

Example table structure:

| Pump Suction Size | Price | Header Size | Description |
|------------------|-------|-------------|-------------|
| Ø1"              | 800   | 1"          | 1 Pump Headers |
| Ø1 1/4"          | 950   | 1 1/4"      | 1 Pump Headers |
| Ø2"              | 1800  | 2"          | 2 Pump 1D/1S Headers |
| Ø3"              | 2500  | 3"          | 3 Pump D/S/A Headers |

### Panel Pricing File

Example table structure:

| Pump Count | Motor Power (HP) | Panel Type | Price |
|-----------|------------------|------------|-------|
| 1         | 5.5              | DOL        | 1200  |
| 2         | 7.5              | Star Delta | 2500  |
| 3         | 10               | VFD        | 4500  |
| 4         | 15               | Soft Starter | 5500 |

### Download Sample Template

Click the "تحميل نموذج Excel للتجربة" (Download Excel Template) button in the application to get a properly formatted sample file.

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization

- **Components**: Reusable UI components following single responsibility principle
- **Utils**: Pure functions for file processing and calculations
- **Locales**: Centralized translation files for Arabic and English
- **Types**: TypeScript type definitions for type safety
- **Constants**: Centralized configuration and constant values
- **Separation of Concerns**: Clear separation between UI, business logic, and utilities

### Coding Standards

- **TypeScript**: Full type safety across the entire application
- **JSDoc comments**: Documentation for all functions
- **Descriptive naming**: Clear variable and function names
- **Modular architecture**: Component-based design
- **Error handling**: Comprehensive error handling for all async operations
- **Internationalization**: Translation keys for all user-facing text

## 🏗 Build & Deploy

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment

The built files in `dist/` can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Azure Static Web Apps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Multi-format file upload support (Excel, Word, PDF)
- Pump and panel price calculators
- Total price calculation with margin adjustment
- Excel export functionality
- Template generator
- Dual-language support (Arabic RTL & English LTR)
- 27+ theme options
- Full TypeScript implementation
- Responsive design

---

Made with ❤️ using React + Vite + Tailwind CSS
