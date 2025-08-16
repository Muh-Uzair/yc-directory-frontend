export interface IStartupFormState {
  errors: {
    // Step 1: Basic Startup Info
    name: string | undefined;
    tagline: string | undefined;
    industry: string | undefined;
    stage: string | undefined;
    foundedDate: string | undefined;

    // step 2 : media
    coverImage: string | undefined;

    // step 3 : business details
    businessModel: string | undefined;
    fundingStatus: string | undefined;
    fundingAmount: string | undefined;
    revenueModel: string | undefined;
    yearsInOp: string | undefined;
    pitchDeck: string | undefined;

    // step 4 : subscriptions
    preferredContactMethod: string | undefined;
    newsletterSubscription: string | undefined;
  };
  status: string;
}

export type ContactMethod = "Email" | "Phone" | "Fax";
