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
        m: 2,
        border: 1,
        borderRadius: 2,
        boxShadow: 1,
        width: "80%",
        pl: 2,
        pr: 2,
        pt: 1
    } as const;

    return (
        <Box sx={boxDiveDifficultyStyle}>
            <Typography id="dive-difficulty" gutterBottom>
                Dive Difficulty
            </Typography>
            <Slider
                aria-label="Dive Difficulty"
                min={1.0}
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