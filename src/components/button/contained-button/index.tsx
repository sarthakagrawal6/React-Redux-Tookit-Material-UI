import { Button, ButtonProps } from '@mui/material';
import styles from './styles';

interface Props {
    title: string;
    externalStyles?: object;
    primary?: boolean;
}

const ContainedButton = ({ title, externalStyles, ...otherProps }: Props & ButtonProps) => {
    return (
        <Button variant='contained' sx={{ ...styles.btn, ...externalStyles }} {...otherProps}>
            {title}
        </Button>
    );
};

export default ContainedButton;
