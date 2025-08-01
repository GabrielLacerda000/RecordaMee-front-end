const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
   };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default formatDate;