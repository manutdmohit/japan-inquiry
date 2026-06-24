export interface InquiryField {
  id: string;
  sn: number;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

export const DOCUMENT_TITLE = 'जापानबाट फोन आउँदा सोधिने प्रश्नहरु';

export const INQUIRY_FIELDS: InquiryField[] = [
  {
    id: 'appliedCollege',
    sn: 1,
    label: 'अप्लाई गरेको कलेज',
    placeholder: 'BUDONOKI Japanese Language School, ठेगाना, Japan, TEL +81...',
  },
  {
    id: 'appliedYearMonth',
    sn: 2,
    label: 'अप्लाई गरेको साल र महिना',
    placeholder: '२०२६ अक्टोबर / October 2026',
  },
  {
    id: 'japanLanguageDuration',
    sn: 3,
    label: 'जापानमा भाषा पढ्ने अवधि',
    placeholder: '१ वर्ष ६ महिना (1 year 6 months)',
  },
  {
    id: 'appliedConsultancy',
    sn: 4,
    label: 'अप्लाई गरेको कन्सल्टेन्सी',
    placeholder: 'Skylark Japanese Language School, Kathmandu, Nepal',
  },
  {
    id: 'studentName',
    sn: 5,
    label: 'बिद्यार्थीको नाम',
    placeholder: 'Rahul Shrestha',
  },
  {
    id: 'studentDob',
    sn: 6,
    label: 'बिद्यार्थीको जन्म मिति',
    placeholder: '8 APRIL, 2007',
  },
  {
    id: 'plusTwoSchool',
    sn: 7,
    label: 'प्लस २ वा स्नातक पढेको स्कूल र कहिले पास गरेको मिति',
    placeholder: 'BIRENDRA VIDYA MANDIR SECONDARY SCHOOL, KAILALI (2025)',
  },
  {
    id: 'studentCurrentActivity',
    sn: 8,
    label: 'बिद्यार्थीले अहिले के गरिरहेको छ?',
    placeholder: 'जापानी भाषा पढिरहेको छ ।',
    multiline: true,
  },
  {
    id: 'sponsorName',
    sn: 9,
    label: 'स्पोन्सरको नाम',
    placeholder: 'BIBEK SHRESTHA',
  },
  {
    id: 'permanentAddress',
    sn: 10,
    label: 'स्थायी ठेगाना',
    placeholder: 'JANAKI RURAL MUNICIPALITY, KAILALI, NEPAL',
    multiline: true,
  },
  {
    id: 'currentAddress',
    sn: 11,
    label: 'अहिले बसिरहेको ठेगाना',
    placeholder: 'JANAKI RURAL MUNICIPALITY, KAILALI, NEPAL',
    multiline: true,
  },
  {
    id: 'languageSchool',
    sn: 12,
    label: 'भाषा पढिरहेको स्कूल',
    placeholder: 'Skylark Japanese Language School, TIKAPUR-1, KAILALI',
    multiline: true,
  },
  {
    id: 'languageDuration',
    sn: 13,
    label: 'भाषाको अवधी',
    placeholder: '1 OCTOBER, 2025 to 15 SEPTEMBER, 2026: 572 hours',
    multiline: true,
  },
  {
    id: 'languageTeacher',
    sn: 14,
    label: 'भाषा पढाउने टिचरको नाम',
    placeholder: 'AKASH BAM',
  },
  {
    id: 'incomeSources',
    sn: 15,
    label: 'आम्दानीका स्रोतहरु',
    placeholder: 'Sugarcane, Vegetable, Crop, Animal Husbandry...',
    multiline: true,
  },
  {
    id: 'annualIncome',
    sn: 16,
    label: 'बार्षिक आम्दानी',
    placeholder: '२६ देखि २७ लाख जति छ',
  },
  {
    id: 'cooperativeName',
    sn: 17,
    label: 'बैंक व्यालेन्स राखेको सहकारी',
    placeholder: 'Broadway Saving and Credit Cooperative, Kathmandu',
    multiline: true,
  },
  {
    id: 'cooperativeBalance',
    sn: 18,
    label: 'सहकारीमा भएको व्यालेन्स',
    placeholder: '२९ लाख जति',
  },
  {
    id: 'accountOpenDate',
    sn: 19,
    label: 'सहकारीमा खाता खोलेको मिति',
    placeholder: '६ वर्ष अगाडि',
  },
  {
    id: 'accountNumber',
    sn: 20,
    label: 'सहकारीको खाता नम्बर',
    placeholder: 'BWS-123001',
  },
  {
    id: 'afterJapaneseStudy',
    sn: 21,
    label: 'जापानिज भाषा पछि के पढ्ने ?',
    placeholder: 'BACHELORS IN HEALTH AND PHYSICAL EDUCATION',
    multiline: true,
  },
];

export type FormData = Record<string, string>;

export function createEmptyFormData(): FormData {
  return Object.fromEntries(INQUIRY_FIELDS.map((field) => [field.id, '']));
}

export function getFileBaseName(data: FormData): string {
  const name = data.studentName?.trim();
  return name ? `${name.replace(/\s+/g, '_')}_INQUIRY_PAPER` : 'INQUIRY_PAPER';
}
