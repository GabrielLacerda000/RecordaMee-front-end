export type Recurrence = {
   id: number;
   name: 'daily' | 'weekly' | 'monthly' | 'biannual' | 'semester' | 'yearly';
} 

export type Status = {
  id: number;
  name: 'Paid' | 'Pending' | 'Overdue';  
} 

export type Category = {
    id: number;
    name: 'Housing' | 'Utilities' | 'Food' | 'Transport' | 'Entertainment' | 'Health' | 'Education' | 'Other';
}

export type Expense = {
    id: number;
    name: string;
    user_id: number;
    due_date: string;
    amount: number;
    payment_date: string | null;
    created_at: string;
    updated_at: string;
    category: Category;
    status: Status;
    recurrence: Recurrence;
}