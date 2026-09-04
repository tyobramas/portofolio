// ─── Apify LinkedIn Scraper Data Types ──────────────────────────────────────────

export interface ApifyExperience {
  companyId?: string | null;
  companyUrn?: string | null;
  companyLink1?: string | null;
  companyName: string | null;
  companySize?: string | null;
  companyWebsite?: string | null;
  companyIndustry?: string | null;
  logo?: string | null;
  title: string | null;
  jobDescription?: string | null;
  jobStartedOn: string | null;
  jobEndedOn?: string | null;
  jobLocation?: string | null;
  jobStillWorking?: boolean;
  jobLocationCountry?: string | null;
  employmentType?: string | null;
}

export interface ApifyEducation {
  companyId?: string | null;
  companyUrn?: string | null;
  companyLink1?: string | null;
  logo?: string | null;
  title: string | null;
  subtitle?: string | null;
  description?: string | null;
  grade?: string | null;
  period?: {
    startedOn?: string | null;
    endedOn?: string | null;
  };
}

export interface ApifyProject {
  name: string;
  description?: string;
  associated_with?: string;
  is_current?: boolean;
}

export interface ApifyLanguage {
  language: string;
  proficiency?: string;
}

export interface ApifyLinkedInProfile {
  linkedinUrl: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  headline: string | null;
  email: string | null;
  mobileNumber?: string | null;
  jobTitle?: string | null;
  jobStartedOn?: string | null;
  jobLocation?: string | null;
  jobStillWorking?: boolean;
  companyName: string | null;
  companyIndustry?: string | null;
  companyWebsite?: string | null;
  companyLinkedin?: string | null;
  companyFoundedIn?: string | null;
  companySize?: string | null;
  currentJobDuration?: string | null;
  currentJobDurationInYrs?: number | null;
  topSkillsByEndorsements?: string[] | null;
  skills?: string[];
  projects?: ApifyProject[];
  languages?: ApifyLanguage[];
  causes?: string[];
  connectionCount?: number | null;
  followerCount?: number | null;
  addressCountryOnly?: string | null;
  addressWithCountry?: string | null;
  addressWithoutCountry?: string | null;
  profilePic: string | null;
  profilePicHighQuality?: string | null;
  backgroundPic?: string | null;
  linkedinId?: string | null;
  isPremium?: boolean;
  isVerified?: boolean;
  isJobSeeker?: boolean | null;
  isRetired?: boolean;
  isCreator?: boolean;
  isInfluencer?: boolean;
  isCurrentlyEmployed?: boolean;
  about: string | null;
  publicIdentifier: string;
  linkedinPublicUrl?: string;
  openConnection?: boolean | null;
  urn?: string;
  totalRecommendationsReceived?: number;
  totalRecommendationsGiven?: number;
  birthday?: string | null;
  associatedHashtag?: string[];
  firstRoleYear?: string | null;
  totalExperienceYears?: number | null;
  experiencesCount?: number;
  experiences: ApifyExperience[];
  educations: ApifyEducation[];
  rawPayload?: any;
  scrapedAt?: string;
}

export interface LinkedInSearchResultCandidate {
  id: string;
  fullName: string;
  headline: string;
  companyName: string;
  location: string;
  profileUrl: string;
  profilePic?: string;
  isVerified?: boolean;
  publicIdentifier: string;
}

export interface ApifyScrapeOptions {
  profileUrls: string[];
}
