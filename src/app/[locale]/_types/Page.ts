export interface Page {
  id: number;
  title: string;
  slug: string;
  status: number;
}

export interface PageContent extends Page {
  content: string;
}
