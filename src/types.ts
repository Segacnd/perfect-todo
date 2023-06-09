export type Note = {
  id: string;
  note: string;
};
export type Todo = {
  user: string | null;
  title: string;
  category: string;
  dateEnded: string | null;
  dateStarted: string;
  description: string;
  notes: Note[];
};

export type User = {
  firstName: string;
  lastName: string;
  login: string;
};
