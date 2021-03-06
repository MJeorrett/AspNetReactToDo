import { SvgIcon } from '@material-ui/core';
import { TShirtSize } from '../config/TShirtSize';

export interface TShirtIconProps {
    size: TShirtSize,
}

const fontSize: { [key in TShirtSize]: number } = {
    [TShirtSize.Small]: 35,
    [TShirtSize.Medium]: 55,
    [TShirtSize.Large]: 80,
};

const color: { [key in TShirtSize]: string } = {
    [TShirtSize.Small]: '#2CC194',
    [TShirtSize.Medium]: 'dodgerBlue',
    [TShirtSize.Large]: '#B60E50',
};

const TShirtIcon: React.FC<TShirtIconProps> = ({
    size = TShirtSize.Medium,
}) => {
    return (
        <SvgIcon
            style={{
                fill: color[size],
                fontSize: fontSize[size],
            }}
        >
            <path
                d="M1.144 7.608 6.685 3.135 10.05 2.437C11.018 5.245 14.268 3.974 14.647 2.478L17.972 3.135 22.856 7.649 20.024 10.605 16.946 7.855 17.192 21.563 6.48 21.44C6.685 17.377 6.931 7.937 6.931 7.937L3.894 10.728 1.144 7.608Z"
            />
        </SvgIcon>
    );
};

export default TShirtIcon;