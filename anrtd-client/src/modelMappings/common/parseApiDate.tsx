export const parseApiDate = (dateString: string): Date => {
    return new Date(dateString);
};

export const parseNullableApiDate = (dateString?: string): Date|undefined => {
    return dateString ? parseApiDate(dateString) : undefined;
};