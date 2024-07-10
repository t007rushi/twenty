// export type Webhook = {
//   id: string;
//   targetUrl: string;
//   operation: string;
//   __typename: 'Webhook';
  
// };

export interface Webhook {
  id: string;
  url: string;
  filters?: {
    objects: string[];
    actions: string[];
  };
}