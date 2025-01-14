export default interface Person {
  id: number;
  attributes: {
    firstname: string;
    lastname: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
