export type Lawyer = {
  slug: string;
  name: string;
  title: string;
  image: string;
  email: string;
  phone: string;
  phoneHref: string;
  fax?: string;
  whatsapp: string;
  focus: string[];
  bio: string[];
  achievements: string[];
};

export const lawyers: Lawyer[] = [
  {
    slug: "harish-davedi",
    name: "Harish Davedi",
    title: "Founder & Principal Lawyer — Barrister, Solicitor & Notary Public",
    image: "/images/harish-davedi.png",
    email: "info@davedilaw.ca",
    phone: "647-803-7297",
    phoneHref: "+16478037297",
    fax: "647-498-1782",
    whatsapp: "https://wa.me/16478037297",
    focus: ["Real Estate Law", "Immigration Law", "Wills & Estates", "Civil Litigation"],
    bio: [
      "Harish Davedi is the founder of Davedi Law Professional Corporation and has extensive experience as an internationally practicing lawyer in common law jurisdictions. At an early age he developed a strong passion for law, and alongside his legal practice he has remained deeply involved in social causes.",
      "Harish received his LL.B. from Panjab University, India in 2015, and received his Certificate of Qualification from the Federation of Law Societies of Canada in 2019. He is a member of the Law Society of Ontario.",
      "Our firm is committed to aiming for the highest standards possible — we aim not only to meet our clients' expectations, but to exceed them, and to assist our clients in achieving their goals within a philosophy of teamwork, integrity and service.",
    ],
    achievements: [
      "Founder, Davedi Law Professional Corporation",
      "LL.B., Panjab University, India (2015)",
      "Certificate of Qualification, Federation of Law Societies of Canada (2019)",
      "Member, Law Society of Ontario",
      "Notary Public",
    ],
  },
  {
    slug: "ashish-dadwal",
    name: "Ashish Dadwal",
    title: "Associate Lawyer | Barrister & Solicitor",
    image: "/images/ashish-dadwal.jpg",
    email: "ashish@dadwallawfirm.com",
    phone: "647-993-0494",
    phoneHref: "+16479930494",
    fax: "647-559-5236",
    whatsapp: "https://wa.me/16479930494",
    focus: ["Residential Real Estate", "Family Law", "Immigration Law"],
    bio: [
      "Ashish Dadwal is an Associate Lawyer at Davedi Law Professional Corporation, dedicated to providing practical, client-focused, and results-oriented legal services. Called to the Bar of Ontario in March 2025, Ashish brings a strong commitment to professionalism, integrity, and personalized client service.",
      "His practice focuses on residential real estate, family law, and immigration. Whether assisting clients with residential property transactions, navigating family-related legal matters, or resolving civil disputes, Ashish strives to make the legal process clear, efficient, and as stress-free as possible.",
      "Ashish understands that every client's circumstances are unique. He takes the time to understand each client's needs, explain their legal options, and provide thoughtful guidance at every stage of the process. He is committed to building lasting client relationships through open communication, attention to detail, and a dedication to protecting his clients' interests.",
    ],
    achievements: [
      "Called to the Bar of Ontario (March 2025)",
      "B.A., LL.B. (Honours)",
      "Focus: Residential Real Estate, Family Law & Immigration",
    ],
  },
];

export function getLawyer(slug: string): Lawyer | undefined {
  return lawyers.find((lawyer) => lawyer.slug === slug);
}
