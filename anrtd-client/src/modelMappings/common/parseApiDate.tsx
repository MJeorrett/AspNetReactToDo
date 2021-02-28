export const parseApiDate = (dateString: string): Date => {
    return new Date(dateString);
};

export const parseNullableApiDate = (dateString: string | null): Date | null => {
    return dateString ? parseApiDate(dateString) : null;
};