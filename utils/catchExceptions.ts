export const catchRepositoryExceptions = (error: any, defaultMessage: string) => {
    const toast = useToast();

    const message = error?.response?._data?.message || error?.message || defaultMessage;

    toast.add({
        title: 'Erro',
        description: message,
        color: 'error',
    });

    throw new Error(message);
};