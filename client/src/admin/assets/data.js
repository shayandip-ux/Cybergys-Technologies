const leadOverviewData = {
  May: {
    label: "This Month",
    total: "3,247",
    growth: "15.4%",
    data: [
      { day: "May 1", leads: 1200 },
      { day: "May 4", leads: 1450 },
      { day: "May 6", leads: 1180 },
      { day: "May 9", leads: 2050 },
      { day: "May 11", leads: 1500 },
      { day: "May 13", leads: 1870 },
      { day: "May 16", leads: 2360 },
      { day: "May 18", leads: 1730 },
      { day: "May 20", leads: 2210 },
      { day: "May 21", leads: 1890 },
      { day: "May 24", leads: 1690 },
      { day: "May 26", leads: 2100 },
      { day: "May 28", leads: 2560 },
      { day: "May 31", leads: 3247 },
    ],
  },

  April: {
    label: "April 2026",
    total: "3,500",
    growth: "12.8%",
    data: [
      { day: "Apr 1", leads: 1100 },
      { day: "Apr 4", leads: 1320 },
      { day: "Apr 7", leads: 1500 },
      { day: "Apr 10", leads: 1720 },
      { day: "Apr 13", leads: 1980 },
      { day: "Apr 16", leads: 2260 },
      { day: "Apr 19", leads: 2100 },
      { day: "Apr 22", leads: 2450 },
      { day: "Apr 25", leads: 2750 },
      { day: "Apr 28", leads: 3100 },
      { day: "Apr 30", leads: 3500 },
    ],
  },

  March: {
    label: "March 2026",
    total: "3,580",
    growth: "18.2%",
    data: [
      { day: "Mar 1", leads: 1250 },
      { day: "Mar 4", leads: 1480 },
      { day: "Mar 7", leads: 1710 },
      { day: "Mar 10", leads: 1920 },
      { day: "Mar 13", leads: 2200 },
      { day: "Mar 16", leads: 2450 },
      { day: "Mar 19", leads: 2680 },
      { day: "Mar 22", leads: 2900 },
      { day: "Mar 25", leads: 3150 },
      { day: "Mar 28", leads: 3370 },
      { day: "Mar 31", leads: 3580 },
    ],
  },

  February: {
    label: "February 2026",
    total: "3,150",
    growth: "14.6%",
    data: [
      { day: "Feb 1", leads: 1050 },
      { day: "Feb 4", leads: 1220 },
      { day: "Feb 7", leads: 1410 },
      { day: "Feb 10", leads: 1630 },
      { day: "Feb 13", leads: 1870 },
      { day: "Feb 16", leads: 2140 },
      { day: "Feb 19", leads: 2380 },
      { day: "Feb 22", leads: 2610 },
      { day: "Feb 25", leads: 2880 },
      { day: "Feb 28", leads: 3150 },
    ],
  },

  January: {
    label: "January 2026",
    total: "2,140",
    growth: "10.5%",
    data: [
      { day: "Jan 1", leads: 720 },
      { day: "Jan 4", leads: 880 },
      { day: "Jan 7", leads: 1050 },
      { day: "Jan 10", leads: 1180 },
      { day: "Jan 13", leads: 1320 },
      { day: "Jan 16", leads: 1510 },
      { day: "Jan 19", leads: 1680 },
      { day: "Jan 22", leads: 1810 },
      { day: "Jan 25", leads: 1940 },
      { day: "Jan 28", leads: 2140 },
    ],
  },
};

const monthlyComparison = [
  {
    month: "Jun",
    current: 3950,
    previous: 3180,
  },
  {
    month: "May",
    current: 3800,
    previous: 3020,
  },
  {
    month: "Apr",
    current: 3500,
    previous: 2500,
  },
  {
    month: "Mar",
    current: 3580,
    previous: 2670,
  },
  {
    month: "Feb",
    current: 3150,
    previous: 2380,
  },
  {
    month: "Jan",
    current: 2550,
    previous: 1760,
  },
  {
    month: "Dec",
    current: 1850,
    previous: 1540,
  },
  {
    month: "Nov",
    current: 2210,
    previous: 1810,
  },
  {
    month: "Oct",
    current: 2450,
    previous: 1980,
  },
  {
    month: "Sep",
    current: 2280,
    previous: 1900,
  },
  {
    month: "Aug",
    current: 2700,
    previous: 2140,
  },
  {
    month: "Jul",
    current: 3100,
    previous: 2500,
  },
];

const leadTrendData = [
  {
    month: "Jun",
    leads: 3450,
  },
  {
    month: "May",
    leads: 3247,
  },
  {
    month: "Apr",
    leads: 2812,
  },
  {
    month: "Mar",
    leads: 2980,
  },
  {
    month: "Feb",
    leads: 2560,
  },
  {
    month: "Jan",
    leads: 2140,
  },
  {
    month: "Dec",
    leads: 1850,
  },
  {
    month: "Nov",
    leads: 1720,
  },
  {
    month: "Oct",
    leads: 1950,
  },
  {
    month: "Sep",
    leads: 2110,
  },
  {
    month: "Aug",
    leads: 2380,
  },
  {
    month: "Jul",
    leads: 2600,
  },
];

const sourceData = [
  { name: "Website", value: 40.2, leads: "10,220", color: "#45B82A" },
  { name: "Facebook", value: 25.8, leads: "6,566", color: "#2B78C5" },
  { name: "Instagram", value: 15.6, leads: "3,968", color: "#9747D9" },
  { name: "Google Ads", value: 10.3, leads: "2,620", color: "#FFA415" },
  { name: "Other", value: 8.1, leads: "2,056", color: "#B9C1CF" },
];

const quizzes = [
  {
    name: "Home Improvement Quiz",
    leads: "4,823",
    views: "18,724",
    conversion: "25.76%",
    width: "78%",
  },
  {
    name: "Digital Marketing Quiz",
    leads: "3,674",
    views: "15,231",
    conversion: "24.13%",
    width: "73%",
  },
  {
    name: "Health & Wellness Quiz",
    leads: "2,985",
    views: "12,105",
    conversion: "24.67%",
    width: "75%",
  },
  {
    name: "Fitness Goals Quiz",
    leads: "2,456",
    views: "9,856",
    conversion: "24.92%",
    width: "76%",
  },
  {
    name: "Finance Knowledge Quiz",
    leads: "1,987",
    views: "8,245",
    conversion: "24.10%",
    width: "72%",
  },
];

const initialLandingPages = [
  {
    id: 1,
    name: "UK POS (OTP)",
    slug: "/uk-pos-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 28, 2026",
    updatedTime: "10:30 AM",
  },
  {
    id: 2,
    name: "UK POS (Non-OTP)",
    slug: "/uk-pos-non-otp",
    type: "Non-OTP",
    active: true,
    updatedAt: "May 27, 2026",
    updatedTime: "09:15 AM",
  },
  {
    id: 3,
    name: "US Roofing (OTP)",
    slug: "/us-roofing-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 26, 2026",
    updatedTime: "11:45 AM",
  },
  {
    id: 4,
    name: "US Roofing (Non-OTP)",
    slug: "/us-roofing-non-otp",
    type: "Non-OTP",
    active: false,
    updatedAt: "May 25, 2026",
    updatedTime: "04:20 PM",
  },
  {
    id: 5,
    name: "AU Solar (OTP)",
    slug: "/au-solar-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 24, 2026",
    updatedTime: "02:10 PM",
  },
  {
    id: 6,
    name: "AU Solar (Non-OTP)",
    slug: "/au-solar-non-otp",
    type: "Non-OTP",
    active: false,
    updatedAt: "May 23, 2026",
    updatedTime: "01:05 PM",
  },
  {
    id: 7,
    name: "CA HVAC (OTP)",
    slug: "/ca-hvac-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 22, 2026",
    updatedTime: "11:30 AM",
  },
  {
    id: 8,
    name: "CA HVAC (Non-OTP)",
    slug: "/ca-hvac-non-otp",
    type: "Non-OTP",
    active: false,
    updatedAt: "May 21, 2026",
    updatedTime: "10:00 AM",
  },
  {
    id: 9,
    name: "US Digital Copiers (OTP)",
    slug: "/us-digital-copiers-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 20, 2026",
    updatedTime: "09:45 AM",
  },
  {
    id: 10,
    name: "US Digital Copiers (Non-OTP)",
    slug: "/us-digital-copiers-non-otp",
    type: "Non-OTP",
    active: true,
    updatedAt: "May 19, 2026",
    updatedTime: "03:25 PM",
  },
  {
    id: 11,
    name: "UK Solar (OTP)",
    slug: "/uk-solar-otp",
    type: "OTP",
    active: false,
    updatedAt: "May 18, 2026",
    updatedTime: "12:30 PM",
  },
  {
    id: 12,
    name: "UK Solar (Non-OTP)",
    slug: "/uk-solar-non-otp",
    type: "Non-OTP",
    active: true,
    updatedAt: "May 17, 2026",
    updatedTime: "11:15 AM",
  },
  {
    id: 13,
    name: "CA Roofing (OTP)",
    slug: "/ca-roofing-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 16, 2026",
    updatedTime: "10:20 AM",
  },
  {
    id: 14,
    name: "CA Roofing (Non-OTP)",
    slug: "/ca-roofing-non-otp",
    type: "Non-OTP",
    active: false,
    updatedAt: "May 15, 2026",
    updatedTime: "04:10 PM",
  },
  {
    id: 15,
    name: "AU HVAC (OTP)",
    slug: "/au-hvac-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 14, 2026",
    updatedTime: "01:35 PM",
  },
  {
    id: 16,
    name: "AU HVAC (Non-OTP)",
    slug: "/au-hvac-non-otp",
    type: "Non-OTP",
    active: true,
    updatedAt: "May 13, 2026",
    updatedTime: "09:20 AM",
  },
  {
    id: 17,
    name: "UK Roofing (OTP)",
    slug: "/uk-roofing-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 12, 2026",
    updatedTime: "11:10 AM",
  },
  {
    id: 18,
    name: "UK Roofing (Non-OTP)",
    slug: "/uk-roofing-non-otp",
    type: "Non-OTP",
    active: false,
    updatedAt: "May 11, 2026",
    updatedTime: "02:45 PM",
  },
  {
    id: 19,
    name: "US Solar (OTP)",
    slug: "/us-solar-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 10, 2026",
    updatedTime: "10:15 AM",
  },
  {
    id: 20,
    name: "US Solar (Non-OTP)",
    slug: "/us-solar-non-otp",
    type: "Non-OTP",
    active: false,
    updatedAt: "May 9, 2026",
    updatedTime: "03:40 PM",
  },
  {
    id: 21,
    name: "CA Solar (OTP)",
    slug: "/ca-solar-otp",
    type: "OTP",
    active: true,
    updatedAt: "May 8, 2026",
    updatedTime: "12:05 PM",
  },
  {
    id: 22,
    name: "CA Solar (Non-OTP)",
    slug: "/ca-solar-non-otp",
    type: "Non-OTP",
    active: true,
    updatedAt: "May 7, 2026",
    updatedTime: "09:50 AM",
  },
  {
    id: 23,
    name: "AU Roofing (OTP)",
    slug: "/au-roofing-otp",
    type: "OTP",
    active: false,
    updatedAt: "May 6, 2026",
    updatedTime: "02:20 PM",
  },
  {
    id: 24,
    name: "AU Roofing (Non-OTP)",
    slug: "/au-roofing-non-otp",
    type: "Non-OTP",
    active: true,
    updatedAt: "May 5, 2026",
    updatedTime: "11:25 AM",
  },
];

/* =========================================================
   DATA
========================================================= */

const initialLeads = [
  {
    id: "LD-24530",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    landingPage: "UK POS (OTP)",
    quiz: "Home Improvement Quiz",
    status: "New",
    date: "May 31, 2026",
    time: "10:30 AM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "Roof Replacement",
      },
      {
        question: "What is the size of your property?",
        answer: "2000 - 2500 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 1 Month",
      },
      {
        question: "What is your estimated budget?",
        answer: "$5,000 - $10,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Google Search",
      },
    ],

    attribution: {
      source: "Google Ads",
      campaign: "UK_POS_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24529",
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarah.smith@example.com",
    phone: "(555) 987-6543",
    landingPage: "US Roofing (Non-OTP)",
    quiz: "Roofing Quote Quiz",
    status: "Contacted",
    date: "May 31, 2026",
    time: "09:45 AM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "Roof Repair",
      },
      {
        question: "What is the size of your property?",
        answer: "1500 - 2000 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 3 Months",
      },
      {
        question: "What is your estimated budget?",
        answer: "$10,000 - $15,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Facebook",
      },
    ],

    attribution: {
      source: "Facebook",
      campaign: "Roofing_May2026",
      medium: "social",
    },
  },

  {
    id: "LD-24528",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phone: "(555) 456-7890",
    landingPage: "AU Solar (OTP)",
    quiz: "Solar Savings Quiz",
    status: "Qualified",
    date: "May 30, 2026",
    time: "04:20 PM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "Solar Installation",
      },
      {
        question: "What is the size of your property?",
        answer: "2500 - 3000 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 1 Month",
      },
      {
        question: "What is your estimated budget?",
        answer: "$15,000 - $25,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Google Search",
      },
    ],

    attribution: {
      source: "Google Ads",
      campaign: "AU_Solar_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24527",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    phone: "(555) 321-0987",
    landingPage: "UK POS (Non-OTP)",
    quiz: "Home Improvement Quiz",
    status: "New",
    date: "May 30, 2026",
    time: "02:15 PM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "Roof Replacement",
      },
      {
        question: "What is the size of your property?",
        answer: "1000 - 1500 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 6 Months",
      },
      {
        question: "What is your estimated budget?",
        answer: "$5,000 - $10,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Google Search",
      },
    ],

    attribution: {
      source: "Google",
      campaign: "UK_POS_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24526",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    phone: "(555) 654-3210",
    landingPage: "CA HVAC (OTP)",
    quiz: "HVAC Efficiency Quiz",
    status: "Contacted",
    date: "May 30, 2026",
    time: "11:05 AM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "HVAC Replacement",
      },
      {
        question: "What is the size of your property?",
        answer: "2000 - 2500 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 3 Months",
      },
      {
        question: "What is your estimated budget?",
        answer: "$10,000 - $20,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Google Search",
      },
    ],

    attribution: {
      source: "Google Ads",
      campaign: "CA_HVAC_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24525",
    firstName: "Linda",
    lastName: "Taylor",
    email: "linda.taylor@example.com",
    phone: "(555) 789-0123",
    landingPage: "US Roofing (OTP)",
    quiz: "Roofing Quote Quiz",
    status: "Qualified",
    date: "May 29, 2026",
    time: "03:30 PM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "Roof Replacement",
      },
      {
        question: "What is the size of your property?",
        answer: "2500 - 3000 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 1 Month",
      },
      {
        question: "What is your estimated budget?",
        answer: "$15,000 - $25,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Referral",
      },
    ],

    attribution: {
      source: "Google Ads",
      campaign: "US_Roofing_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24524",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez@example.com",
    phone: "(555) 234-5678",
    landingPage: "AU Solar (Non-OTP)",
    quiz: "Solar Savings Quiz",
    status: "Inactive",
    date: "May 29, 2026",
    time: "09:15 AM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "Solar Installation",
      },
      {
        question: "What is the size of your property?",
        answer: "1500 - 2000 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 3 Months",
      },
      {
        question: "What is your estimated budget?",
        answer: "$10,000 - $15,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Google Search",
      },
    ],

    attribution: {
      source: "Google Ads",
      campaign: "AU_Solar_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24523",
    firstName: "Amanda",
    lastName: "Anderson",
    email: "amanda.anderson@example.com",
    phone: "(555) 876-5432",
    landingPage: "CA HVAC (Non-OTP)",
    quiz: "HVAC Efficiency Quiz",
    status: "New",
    date: "May 28, 2026",
    time: "01:40 PM",

    answers: [
      {
        question: "What type of roofing service do you need?",
        answer: "HVAC Repair",
      },
      {
        question: "What is the size of your property?",
        answer: "2000 - 2500 sq ft",
      },
      {
        question: "What is your preferred timeline?",
        answer: "Within 1 Month",
      },
      {
        question: "What is your estimated budget?",
        answer: "$5,000 - $10,000",
      },
      {
        question: "How did you hear about us?",
        answer: "Google Search",
      },
    ],

    attribution: {
      source: "Google Ads",
      campaign: "CA_HVAC_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24522",
    firstName: "Daniel",
    lastName: "Thomas",
    email: "daniel.thomas@example.com",
    phone: "(555) 111-2233",
    landingPage: "UK POS (OTP)",
    quiz: "Home Improvement Quiz",
    status: "New",
    date: "May 28, 2026",
    time: "11:10 AM",
    answers: [],
    attribution: {
      source: "Facebook",
      campaign: "UK_POS_May2026",
      medium: "social",
    },
  },

  {
    id: "LD-24521",
    firstName: "Jessica",
    lastName: "Jackson",
    email: "jessica.jackson@example.com",
    phone: "(555) 444-5566",
    landingPage: "US Roofing (OTP)",
    quiz: "Roofing Quote Quiz",
    status: "Contacted",
    date: "May 27, 2026",
    time: "03:45 PM",
    answers: [],
    attribution: {
      source: "Google Ads",
      campaign: "US_Roofing_May2026",
      medium: "cpc",
    },
  },

  {
    id: "LD-24520",
    firstName: "William",
    lastName: "White",
    email: "william.white@example.com",
    phone: "(555) 777-8899",
    landingPage: "AU Solar (OTP)",
    quiz: "Solar Savings Quiz",
    status: "Qualified",
    date: "May 27, 2026",
    time: "12:30 PM",
    answers: [],
    attribution: {
      source: "Google",
      campaign: "AU_Solar_May2026",
      medium: "cpc",
    },
  },
];

export { leadOverviewData, monthlyComparison, leadTrendData, sourceData, quizzes, initialLandingPages, initialLeads };
