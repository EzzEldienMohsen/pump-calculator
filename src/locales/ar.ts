/**
 * Arabic Translation File
 */

export default {
  translation: {
    // Header
    header: {
      title: 'حاسبة أسعار المضخات'
    },

    // Languages
    language: {
      ar: 'العربية',
      en: 'English'
    },

    // Theme
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      cupcake: 'كب كيك',
      bumblebee: 'نحلة',
      emerald: 'زمردي',
      corporate: 'شركات',
      synthwave: 'سينث ويف',
      retro: 'ريترو',
      cyberpunk: 'سايبربانك',
      valentine: 'فالنتاين',
      halloween: 'هالوين',
      garden: 'حديقة',
      forest: 'غابة',
      aqua: 'مائي',
      lofi: 'لوفاي',
      pastel: 'باستيل',
      fantasy: 'فانتازيا',
      wireframe: 'إطار سلكي',
      black: 'أسود',
      luxury: 'فاخر',
      dracula: 'دراكولا',
      cmyk: 'CMYK',
      autumn: 'خريف',
      business: 'أعمال',
      acid: 'حمضي',
      lemonade: 'ليموناضة',
      night: 'ليلي',
      coffee: 'قهوة',
      winter: 'شتوي'
    },

    // Page Title
    pageTitle: 'حاسبة أسعار المضخات واللوحات',
    pageSubtitle: 'ارفع ملفات الميكانيكا واللوحات واحسب السعر الإجمالي',

    // File Upload
    fileUpload: {
      mechanicalTitle: 'ملف الميكانيكا (المضخات)',
      panelTitle: 'ملف اللوحات الكهربائية',
      uploadLabel: {
        mechanical: 'ارفع ملف المضخات',
        panel: 'ارفع ملف اللوحات'
      },
      fileTypes: 'Excel, Word, PDF',
      fileUploaded: 'تم رفع الملف'
    },

    // Calculator
    calculator: {
      title: 'احسب السعر الإجمالي',
      pump: {
        title: 'المضخات',
        pumpCount: 'عدد المضخات',
        suctionSize: 'قطر السحب (بوصة)',
        suctionPlaceholder: 'مثال: 1, 1 1/4, 2, 3',
        selectCount: 'اختر العدد',
        calculate: 'احسب سعر المضخات',
        pumpLabel: {
          one: '1 مضخة',
          two: '2 مضخة',
          three: '3 مضخة',
          four: '4 مضخة'
        }
      },
      panel: {
        title: 'اللوحات الكهربائية',
        pumpCount: 'عدد المضخات',
        motorPower: 'قدرة المحرك (HP)',
        panelType: 'نوع اللوحة',
        pumpPlaceholder: 'مثال: 1, 2, 3',
        powerPlaceholder: 'مثال: 5.5, 7.5, 10',
        typePlaceholder: 'DOL, Star Delta, VFD',
        calculate: 'احسب سعر اللوحة'
      },
      total: {
        title: 'السعر الإجمالي',
        both: 'المضخات + اللوحات',
        pumpOnly: 'المضخات فقط',
        panelOnly: 'اللوحات فقط',
        pumps: 'المضخات',
        panels: 'اللوحات',
        currency: 'ريال سعودي',
        margin: 'الهامش',
        marginPlaceholder: 'أدخل الهامش (مثال: 1.3)',
        marginHint: 'سيتم قسمة السعر الإجمالي على هذا الرقم',
        adjustedPrice: 'السعر بعد الهامش',
        afterMargin: 'بعد قسمة الهامش',
        exportExcel: 'تصدير إلى Excel'
      }
    },

    // Instructions
    instructions: {
      title: 'كيفية الاستخدام',
      steps: {
        step1: 'ارفع ملف الميكانيكا (Excel, Word, PDF) الذي يحتوي على أسعار المضخات',
        step2: 'ارفع ملف اللوحات (Excel, Word, PDF) الذي يحتوي على أسعار اللوحات الكهربائية',
        step3: 'أدخل عدد المضخات وقطر السحب لحساب سعر المضخات',
        step4: 'أدخل عدد المضخات وقدرة المحرك ونوع اللوحة لحساب سعر اللوحة',
        step5: 'سيتم حساب السعر الإجمالي تلقائياً'
      },
      tableFormat: 'مثال على تنسيق الجداول',
      pumpTable: {
        title: 'جدول المضخات',
        columns: 'الأعمدة المطلوبة:',
        col1: 'قطر السحب (مثال: Ø1", Ø2")',
        col2: 'السعر (رقم)',
        col3: 'نوع الهيدر (1 Pump, 2 Pump، إلخ)'
      },
      panelTable: {
        title: 'جدول اللوحات',
        columns: 'الأعمدة المطلوبة:',
        col1: 'عدد المضخات (1, 2, 3, 4)',
        col2: 'قدرة المحرك HP (5.5, 7.5، إلخ)',
        col3: 'نوع اللوحة (DOL, Star Delta, VFD)',
        col4: 'السعر (رقم)'
      },
      downloadTemplate: 'تحميل نموذج Excel للتجربة'
    },

    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح'
    },

    // Error Messages
    errors: {
      invalidFileType: 'يرجى رفع ملف Excel أو Word أو PDF فقط',
      noTablesFound: 'لم يتم العثور على جداول في الملف',
      pumpFieldsRequired: 'من فضلك أدخل عدد المضخات وقطر السحب',
      panelFieldsRequired: 'من فضلك أدخل جميع البيانات (عدد المضخات، قدرة المحرك، نوع اللوحة)',
      noMatchFound: 'لم يتم العثور على تطابق',
      noPriceFound: 'لم يتم العثور على السعر في الصف المطابق',
      emptyTable: 'الجدول المستخرج فارغ',
      emptyFile: 'الملف فارغ أو لا يحتوي على بيانات',
      unknownError: 'خطأ غير معروف',
      mechanicalFileError: 'خطأ في معالجة ملف الميكانيكا',
      panelFileError: 'خطأ في معالجة ملف اللوحات',
      pdfProcessingError: 'خطأ في معالجة ملف PDF',
      excelProcessingError: 'خطأ في معالجة ملف Excel',
      wordProcessingError: 'خطأ في معالجة ملف Word'
    }
  }
};
