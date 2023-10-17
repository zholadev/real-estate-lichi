export const customSelectDefaultStyles = (type) => {
    return {
        control: (styles, {data, isDisabled, isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: '#ffffff',
            border: type === 'secondary' ? 'none' : '1px solid rgba(22, 24, 29, 0.6)',
            borderBottom: '1px solid rgba(22, 24, 29, 0.6)',
            borderRadius: 2,
            height: type === 'secondary' ? '42px' : '66px',
            paddingRight: type === 'secondary' ? 'none' : '15px !important',
            paddingLeft: type === 'secondary' ? 'none' : '15px !important',
            outline: 'none !important',
            color: 'rgba(22, 24, 29, 0.6)',
            width: "100%",
            boxShadow: 'none !important',
            '@media screen and (max-width: 768px)': {
                marginBottom: '25px'
            },
            '&hover': {
                borderColor: 'none !important',
                boxShadow: 'none !important'
            }
        }),
        option: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                backgroundColor: isSelected ? '#000' : '#fff',
                color: isSelected ? '#fff' : '#000',
                zIndex: 10010,
                '&:hover': {
                    backgroundColor: '#C1C2C2',
                    transition: 'all .2s ease-in-out',
                    color: '#000'
                }
            }
        },
        menu: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                backgroundColor: '#fff',
                zIndex: 10010,
            }
        },
        placeholder: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                color: '#717577',
            }
        },
        valueContainer: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                paddingLeft: 0,
                color: '#000'
            }
        },
        singleValue: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                marginLeft: 0,
                color: '#000'
            }
        },
    }
}
