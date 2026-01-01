import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUniversityStore, type LibraryBook } from '../store/useUniversityStore';
import { toast } from 'sonner';

// Simulate API calls
const checkoutBookOnServer = async (bookId: string, rfidTag: string): Promise<LibraryBook> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.05; // 95% success rate
      if (success) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 2 weeks loan period

        resolve({
          id: bookId,
          title: 'Sample Book',
          author: 'Sample Author',
          isbn: '978-3-16-148410-0',
          rfidTag,
          checkedOut: true,
          dueDate: dueDate.toISOString(),
          renewalCount: 0,
          maxRenewals: 3,
          fineAmount: 0,
        });
      } else {
        reject(new Error('RFID tag verification failed'));
      }
    }, 1000);
  });
};

const returnBookOnServer = async (bookId: string): Promise<LibraryBook> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: bookId,
        title: 'Sample Book',
        author: 'Sample Author',
        isbn: '978-3-16-148410-0',
        rfidTag: 'RFID-001',
        checkedOut: false,
        dueDate: null,
        renewalCount: 0,
        maxRenewals: 3,
        fineAmount: 0,
      });
    }, 800);
  });
};

/**
 * Custom hook for managing library book loans with RFID simulation
 * Includes automatic fine calculation for overdue books
 */
export const useLibraryLoans = () => {
  const queryClient = useQueryClient();
  const { libraryBooks, checkoutBook: storeCheckoutBook, returnBook: storeReturnBook, calculateFine } = useUniversityStore();

  // Query for library books
  const { data: books, isLoading } = useQuery({
    queryKey: ['libraryBooks'],
    queryFn: async () => libraryBooks,
    initialData: libraryBooks,
  });

  // Mutation for checking out a book
  const checkoutMutation = useMutation({
    mutationFn: ({ bookId, rfidTag }: { bookId: string; rfidTag: string }) =>
      checkoutBookOnServer(bookId, rfidTag),

    onMutate: async ({ bookId, rfidTag }) => {
      await queryClient.cancelQueries({ queryKey: ['libraryBooks'] });

      const previousBooks = queryClient.getQueryData<LibraryBook[]>(['libraryBooks']);

      // Optimistic update
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      storeCheckoutBook(bookId, rfidTag);

      queryClient.setQueryData<LibraryBook[]>(['libraryBooks'], (old) =>
        old?.map((book) =>
          book.id === bookId
            ? { ...book, checkedOut: true, dueDate: dueDate.toISOString() }
            : book
        )
      );

      toast.info('Checking out book...', {
        description: 'Scanning RFID tag',
      });

      return { previousBooks };
    },

    onSuccess: (serverBook) => {
      queryClient.setQueryData<LibraryBook[]>(['libraryBooks'], (old) =>
        old?.map((book) => (book.id === serverBook.id ? serverBook : book))
      );

      toast.success('Book checked out successfully', {
        description: `Due date: ${new Date(serverBook.dueDate!).toLocaleDateString()}`,
      });
    },

    onError: (error, variables, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData(['libraryBooks'], context.previousBooks);
      }

      toast.error('Checkout failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryBooks'] });
    },
  });

  // Mutation for returning a book
  const returnMutation = useMutation({
    mutationFn: (bookId: string) => returnBookOnServer(bookId),

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ['libraryBooks'] });

      const previousBooks = queryClient.getQueryData<LibraryBook[]>(['libraryBooks']);

      // Calculate fine before returning
      const fine = calculateFine(bookId);

      storeReturnBook(bookId);

      queryClient.setQueryData<LibraryBook[]>(['libraryBooks'], (old) =>
        old?.map((book) =>
          book.id === bookId
            ? { ...book, checkedOut: false, dueDate: null }
            : book
        )
      );

      if (fine > 0) {
        toast.warning('Book is overdue', {
          description: `Fine: KES ${fine}`,
          duration: 5000,
        });
      } else {
        toast.info('Returning book...', {
          description: 'Processing return',
        });
      }

      return { previousBooks, fine };
    },

    onSuccess: (serverBook, bookId, context) => {
      queryClient.setQueryData<LibraryBook[]>(['libraryBooks'], (old) =>
        old?.map((book) => (book.id === serverBook.id ? serverBook : book))
      );

      if (context?.fine && context.fine > 0) {
        toast.success('Book returned with fine', {
          description: `Please pay KES ${context.fine} at the library desk`,
          duration: 5000,
        });
      } else {
        toast.success('Book returned successfully', {
          description: 'Thank you for returning on time',
        });
      }
    },

    onError: (error, bookId, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData(['libraryBooks'], context.previousBooks);
      }

      toast.error('Return failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryBooks'] });
    },
  });

  // Get checked out books
  const getCheckedOutBooks = () => {
    return books?.filter((book) => book.checkedOut) || [];
  };

  // Get overdue books
  const getOverdueBooks = () => {
    const now = new Date();
    return books?.filter((book) => {
      if (!book.checkedOut || !book.dueDate) return false;
      return new Date(book.dueDate) < now;
    }) || [];
  };

  // Get total fines
  const getTotalFines = () => {
    return getOverdueBooks().reduce((total, book) => {
      return total + calculateFine(book.id);
    }, 0);
  };

  // Check if a book is renewable
  const isRenewable = (book: LibraryBook) => {
    return book.checkedOut && book.renewalCount < book.maxRenewals;
  };

  return {
    books: books || [],
    isLoading,
    checkoutBook: checkoutMutation.mutate,
    returnBook: returnMutation.mutate,
    isCheckingOut: checkoutMutation.isPending,
    isReturning: returnMutation.isPending,
    getCheckedOutBooks,
    getOverdueBooks,
    getTotalFines,
    calculateFine,
    isRenewable,
  };
};
