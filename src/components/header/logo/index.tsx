import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import Logo from 'assets/images/logo.svg';

const textLogoStyles = {
    color: '#000000',
    fontSize: '32px',
    fontWright: 'bold',
    marginLeft: '12px',
};

const LogoSection = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box>
                <img src={Logo} alt='plandid' style={{ height: '40px', width: '40px' }} />
            </Box>
            <Typography sx={textLogoStyles} variant='h2'>
                {'PLANDID'}
            </Typography>
        </Box>
    );
};

export default LogoSection;
