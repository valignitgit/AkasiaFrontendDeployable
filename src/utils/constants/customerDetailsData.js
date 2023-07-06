export const propertyMappings = {
  Overview: "overview",
  Address: "address",
  Employment: "employment",
  Income: "income",
  "Risk Appetite": "risk_appetite",
  Compliance: "compliance",
  "Bank Account": "bank_account",
};

export const customerTabData = [
  {
    name: "Overview",
    properties: [
      "customer_id",
      "national_id",
      "customer_name",
      "customer_name_ar",
      "father_name",
      "father_name_ar",
      "grand_father_name",
      "grand_father_name_ar",
      "family_name",
      "family_name_ar",
      "birth_date",
      "birth_country_id",
      "citizen_country_id",
      "residing_country_id",
      "tax_id",
      "email_id",
      "phone_num",
      "id_expiry_date",
      "kyc_expiry_date",
    ],
  },
  {
    name: "Address",
    properties: [
      "address_building",
      "address_street",
      "address_district",
      "address_city",
      "address_zip_code",
      "address_post_box",
    ],
  },
  {
    name: "Employment",
    properties: [
      "employment_status",
      "employer_name",
      "employer_address",
      "job_title",
    ],
  },
  {
    name: "Income",
    properties: [
      "income_range",
      "investible_liquid_assets",
      "is_income_business",
      "is_income_employment",
      "is_income_family",
      "is_income_inheritance",
      "is_income_invest",
      "is_income_savings",
    ],
  },
  {
    name: "Risk Appetite",
    properties: ["risk_level"],
  },
  {
    name: "Compliance",
    properties: [
      "is_statutory_info_1",
      "is_statutory_info_2",
      "is_statutory_info_3",
      "is_statutory_info_4",
      "is_statutory_info_5",
    ],
  },
  {
    name: "Bank Account",
    properties: [
      "current_account_num",
      "current_account_bank_id",
      "current_account_currency_id",
      "current_account_name",
      "current_account_iban",
    ],
  },
];
