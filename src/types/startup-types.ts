export interface IStartupFormState {
  errors: {
    name: string | undefined;
    tagline: string | undefined;
    stage: "Idea" | "MVP" | "Launched" | "Scaling" | undefined;
    industry: string | undefined;
    foundedDate: Date | undefined;
  };
  status: string;
}
