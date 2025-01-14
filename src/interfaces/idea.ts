export default interface Idea {
  id: number;
  attributes: {
    name: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
