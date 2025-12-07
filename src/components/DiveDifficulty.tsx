import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
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
        gridTemplateColumns: 'auto auto 1fr',
        alignItems: 'center',
        mt: 2,
        mb: 2,
        ml: 1,
        mr: 1,
        pl: 2,
        pr: 2,
        pt: 4,
        pb: 2,
        border: 1,
        boxShadow: 2,
        borderColor: 'rgb(77, 165, 184)',
        background: 'linear-gradient(-45deg, rgb(99, 176, 193), rgb(174, 212, 221))'
    } as const;

    const ArrowContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        mr: '10px'
    } as const;

    return (
        <Box sx={boxDiveDifficultyStyle}>
            <Typography id="dive-difficulty" sx={{ alignSelf: 'center', whiteSpace: 'nowrap', mr: 1 }}>
                Dive Difficulty
            </Typography>

            <Box sx={ArrowContainerStyle} aria-hidden={false}>
                <IconButton
                    size="small"
                    aria-label={`increase dive difficulty`}
                    onClick={() => {
                        const next = Math.min(3.4, Number((value + 0.1).toFixed(2)));
                        onChange(next);
                    }}
                    disabled={value >= 3.4}
                    sx={{ padding: 0.5 }}
                >
                    <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>▲</span>
                </IconButton>

                <IconButton
                    size="small"
                    aria-label={`decrease dive difficulty`}
                    onClick={() => {
                        const prev = Math.max(1.2, Number((value - 0.1).toFixed(2)));
                        onChange(prev);
                    }}
                    disabled={value <= 1.2}
                    sx={{ padding: 0.5 }}
                >
                    <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>▼</span>
                </IconButton>
            </Box>

            <Slider
                aria-label="Dive Difficulty"
                min={1.2}
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