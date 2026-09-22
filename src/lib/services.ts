export type PracticeArea = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  intro: string;
  services: string[];
  process: { title: string; description: string }[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "real-estate-law",
    name: "Real Estate Law",
    image: "/images/real-estate-law.jpg",
    summary:
      "From the purchase or sale of a condo to a complex development project, we handle real estate transactions of every size.",
    intro:
      "Buying or selling property is one of the biggest financial decisions most people make, and the closing process moves fast. Our real estate team reviews your agreement of purchase and sale, handles title searches, coordinates with your lender and the other side's lawyer, and gets you to closing day with no surprises — whether you're a first-time buyer, an investor, or a developer bringing a new project to market.",
    services: [
      "Residential purchases and sales",
      "Condominium transactions",
      "Mortgage refinancing",
      "New construction and builder closings",
      "Title transfers",
      "Commercial and development real estate",
    ],
    process: [
      {
        title: "Initial Consultation",
        description:
          "We review your agreement of purchase and sale — or your goals, if you haven't signed yet — and flag anything that needs attention before you commit.",
      },
      {
        title: "Title & Due Diligence",
        description:
          "We conduct title searches, verify zoning and survey requirements, and confirm the property is free of liens or encumbrances.",
      },
      {
        title: "Coordination & Documents",
        description:
          "We liaise with your lender, the other side's lawyer and the municipality to prepare closing documents and mortgage instructions.",
      },
      {
        title: "Closing Day",
        description:
          "Funds and keys are exchanged, the deed is registered, and you walk away with clear title — we're available throughout to answer questions.",
      },
    ],
  },
  {
    slug: "immigration-law",
    name: "Immigration Law",
    image: "/images/immigration-law.jpg",
    summary:
      "From Permanent Residence to Temporary Residence, we guide individuals and families through Canada's immigration system.",
    intro:
      "Canada's immigration system has a program for almost every situation, but the paperwork, timelines and eligibility rules change often. We help individuals, families and employers choose the right pathway — from Express Entry and Provincial Nominee Programs to family sponsorship and work permits — and manage every step of the application so nothing gets missed.",
    services: [
      "Permanent Residence applications",
      "Temporary Residence & visitor visas",
      "Express Entry",
      "Provincial Nominee Programs (PNP)",
      "Family Sponsorship",
      "Work and study permits",
    ],
    process: [
      {
        title: "Eligibility Assessment",
        description:
          "We review your background, goals and timeline to identify the immigration pathway that fits your situation.",
      },
      {
        title: "Application Strategy",
        description:
          "We map out the required documents and address potential red flags before they become a reason for refusal.",
      },
      {
        title: "Preparation & Filing",
        description: "We prepare and submit a complete, well-organized application on your behalf.",
      },
      {
        title: "Follow-Up & Response",
        description:
          "We monitor your file, respond to requests for additional information, and keep you updated until a decision is made.",
      },
    ],
  },
  {
    slug: "wills-and-estates",
    name: "Wills & Estates",
    image: "/images/wills-estates.jpg",
    summary:
      "We help clients plan ahead and protect their families with clear, properly executed estate planning documents.",
    intro:
      "A properly drafted will and power of attorney protect the people you care about and make sure your wishes are carried out. We take the time to understand your family and financial situation, then prepare clear, legally sound documents — and guide executors through the probate process when the time comes.",
    services: [
      "Wills drafting",
      "Continuing Power of Attorney (property)",
      "Non-continuing / limited Power of Attorney",
      "Power of Attorney for personal care",
      "Estate planning",
      "Probate applications",
    ],
    process: [
      {
        title: "Discovery Meeting",
        description: "We learn about your family, assets and wishes to understand what your estate plan needs to accomplish.",
      },
      {
        title: "Drafting",
        description: "We prepare your will, powers of attorney and any related documents in plain language you can review and question.",
      },
      {
        title: "Execution",
        description: "We guide you through properly signing and witnessing your documents so they hold up when it matters.",
      },
      {
        title: "Ongoing Support",
        description:
          "We're available to update your documents as your life changes, and to guide your executor through probate when needed.",
      },
    ],
  },
  {
    slug: "family-law",
    name: "Family Law",
    image: "/images/family-law.jpg",
    summary:
      "We help clients navigate difficult family matters with clarity and care, from separation through to resolution.",
    intro:
      "Separation and family disputes are stressful, and the legal issues — support, parenting arrangements, property division — are rarely simple. We aim to resolve matters efficiently wherever possible, through negotiation or a separation agreement, while being fully prepared to advocate for you in court when that's what it takes.",
    services: [
      "Divorce — simple, contested and uncontested",
      "Separation agreements",
      "Pre-nuptial agreements & marriage contracts",
      "Child custody and support",
      "Spousal support",
    ],
    process: [
      {
        title: "Confidential Consultation",
        description: "We listen to your situation and explain your options and likely outcomes in plain terms.",
      },
      {
        title: "Strategy",
        description: "We outline a plan — negotiation, mediation or litigation — based on what will get you the best result fastest.",
      },
      {
        title: "Negotiation or Filing",
        description: "We negotiate on your behalf or file the necessary court documents, keeping you informed at every step.",
      },
      {
        title: "Resolution",
        description:
          "We finalize your separation agreement or see your matter through to a court decision, and remain available if circumstances change.",
      },
    ],
  },
  {
    slug: "civil-litigation",
    name: "Civil Litigation",
    image: "/images/civil-litigation.jpg",
    summary:
      "When disputes can't be resolved by agreement, we represent clients' interests through litigation.",
    intro:
      "When a dispute can't be resolved by agreement, having a lawyer who is prepared to go to court changes how the other side negotiates. We represent individuals and businesses in real estate, contract and commercial disputes, and in Power of Sale and foreclosure matters — pursuing a fast resolution where possible, and litigating firmly when it's necessary.",
    services: [
      "Real estate litigation",
      "Commercial and business disputes",
      "Power of Sale and foreclosure defence",
      "Wrongful dismissal",
      "Contract disputes",
    ],
    process: [
      {
        title: "Case Evaluation",
        description: "We assess the strength of your claim or defence and give you a realistic view of your options.",
      },
      {
        title: "Strategy",
        description: "We determine whether negotiation, mediation or litigation gives you the best path to resolution.",
      },
      {
        title: "Proceedings",
        description: "We prepare and file the necessary materials, and represent you at every stage of the process.",
      },
      {
        title: "Resolution",
        description: "We pursue a settlement or judgment in your favour, and advise on enforcement if needed.",
      },
    ],
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
