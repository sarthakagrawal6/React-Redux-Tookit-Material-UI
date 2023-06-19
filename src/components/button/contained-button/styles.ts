const styles = {
    btn: {
        background: `linear-gradient(30.99deg,#4527A0 0%, #673AB7 100%)`,
        font: 'normal normal 500 16px/18px Roboto',
        padding: '12px',
        '&.MuiButtonBase-root': {
            '&:disabled': {
                background: '#F3F3F3',
                color: 'rgba(24, 27, 32, 0.87) !important',
                backdropFilter: 'blur(20px)',
            },
        },
    },
};
export default styles;
