import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import BasicThumbComponent from './BasicThumbComponent';

interface Props {
    value: number;
    onChange: (difficulty: number) => void;
}

function DiveDifficulty({value, onChange}: Props) {

    function valuetext(value: number) {
        return `${value}`;
    }

    const handleChange = (_event: Event, newValue: number | number[]) => {
        let value = (Array.isArray(newValue)) ? newValue[0] : newValue;
        onChange(value);
    }

    const boxDiveDifficultyStyle = {
        display: "grid",
        gridTemplateColumns: '1fr 2fr',
        m: 2,
        pl: 2,
        pr: 2,
        pt: 5,
        pb: 2,
        bgcolor: '#acf9fb',
        border: 1,
        boxShadow: 1,
        borderColor: 'rgb(77, 165, 184)'
    } as const;

    return (
        <Box sx={boxDiveDifficultyStyle}>
            <Typography id="dive-difficulty" gutterBottom>
                Dive Difficulty
            </Typography>
            <Slider
                aria-label="Dive Difficulty"
                min={1.4}
                max={3.4}
                step={0.1}
                value={value}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                slots={{ thumb: BasicThumbComponent }}
                onChange={handleChange}
            />
        </Box>
    );
}

export default DiveDifficulty;