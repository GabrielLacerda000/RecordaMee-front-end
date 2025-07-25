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
    isPaid: boolean;
}

export type AddExpensePayload = Omit<Expense, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'category' | 'status' | 'recurrence' | 'payment_date'> & {
    category_id: number;
    status_id: number;
    recurrence_id: number;
    payment_date?: string | null;
};