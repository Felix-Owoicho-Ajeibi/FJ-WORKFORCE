import {
  JobVacancy,
  ServiceDetail,
  FAQItem,
  User,
  CandidateProfile,
  JobApplication,
  EmployerEnquiry,
  ContactMessage,
  AuditLog,
  ApplicationStatusHistory
} from '../types';

export const INITIAL_SERVICES: ServiceDetail[] = [
  {
    id: 'srv-1',
    slug: 'recruitment',
    title: 'Recruitment & Talent Acquisition',
    shortSummary: 'End-to-end recruitment matching vetted, qualified professionals with specialized organizational requirements.',
    heroHeadline: 'Strategic Recruitment Tailored to Your Industry Standards',
    overview: 'F&J Workforce Limited delivers precision talent acquisition across technical, managerial, and administrative disciplines. We combine thorough pre-screening, credential verification, and behavioral assessments to provide high-calibre candidates who drive immediate business value.',
    businessProblem: [
      'Costly hiring mistakes resulting from unverified credentials and inflated résumés.',
      'Protracted time-to-hire leading to lost productivity and project delays.',
      'Scarcity of vetted mid-level and specialized technical personnel across Lagos State.',
      'Overburdened internal HR teams handling high-volume initial screening.'
    ],
    process: [
      { step: '01', title: 'Role Scoping & Assessment', description: 'Deep-dive consultation to define competencies, cultural fit, and performance expectations.' },
      { step: '02', title: 'Sourcing & Talent Mining', description: 'Leveraging our proprietary candidate database across Ibeju-Lekki and wider Nigerian hubs.' },
      { step: '03', title: 'Rigorous Multi-Stage Screening', description: 'Technical competency evaluations, background checks, and structured interviews.' },
      { step: '04', title: 'Candidate Shortlisting & Client Interviews', description: 'Presentation of top 3 vetted profiles with comprehensive evaluation dossiers.' },
      { step: '05', title: 'Offer Management & Post-Placement Follow-up', description: 'Guiding smooth onboarding with a 90-day retention guarantee.' }
    ],
    targetClients: [
      'Multinational and indigenous corporations operating in Nigeria.',
      'Growing enterprises in need of dependable executive and managerial talent.',
      'Engineering, logistics, financial, and commercial enterprises in Lagos State.'
    ],
    benefits: [
      'Substantially reduced hiring cycle by over 60%.',
      'Rigorous background checks compliant with Nigerian regulatory guidelines.',
      'Dedicated industry recruitment specialists managing your vacancy.',
      'Flexible engagement models with competitive fee structures.'
    ],
    isPublished: true,
    sortOrder: 1,
    badge: 'Core Solution'
  },
  {
    id: 'srv-2',
    slug: 'contract-staffing',
    title: 'Temporary & Contract Staffing',
    shortSummary: 'Agile workforce deployment for seasonal peaks, specialized projects, and fluctuating production cycles.',
    heroHeadline: 'Flexible, Ready-to-Deploy Contract Workers on Demand',
    overview: 'Respond swiftly to fluctuating business demands, turnkey operations, and planned maintenance shutdowns without increasing permanent payroll liabilities. F&J Workforce handles worker contracts, statutory remittances, and performance administration.',
    businessProblem: [
      'Inflexibility of permanent headcount during cyclical and seasonal demand.',
      'Urgent project delivery deadlines requiring rapid deployment of operational workers.',
      'High administrative burden managing short-term contracts and statutory compliance.',
      'High turnover risks in temporary roles without professional oversight.'
    ],
    process: [
      { step: '01', title: 'Demand Capacity Planning', description: 'Assessing your workforce timeline, shift rotations, and specific skill rosters.' },
      { step: '02', title: 'Rapid Deployment Mobilization', description: 'Activating pre-cleared worker pools ready to commence on-site within 48 to 72 hours.' },
      { step: '03', title: 'Contracts & Statutory Onboarding', description: 'Executing compliant employment agreements, safety briefing, and site orientation.' },
      { step: '04', title: 'On-Site Monitoring & Supervision', description: 'Designated field liaisons to manage attendance, welfare, and productivity.' }
    ],
    targetClients: [
      'Manufacturing facilities and packaging plants.',
      'Logistics centers, container terminals, and distribution depots.',
      'Construction, civil engineering, and infrastructure contractors.',
      'Event management and retail organizations.'
    ],
    benefits: [
      'Optimized operational expenditure without expanding permanent liabilities.',
      'Rapid ramp-up and ramp-down capability tailored to production targets.',
      'Zero statutory compliance headaches — F&J handles all documentation.',
      'Dedicated on-site coordinators ensuring daily operational continuity.'
    ],
    isPublished: true,
    sortOrder: 2,
    badge: 'High Demand'
  },
  {
    id: 'srv-3',
    slug: 'permanent-placement',
    title: 'Permanent Placement',
    shortSummary: 'Securing long-term strategic personnel invested in your organization’s growth and operational success.',
    heroHeadline: 'Building Long-Term Leadership and Core Operational Teams',
    overview: 'Finding professionals who align with your organizational culture and possess the technical acumen to lead your business forward. Our permanent placement services focus on long-term retention, leadership potential, and measurable performance.',
    businessProblem: [
      'High staff attrition rates caused by poor cultural and behavioral alignment.',
      'Difficulty attracting top-tier passive talent who are not actively searching job boards.',
      'Reputational risk from disorganized direct recruitment campaigns.',
      'Significant executive time diverted from strategic goals to recruitment.'
    ],
    process: [
      { step: '01', title: 'Organizational & Culture Mapping', description: 'Understanding your company values, leadership team, and long-term trajectory.' },
      { step: '02', title: 'Direct Headhunting & Executive Search', description: 'Discreetly engaging high-performing talent currently employed within the sector.' },
      { step: '03', title: 'Competency & Behavioral Assessment', description: 'Standardized psychological and competency evaluations to predict tenure.' },
      { step: '04', title: 'Negotiation & Smooth Transition', description: 'Managing notice periods, counter-offers, and seamless transition planning.' }
    ],
    targetClients: [
      'Corporate headquarters, banks, and commercial institutions.',
      'Industrial and manufacturing plant leadership teams.',
      'Technology, energy, and supply chain operators across West Africa.'
    ],
    benefits: [
      'Long-term candidate retention backed by our comprehensive warranty period.',
      'Access to exclusive passive candidate networks across Nigeria.',
      'Thorough credential checks with verified educational and employment records.',
      'Objective assessment reports to assist interview panel decision-making.'
    ],
    isPublished: true,
    sortOrder: 3,
    badge: 'Executive & Core'
  },
  {
    id: 'srv-4',
    slug: 'industrial-workforce',
    title: 'Industrial & Factory Workforce Solutions',
    shortSummary: 'Specialized plant, refinery, warehouse, and production workforce solutions in the Ibeju-Lekki and Lagos industrial corridor.',
    heroHeadline: 'Powering Nigeria’s Premier Industrial and Manufacturing Hubs',
    overview: 'Located directly on Eleko Beach Road, Ibeju-Lekki, F&J Workforce is uniquely positioned at the heart of Nigeria’s fastest-growing industrial corridor — including the Lekki Free Trade Zone, Dangote industrial hub, Deep Sea Port, and associated petrochemical complexes. We provide turnkey industrial workforce solutions adhering strictly to industrial safety standards.',
    businessProblem: [
      'Localized community relations and labor dynamics in the Lekki-Epe corridor.',
      'Stringent Health, Safety & Environment (HSE) compliance requirements in factory environments.',
      'Managing high-volume shift patterns, plant maintenance, and industrial absenteeism.',
      'Verification of specialized certifications (welding, rigging, electrical, forklift operation).'
    ],
    process: [
      { step: '01', title: 'HSE & Safety Alignment', description: 'Auditing specific plant safety policies, PPE standards, and operational guidelines.' },
      { step: '02', title: 'Technical Skill Verification', description: 'Practical trade testing for machinists, technicians, plant operators, and fabricators.' },
      { step: '03', title: 'Community Liaison & Host Compliance', description: 'Proactive engagement with host communities ensuring harmonious industrial relations.' },
      { step: '04', title: 'Shift Roster Management & Medicals', description: 'Pre-employment fitness-to-work certifications and structured shift coordination.' }
    ],
    targetClients: [
      'Refineries, petrochemical facilities, and fertilizer complexes.',
      'FMCG manufacturing plants, bottling facilities, and food processing factories.',
      'Lekki Deep Sea Port terminals and maritime logistics operators.',
      'Heavy manufacturing, fabrication yards, and assembly plants in Ibeju-Lekki.'
    ],
    benefits: [
      'Strategic physical proximity to Ibeju-Lekki and Lekki Free Zone industrial parks.',
      'Proven expertise in community labor relations and peaceful labor environments.',
      '100% pre-deployment safety induction and medical fitness testing.',
      'Scalable blue-collar and gray-collar labor force exceeding 1,000+ vetted hands.'
    ],
    isPublished: true,
    sortOrder: 4,
    badge: 'Ibeju-Lekki Specialty'
  },
  {
    id: 'srv-5',
    slug: 'workforce-outsourcing',
    title: 'Workforce Outsourcing',
    shortSummary: 'Complete operational outsourcing transferring employment liability, payroll, and HR administration to F&J.',
    heroHeadline: 'Transfer Employment Liabilities and Focus on Your Core Business',
    overview: 'Allow your executive management to focus on commercial growth while F&J Workforce assumes full legal employer responsibility for support personnel. From recruitment and biometric attendance to statutory PAYE, NSITF, Pension, and NHF compliance, we ensure total operational peace of mind.',
    businessProblem: [
      'Escalating overhead and payroll processing administrative complexities.',
      'Complex labor disputes, trade union negotiations, and severance disputes.',
      'Strict statutory compliance penalties (Pension Reform Act, NSITF, Lagos State Internal Revenue Service).',
      'Fragmented vendor management across multiple support departments.'
    ],
    process: [
      { step: '01', title: 'Staff Transition & Due Diligence', description: 'Seamless novation of existing support personnel or fresh cohort onboarding.' },
      { step: '02', title: 'Compliant Payroll Architecture', description: 'Automated payroll processing with timely tax deductions and statutory filings.' },
      { step: '03', title: 'Employee Welfare & HMO Administration', description: 'Tiered healthcare plans, group life insurance, and workplace welfare programs.' },
      { step: '04', title: 'Performance Management & Reporting', description: 'Monthly KPI dashboards and transparent SLA reviews for client executives.' }
    ],
    targetClients: [
      'Financial institutions and commercial banks outsourcing branch support.',
      'Telecommunications and technology companies with distributed field teams.',
      'Hospitals, corporate facilities, and hospitality management groups.',
      'Conglomerates seeking consolidated human resource management.'
    ],
    benefits: [
      'Full indemnification and transfer of third-party employment risk.',
      '100% error-free statutory compliance (LIRS, PenCom, ITF, NSITF).',
      'Unified monthly invoice simplifying accounting and financial audits.',
      'Dedicated client account manager available 24/7 for operational queries.'
    ],
    isPublished: true,
    sortOrder: 5,
    badge: 'Enterprise Solution'
  },
  {
    id: 'srv-6',
    slug: 'hr-support',
    title: 'HR & Workforce Management Support',
    shortSummary: 'Strategic human resource advisory, policy formulation, job grading, and labor compliance consultation.',
    heroHeadline: 'Institutionalize Robust HR Structures and Compliance Frameworks',
    overview: 'We support small, medium, and growing enterprises to build professional HR governance structures. Our advisory team helps establish standard operating procedures, employee handbooks, performance evaluation frameworks, and competitive compensation benchmarks.',
    businessProblem: [
      'Lack of formal employee handbooks and legally sound employment contracts.',
      'Ad-hoc performance appraisals causing employee dissatisfaction and low morale.',
      'Uncertainty regarding Nigerian Labor Act provisions and recent legal precedents.',
      'Uncompetitive salary structures leading to continuous talent poaching.'
    ],
    process: [
      { step: '01', title: 'HR Audit & Compliance Review', description: 'Thorough examination of your existing employment contracts and workplace policies.' },
      { step: '02', title: 'Policy Formulation & Handbooks', description: 'Drafting tailored employee handbooks aligned with Nigerian labor statutes.' },
      { step: '03', title: 'KPI & Appraisal System Setup', description: 'Designing balanced scorecards and objective performance evaluation systems.' },
      { step: '04', title: 'Supervisory Leadership Training', description: 'Workshops for team leads on conflict resolution, coaching, and productivity.' }
    ],
    targetClients: [
      'SMEs transitioning into structured medium-scale enterprises.',
      'International businesses establishing local Nigerian operations.',
      'Organizations undergoing restructuring, mergers, or rapid scaling.'
    ],
    benefits: [
      'Shield your business against costly labor tribunal awards and union conflicts.',
      'Clear job descriptions and performance metrics driving measurable productivity.',
      'Tailored compensation surveys reflecting real Lagos market rates.',
      'Expert advisory from certified CIPM and SHRM practitioners.'
    ],
    isPublished: true,
    sortOrder: 6,
    badge: 'Advisory & Governance'
  }
];

export const INITIAL_JOBS: JobVacancy[] = [
  {
    id: 'job-1',
    title: 'Logistics Operations Supervisor',
    slug: 'logistics-operations-supervisor',
    department: 'Supply Chain & Logistics',
    industry: 'Logistics & Supply Chain',
    employmentType: 'Full-time',
    workLocation: 'Ibeju-Lekki, Lagos',
    workArrangement: 'On-site',
    salaryMin: 350000,
    salaryMax: 480000,
    currency: 'NGN',
    summary: 'Lead warehouse and distribution operations for a premier FMCG distribution hub servicing the Lekki-Epe corridor.',
    description: 'We are seeking an experienced Logistics Operations Supervisor on behalf of an established distribution partner in Ibeju-Lekki. The successful candidate will oversee fleet dispatch, inventory accuracy, container offloading, and warehouse health and safety protocols.',
    responsibilities: [
      'Oversee daily inbound and outbound logistics workflows across a 5,000 sq. meter warehouse facility.',
      'Manage a team of 25+ warehouse assistants, forklift operators, and delivery dispatchers.',
      'Maintain inventory reconciliation with an accuracy threshold exceeding 99.2% using warehouse ERP systems.',
      'Enforce strict adherence to safety protocols, PPE usage, and equipment maintenance schedules.',
      'Coordinate with haulage contractors and port logistics agents for timely container clearance and delivery.'
    ],
    qualifications: [
      'Bachelor’s Degree or HND in Logistics, Supply Chain Management, Business Administration, or related discipline.',
      'Minimum of 4 years verifiable experience in warehouse or logistics supervision within Nigeria.',
      'Proficiency in SAP, Oracle SCM, or modern ERP warehouse management systems.',
      'Strong leadership, team coordination, and problem-solving abilities.',
      'Certification in CILTN or HSE Level 2/3 is an added advantage.'
    ],
    experienceRequirements: '4 - 6 years of supervisory experience in industrial logistics or manufacturing distribution.',
    skills: ['Warehouse Operations', 'Fleet Dispatch', 'Inventory Control', 'ERP / SAP', 'HSE Compliance', 'Team Leadership'],
    applicationDeadline: '2026-11-25',
    status: 'published',
    publishedAt: '2026-10-15T08:00:00Z',
    createdBy: 'F&J Admin',
    createdAt: '2026-10-15T08:00:00Z',
    updatedAt: '2026-10-15T08:00:00Z',
    hiringOrganization: 'Leading FMCG Distribution Partner',
    openPositions: 2
  },
  {
    id: 'job-2',
    title: 'Industrial Plant Maintenance Technician',
    slug: 'industrial-plant-maintenance-technician',
    department: 'Engineering & Maintenance',
    industry: 'Manufacturing',
    employmentType: 'Full-time',
    workLocation: 'Lekki Free Zone, Ibeju-Lekki, Lagos',
    workArrangement: 'Shift',
    salaryMin: 280000,
    salaryMax: 380000,
    currency: 'NGN',
    summary: 'Perform preventive and reactive electro-mechanical maintenance on high-speed automated packaging machinery.',
    description: 'F&J Workforce Limited is recruiting skilled Plant Maintenance Technicians for a modern manufacturing plant situated within the Lekki Free Trade Zone. You will maintain production line uptime, diagnose equipment faults, and execute scheduled overhauls.',
    responsibilities: [
      'Execute preventive maintenance routines on pneumatic, hydraulic, and mechanical production lines.',
      'Troubleshoot electrical and mechanical breakdowns rapidly to minimize unplanned factory downtime.',
      'Inspect conveyor belts, gearboxes, motors, sensors, and PLC-controlled packaging machines.',
      'Document all maintenance tasks, part replacements, and root cause analyses in the facility CMMS.',
      'Comply strictly with LOTO (Lockout/Tagout) procedures and international industrial safety regulations.'
    ],
    qualifications: [
      'OND or Technical Diploma (NABTEB/City & Guilds) in Mechanical, Electrical, or Mechatronics Engineering.',
      '3+ years practical hands-on experience in high-volume manufacturing or bottling environments.',
      'Demonstrated competence in reading schematics, electrical diagrams, and hydraulic circuits.',
      'Willingness to work rotating shift schedules (Day, Night, Weekend).'
    ],
    experienceRequirements: '3+ years in a fast-paced manufacturing or assembly plant.',
    skills: ['Mechanical Maintenance', 'Electrical Troubleshooting', 'Pneumatics & Hydraulics', 'LOTO Safety', 'PLC Diagnostics'],
    applicationDeadline: '2026-11-30',
    status: 'published',
    publishedAt: '2026-10-18T09:30:00Z',
    createdBy: 'F&J Admin',
    createdAt: '2026-10-18T09:30:00Z',
    updatedAt: '2026-10-18T09:30:00Z',
    hiringOrganization: 'Free Zone Manufacturing Corporation',
    openPositions: 4
  },
  {
    id: 'job-3',
    title: 'Certified Heavy Equipment & Forklift Operator',
    slug: 'certified-heavy-equipment-forklift-operator',
    department: 'Heavy Machinery & Operations',
    industry: 'Industrial & Factory',
    employmentType: 'Contract',
    workLocation: 'Eleko / Ibeju-Lekki, Lagos',
    workArrangement: 'On-site',
    salaryMin: 180000,
    salaryMax: 240000,
    currency: 'NGN',
    summary: 'Operate counterbalanced and reach forklifts in an active industrial yard with heavy freight handling.',
    description: 'Urgent contract requirement for experienced and certified forklift operators with proven records in container stuffing, stacking, and heavy equipment maneuvering across our client’s industrial operations in Ibeju-Lekki.',
    responsibilities: [
      'Safely maneuver 3-ton to 7-ton forklift equipment across high-density storage aisles and loading docks.',
      'Conduct daily pre-trip equipment checks including fluid levels, brake responsiveness, and mast hydraulic pressures.',
      'Verify shipping bills of lading against physically loaded pallet counts and report discrepancies immediately.',
      'Ensure zero incidents of cargo damage or near-miss safety hazards through disciplined operating speeds.'
    ],
    qualifications: [
      'Valid National Drivers License with appropriate endorsements (Class E/G).',
      'Recognized Forklift Operator Certification from accredited training institute.',
      'At least 3 years verifiable accident-free operating history in an industrial warehouse or construction yard.',
      'Basic literacy and numeracy to read shipping labels and cargo manifests.'
    ],
    experienceRequirements: '3+ years operating forklifts in high-traffic logistics or factory yards.',
    skills: ['Forklift Operation', 'Cargo Handling', 'Yard Safety', 'Pre-Trip Inspection', 'Pallet Stacking'],
    applicationDeadline: '2026-11-15',
    status: 'published',
    publishedAt: '2026-10-19T11:00:00Z',
    createdBy: 'F&J Admin',
    createdAt: '2026-10-19T11:00:00Z',
    updatedAt: '2026-10-19T11:00:00Z',
    hiringOrganization: 'Industrial Logistics & Port Yard Services',
    openPositions: 6
  },
  {
    id: 'job-4',
    title: 'Human Resources & Payroll Officer',
    slug: 'human-resources-payroll-officer',
    department: 'Human Resources',
    industry: 'HR & Administration',
    employmentType: 'Full-time',
    workLocation: 'Victoria Island / Lekki, Lagos',
    workArrangement: 'Hybrid',
    salaryMin: 320000,
    salaryMax: 420000,
    currency: 'NGN',
    summary: 'Manage end-to-end payroll processing, employee relations, and statutory compliance for a workforce of 300+ staff.',
    description: 'Our client is seeking an experienced Human Resources & Payroll Officer to administer monthly payroll, manage attendance databases, and ensure 100% adherence to Nigerian labor laws, PAYE, and Pension regulations.',
    responsibilities: [
      'Compute monthly payroll including overtime, allowances, deductions, and tax withholdings with zero error rate.',
      'Prepare and file statutory remittances (LIRS PAYE, Pension, NSITF, ITF, and NHF) ahead of deadlines.',
      'Manage new hire onboarding, contract generation, and personnel file maintenance in compliance with NDPA 2023.',
      'Coordinate staff disciplinary committees and draft formal internal documentation in accordance with labor standards.'
    ],
    qualifications: [
      'B.Sc in Human Resource Management, Accounting, Economics, or related social sciences.',
      'Membership of CIPM (Chartered Institute of Personnel Management of Nigeria) is preferred.',
      'Hands-on expertise with payroll software (SeamlessHR, Sage, or QuickBooks) and advanced Excel.',
      'Deep knowledge of the Nigerian Labor Act and current tax amendment acts.'
    ],
    experienceRequirements: '3 - 5 years dedicated HR operations and payroll experience.',
    skills: ['Payroll Processing', 'Statutory Compliance', 'Nigerian Labor Act', 'HRIS / Excel', 'Employee Relations'],
    applicationDeadline: '2026-12-05',
    status: 'published',
    publishedAt: '2026-10-20T10:00:00Z',
    createdBy: 'F&J Admin',
    createdAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-20T10:00:00Z',
    hiringOrganization: 'Corporate Financial & Advisory Firm',
    openPositions: 1
  },
  {
    id: 'job-5',
    title: 'HSE Safety Officer (Industrial & Petrochemical)',
    slug: 'hse-safety-officer-industrial-petrochemical',
    department: 'Health, Safety & Environment',
    industry: 'Oil & Gas / Refinery',
    employmentType: 'Permanent',
    workLocation: 'Ibeju-Lekki Industrial Corridor, Lagos',
    workArrangement: 'On-site',
    salaryMin: 400000,
    salaryMax: 550000,
    currency: 'NGN',
    summary: 'Maintain zero-incident safety standards, hazard identification, and statutory safety audits in an industrial plant.',
    description: 'We are seeking a seasoned HSE Officer to champion safety culture, lead toolbox talks, conduct job hazard analyses (JHA), and inspect operational permits to work (PTW) for a major petrochemical subcontractor in Ibeju-Lekki.',
    responsibilities: [
      'Conduct daily site inspections and ensure 100% worker compliance with safety apparel and hazard controls.',
      'Lead daily morning safety briefings and specialized toolbox training for operational cohorts.',
      'Review and authorize Permits to Work (Hot Work, Confined Space, Working at Heights).',
      'Investigate incidents, near-misses, and unsafe conditions; formulate corrective and preventative actions (CAPA).'
    ],
    qualifications: [
      'Bachelor’s Degree in Science, Engineering, or Environmental Health.',
      'NEBOSH International General Certificate (IGC) or ISPON certification is mandatory.',
      'Minimum of 4 years field HSE experience in oil & gas, construction, or heavy industrial processing plants.',
      'Excellent verbal communication in English and working knowledge of Pidgin/Yoruba for workforce engagement.'
    ],
    experienceRequirements: '4+ years of industrial field safety management.',
    skills: ['NEBOSH / ISPON', 'Job Hazard Analysis (JHA)', 'Permit to Work (PTW)', 'Incident Investigation', 'Toolbox Talks'],
    applicationDeadline: '2026-11-28',
    status: 'published',
    publishedAt: '2026-10-21T07:45:00Z',
    createdBy: 'F&J Admin',
    createdAt: '2026-10-21T07:45:00Z',
    updatedAt: '2026-10-21T07:45:00Z',
    hiringOrganization: 'Petrochemical Infrastructure Services',
    openPositions: 2
  },
  {
    id: 'job-6',
    title: 'Quality Assurance & Packaging Inspector',
    slug: 'quality-assurance-packaging-inspector',
    department: 'Quality Control',
    industry: 'Manufacturing',
    employmentType: 'Contract',
    workLocation: 'Lekki Free Zone, Ibeju-Lekki, Lagos',
    workArrangement: 'Shift',
    salaryMin: 190000,
    salaryMax: 250000,
    currency: 'NGN',
    summary: 'Monitor packaging integrity, batch coding, and raw material specifications on automated production lines.',
    description: 'F&J Workforce Limited is hiring Quality Assurance Inspectors to support our client’s FMCG packaging lines. You will ensure finished goods satisfy rigorous NAFDAC and SON standards before dispatch.',
    responsibilities: [
      'Perform hourly sampling tests on seal integrity, fill volumes, net weight, and barcode readability.',
      'Flag and quarantine non-conforming product batches in accordance with standard operating procedures.',
      'Calibrate in-line weighing equipment, optical sensors, and date stamp imprinters.',
      'Prepare daily quality shift logs and liaise with production supervisors on defect prevention.'
    ],
    qualifications: [
      'OND / HND / B.Sc in Food Science, Biochemistry, Industrial Chemistry, or related field.',
      '2 years experience in quality assurance within an industrial manufacturing or food packaging facility.',
      'Keen eye for detail and understanding of Good Manufacturing Practices (GMP).',
      'Willingness to work 12-hour alternating shifts.'
    ],
    experienceRequirements: '2+ years quality control experience in FMCG manufacturing.',
    skills: ['Quality Assurance', 'GMP Compliance', 'Batch Inspection', 'NAFDAC / SON Standards', 'Laboratory Sampling'],
    applicationDeadline: '2026-11-18',
    status: 'published',
    publishedAt: '2026-10-21T12:00:00Z',
    createdBy: 'F&J Admin',
    createdAt: '2026-10-21T12:00:00Z',
    updatedAt: '2026-10-21T12:00:00Z',
    hiringOrganization: 'Consumer Goods Manufacturing Facility',
    openPositions: 3
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I register as a job seeker with F&J Workforce Limited?',
    answer: 'You can create a free account by clicking the "Register" button in the top navigation. Enter your full name, email, phone number, and a secure password. Once registered, log into your Candidate Dashboard to complete your professional profile, upload your CV in PDF or DOCX format, and immediately begin applying for published vacancies.',
    category: 'Candidates',
    isPublished: true,
    sortOrder: 1
  },
  {
    id: 'faq-2',
    question: 'What is the application fee for job seekers applying through F&J Workforce?',
    answer: 'Notice: Recruitment at F&J Workforce is 100% paid. An application fee of 5,000 Naira ($3.8) is applied per application to cover priority screening, technical competency reviews, and credential verification.',
    category: 'Candidates',
    isPublished: true,
    sortOrder: 2
  },
  {
    id: 'faq-3',
    question: 'How does F&J Workforce support employers in Ibeju-Lekki and the Lekki Free Zone?',
    answer: 'We maintain our primary operations directly along Eleko Beach Road, Ibeju-Lekki. This physical presence gives us unique access to localized talent pools, deep relationships with host communities, and rapid mobilization capabilities for factories, refineries, logistics hubs, and deep sea port contractors along the entire Lekki-Epe corridor.',
    category: 'Employers',
    isPublished: true,
    sortOrder: 3
  },
  {
    id: 'faq-4',
    question: 'What is the typical turnaround time for staffing requests?',
    answer: 'For temporary and industrial contract staffing, we maintain pre-vetted worker pools capable of mobilization within 48 to 72 hours. For specialized technical, permanent, or executive search positions, our standard shortlisting timeline is between 7 and 14 business days, complete with verified credentials and behavioral interview dossiers.',
    category: 'Employers',
    isPublished: true,
    sortOrder: 4
  },
  {
    id: 'faq-5',
    question: 'How does F&J Workforce verify candidate credentials and backgrounds?',
    answer: 'Every candidate considered for final placement undergoes rigorous multi-layer screening: educational credential verification with issuing tertiary institutions, previous employer reference checks, criminal history vetting, and practical trade competency assessments for technical personnel.',
    category: 'Recruitment & Verification',
    isPublished: true,
    sortOrder: 5
  },
  {
    id: 'faq-6',
    question: 'How are my personal data and CV protected on this platform?',
    answer: 'We strictly adhere to the Nigeria Data Protection Act (NDPA) 2023. Candidate CVs and contact records are stored in secure private databases and are never exposed publicly or shared with third parties without your explicit application consent. You can view, update, or request deletion of your information anytime via your dashboard.',
    category: 'Recruitment & Verification',
    isPublished: true,
    sortOrder: 6
  },
  {
    id: 'faq-7',
    question: 'Where is F&J Workforce Limited physically located?',
    answer: 'Our corporate office is situated on Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria. We welcome visits by appointment during standard business hours (Monday to Friday, 8:00 AM – 5:00 PM). You can also contact us on 09116176563 or 09022542150.',
    category: 'General',
    isPublished: true,
    sortOrder: 7
  }
];

export const INITIAL_USER: User = {
  id: 'cand-001',
  email: 'princeowoicho1@gmail.com',
  fullName: 'Oluwaseun Adeyemi',
  phone: '08034567890',
  role: 'candidate',
  createdAt: '2026-10-18T10:00:00Z'
};

export const INITIAL_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'cp-001',
  userId: 'cand-001',
  headline: 'Experienced Logistics & Supply Chain Supervisor | HSE Certified',
  professionalSummary: 'Results-driven Logistics Operations Supervisor with over 5 years of verifiable experience in managing high-volume warehouse operations, freight inventory, and team safety across the Lekki-Epe industrial corridor. Dedicated to zero-error stock counts and timely dispatch.',
  location: 'Ibeju-Lekki, Lagos',
  education: [
    {
      id: 'edu-1',
      institution: 'University of Lagos (UNILAG)',
      degree: 'B.Sc. Business Administration',
      fieldOfStudy: 'Operations Management',
      startDate: '2016-10',
      endDate: '2020-07',
      current: false
    }
  ],
  workExperience: [
    {
      id: 'exp-1',
      company: 'Dangote Agro Sacks Distribution Hub',
      position: 'Assistant Logistics Supervisor',
      location: 'Ibeju-Lekki, Lagos',
      startDate: '2022-01',
      endDate: '2025-08',
      current: false,
      description: 'Supervised 18 yard personnel, coordinated truck loading operations, implemented FIFO stock rotation, and reduced dispatch delays by 22%.'
    }
  ],
  skills: ['Logistics Management', 'Warehouse ERP', 'Inventory Auditing', 'Forklift Safety', 'Team Supervision', 'HSE Level 2'],
  preferredLocations: ['Ibeju-Lekki', 'Lekki Phase 1', 'Victoria Island'],
  preferredEmploymentTypes: ['Full-time', 'Contract'],
  cvFileName: 'Oluwaseun_Adeyemi_CV_2026.pdf',
  cvStoragePath: 'resumes/cand-001/Oluwaseun_Adeyemi_CV_2026.pdf',
  cvFileSize: 412000,
  cvUploadedAt: '2026-10-19T14:20:00Z',
  savedJobIds: ['job-1', 'job-5'],
  profileCompletion: 85,
  createdAt: '2026-10-18T10:00:00Z',
  updatedAt: '2026-10-19T14:20:00Z'
};

export const INITIAL_ADMIN_USER: User = {
  id: 'admin-001',
  email: 'admin@fjworkforce.com.ng',
  fullName: 'F&J Management Admin',
  phone: '09116176563',
  role: 'admin',
  createdAt: '2026-10-01T08:00:00Z'
};

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-101',
    referenceNumber: 'FJW-APP-2026-0841',
    jobId: 'job-1',
    jobTitle: 'Logistics Operations Supervisor',
    jobSlug: 'logistics-operations-supervisor',
    candidateId: 'cand-001',
    candidateName: 'Oluwaseun Adeyemi',
    candidateEmail: 'princeowoicho1@gmail.com',
    candidatePhone: '08034567890',
    candidateLocation: 'Ibeju-Lekki, Lagos',
    cvFileName: 'Oluwaseun_Adeyemi_CV_2026.pdf',
    cvStoragePath: 'resumes/cand-001/Oluwaseun_Adeyemi_CV_2026.pdf',
    coverLetter: 'I am excited to submit my candidacy for the Logistics Operations Supervisor vacancy. Having supervised operations along the Lekki-Epe corridor for over 4 years, I am intimately familiar with local supply chain dynamics, container logistics, and host community interactions.',
    screeningAnswers: [
      {
        question: 'Do you have verifiable supervisory experience in warehouse/logistics operations?',
        answer: 'Yes, over 4 years experience supervising warehouse teams at Dangote Agro Sacks Hub.'
      },
      {
        question: 'Are you residing within or able to commute reliably to Ibeju-Lekki, Lagos?',
        answer: 'Yes, I currently reside in Eleko, Ibeju-Lekki, less than 15 minutes from the facility.'
      }
    ],
    status: 'Shortlisted',
    submittedAt: '2026-10-19T15:00:00Z',
    updatedAt: '2026-10-21T11:20:00Z'
  },
  {
    id: 'app-102',
    referenceNumber: 'FJW-APP-2026-0723',
    jobId: 'job-2',
    jobTitle: 'Industrial Plant Maintenance Technician',
    jobSlug: 'industrial-plant-maintenance-technician',
    candidateId: 'cand-002',
    candidateName: 'Ibrahim Danladi',
    candidateEmail: 'i.danladi@example.com',
    candidatePhone: '08023456711',
    candidateLocation: 'Ajah, Lagos',
    cvFileName: 'Ibrahim_Danladi_ElectroMech.pdf',
    cvStoragePath: 'resumes/cand-002/Ibrahim_Danladi_ElectroMech.pdf',
    coverLetter: 'Certified Mechatronics technician with 5 years experience in automated bottling and packaging maintenance.',
    screeningAnswers: [
      {
        question: 'Do you possess technical electrical/mechanical diplomas?',
        answer: 'Yes, OND Electrical/Electronics Engineering from Yaba College of Technology.'
      },
      {
        question: 'Are you available for 12-hour rotating shift duties?',
        answer: 'Yes, completely available for day and night shift rotations.'
      }
    ],
    status: 'Under Review',
    submittedAt: '2026-10-20T09:15:00Z',
    updatedAt: '2026-10-20T09:15:00Z'
  },
  {
    id: 'app-103',
    referenceNumber: 'FJW-APP-2026-0619',
    jobId: 'job-5',
    jobTitle: 'HSE Safety Officer (Industrial & Petrochemical)',
    jobSlug: 'hse-safety-officer-industrial-petrochemical',
    candidateId: 'cand-003',
    candidateName: 'Chiamaka Nnamdi',
    candidateEmail: 'chiamaka.nnamdi@example.com',
    candidatePhone: '08167890123',
    candidateLocation: 'Lekki Phase 1, Lagos',
    cvFileName: 'Chiamaka_Nnamdi_NEBOSH_CV.pdf',
    cvStoragePath: 'resumes/cand-003/Chiamaka_Nnamdi_NEBOSH_CV.pdf',
    coverLetter: 'Holder of NEBOSH IGC with 4 years industrial safety audit experience across marine and downstream oil facilities.',
    screeningAnswers: [
      {
        question: 'Do you hold a valid NEBOSH or ISPON certificate?',
        answer: 'Yes, NEBOSH IGC certified in 2022 (Credential ID: NEB-2022-7741).'
      }
    ],
    status: 'Interview Scheduled',
    submittedAt: '2026-10-21T08:30:00Z',
    updatedAt: '2026-10-22T08:00:00Z'
  }
];

export const INITIAL_STATUS_HISTORY: ApplicationStatusHistory[] = [
  {
    id: 'sh-1',
    applicationId: 'app-101',
    previousStatus: 'Submitted',
    newStatus: 'Under Review',
    changedBy: 'admin-001',
    changedByName: 'F&J Lead Recruiter',
    changedAt: '2026-10-20T10:00:00Z',
    reason: 'Initial profile and credential verification completed successfully.'
  },
  {
    id: 'sh-2',
    applicationId: 'app-101',
    previousStatus: 'Under Review',
    newStatus: 'Shortlisted',
    changedBy: 'admin-001',
    changedByName: 'F&J Lead Recruiter',
    changedAt: '2026-10-21T11:20:00Z',
    reason: 'Strong local warehouse experience in Ibeju-Lekki; invited to client interview panel.'
  }
];

export const INITIAL_EMPLOYER_ENQUIRIES: EmployerEnquiry[] = [
  {
    id: 'enq-101',
    referenceNumber: 'FJW-REQ-2026-0312',
    companyName: 'Lekki Maritime Terminal Ltd',
    contactName: 'Engr. Babatunde Fashola',
    email: 'babatunde.f@lekkimaritime.example.com',
    phone: '08091234567',
    industry: 'Maritime & Logistics',
    serviceRequested: 'Industrial & Factory Workforce Solutions',
    workersRequired: 30,
    jobRoles: 'Forklift Operators, Riggers, and Yard Freight Assistants',
    location: 'Lekki Deep Sea Port, Ibeju-Lekki, Lagos',
    expectedStartDate: '2026-11-15',
    requirements: 'Need 30 certified yard workers for 6-month turnaround project. Must have safety passports and HSE induction before site access.',
    status: 'Under Review',
    assignedTo: 'F&J Industrial Accounts Team',
    internalNotes: 'Client contacted via phone; scheduled site visit to port terminal for next Tuesday.',
    createdAt: '2026-10-20T14:00:00Z',
    updatedAt: '2026-10-21T09:30:00Z'
  },
  {
    id: 'enq-102',
    referenceNumber: 'FJW-REQ-2026-0298',
    companyName: 'Apex Packaging Industries',
    contactName: 'Mrs. Folake Adeleke',
    email: 'folake.adeleke@apexpack.example.com',
    phone: '08123456789',
    industry: 'Manufacturing',
    serviceRequested: 'Temporary & Contract Staffing',
    workersRequired: 15,
    jobRoles: 'Packaging Line Operators and Quality Checkers',
    location: 'Lekki Free Trade Zone, Lagos',
    expectedStartDate: '2026-11-01',
    requirements: 'Seasonal end-of-year production peak staffing. Need reliable shift workers with basic machine operation skills.',
    status: 'Proposal Sent',
    assignedTo: 'Lead Staffing Consultant',
    internalNotes: 'Commercial proposal sent with tiered hourly rate. Awaiting purchase order confirmation.',
    createdAt: '2026-10-18T11:15:00Z',
    updatedAt: '2026-10-20T16:00:00Z'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Samuel Chukwu',
    email: 'samuel.c@example.com',
    phone: '08055667788',
    subject: 'Partnership Inquiry for Vocational Training in Ibeju-Lekki',
    message: 'Good day F&J Workforce, we are an accredited technical training center in Lagos and would like to explore partnering with your organization to supply certified electrical and welding apprentices.',
    status: 'New',
    createdAt: '2026-10-21T16:45:00Z'
  },
  {
    id: 'msg-2',
    name: 'Victoria Johnson',
    email: 'v.johnson@businesshub.com.ng',
    phone: '08033221144',
    subject: 'Corporate Staffing Quotation Request',
    message: 'Hello, please send us information regarding your permanent recruitment fee schedule for mid-level administrative and accounting professionals.',
    status: 'Replied',
    createdAt: '2026-10-19T13:10:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actorId: 'admin-001',
    actorName: 'F&J Admin',
    action: 'Published new vacancy: Logistics Operations Supervisor',
    entityType: 'job',
    entityId: 'job-1',
    createdAt: '2026-10-15T08:00:00Z'
  },
  {
    id: 'log-2',
    actorId: 'cand-001',
    actorName: 'Oluwaseun Adeyemi',
    action: 'Submitted job application for Logistics Operations Supervisor (Ref: FJW-APP-2026-0841)',
    entityType: 'application',
    entityId: 'app-101',
    createdAt: '2026-10-19T15:00:00Z'
  },
  {
    id: 'log-3',
    actorId: 'admin-001',
    actorName: 'F&J Admin',
    action: 'Status updated to Shortlisted for application FJW-APP-2026-0841',
    entityType: 'application',
    entityId: 'app-101',
    createdAt: '2026-10-21T11:20:00Z'
  },
  {
    id: 'log-4',
    actorId: 'system',
    actorName: 'Employer Lead Engine',
    action: 'New workforce requisition received from Lekki Maritime Terminal Ltd (Ref: FJW-REQ-2026-0312)',
    entityType: 'enquiry',
    entityId: 'enq-101',
    createdAt: '2026-10-20T14:00:00Z'
  }
];
