import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import BasicThumbComponent from './BasicThumbComponent';

interface Props {
    title: string;
    id: string;
    value: number;
    onChange: (event: Event, newValue: number | number[]) => void;
}

function DiveScore({title, id, value, onChange}: Props) {

    function valuetext(value: number) {
        return `${value}`;
    }

    const ItemDiveScoreStyle = {
        display: "grid",
        gridTemplateColumns: '1fr 2fr',
        m: 2,
        pl: 2,
        pr: 2,
        pt: 3
    } as const;

    return (
        <>
        <Box sx={ItemDiveScoreStyle}>
            <Typography id={id} gutterBottom>
                {title}
            </Typography>
            <Slider id={id}
                aria-label={title}
                min={0}
                max={10}
                step={0.5}
                value={value}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                slots={{ thumb: BasicThumbComponent }}
                onChange={onChange}
            />

        </Box>
        </>
    );
}

export default DiveScore;