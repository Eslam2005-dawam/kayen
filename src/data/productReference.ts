/** Product facts transcribed from KAYAN's original site; no price or warranty is asserted here. */
export type ProductReference = {
  officialName: string
  sourceUrl: string
  details: string[]
}

export const productReferences: Partial<Record<string, ProductReference>> = {
  'm-01': {
    officialName: 'Gray Mattress',
    sourceUrl: 'https://kayanmattress.com/index.php/ar/?id=213&option=com_sppagebuilder&view=page',
    details: [
      'قماش ناعم منسوج',
      'إسفنج عالي الكثافة ناعم، ثلاث طبقات',
      'قماش غير محبوك',
      'نوابض جيبية عازلة للحركة',
      'إسفنج عالي الكثافة لدعم جوانب المرتبة',
    ],
  },
  'm-02': {
    officialName: 'Blue Memory Mattress',
    sourceUrl: 'https://kayanmattress.com/index.php/ar/?id=214&option=com_sppagebuilder&view=page',
    details: [
      'قماش ناعم منسوج',
      'إسفنج عالي الكثافة ناعم',
      'قماش غير محبوك',
      'نوابض جيبية عازلة للحركة',
      'إسفنج ميموري ناعم عالي الكثافة',
      'إسفنج عالي الكثافة لدعم جوانب المرتبة',
    ],
  },
  'm-03': {
    officialName: 'Cotton Max Mattress',
    sourceUrl: 'https://www.kayanmattress.com/index.php/ar/products.html',
    details: [],
  },
  'p-01': {
    officialName: 'مخدة اللاتكس',
    sourceUrl: 'https://kayanmattress.com/index.php/ar/products/pillows.html',
    details: ['مصنوعة من اللاتكس الطبيعي', 'سطح مثقب كما يظهر في صورة المنتج الأصلية'],
  },
}
