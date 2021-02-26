export type AppSelectOption = {
    value: number,
    label: string,
}

type EnumType = { [s: number]: string };

export const getNumericEnumValues = (enumerable: EnumType): number[] => {
    const keys = Object.keys(enumerable)
        .map(key => enumerable[key as never])
        .filter(member => typeof member === 'number')
        .map(key => key as unknown as number);

    return keys;
};

export const mapEnumToAppSelectOptions = (enumerable: EnumType): AppSelectOption[] => {
    return getNumericEnumValues(enumerable)
        .map(value => ({
            value,
            label: enumerable[value],
        }));
};
