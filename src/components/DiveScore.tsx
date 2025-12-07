import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
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
        gridTemplateColumns: 'minmax(40px, 100px) auto 1fr',
        alignItems: 'center',
        mt: 2,
        mb: 2,
        pl: { xs: 0.5, sm: 2 },
        pr: { xs: 0.5, sm: 2 },
        pt: 3
    } as const;

    const ArrowContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        mr: '15px'
    } as const;

    return (
        <>
        <Box sx={ItemDiveScoreStyle}>
            <Typography id={id} gutterBottom>
                {title}
            </Typography>

            <Box sx={ArrowContainerStyle} aria-hidden={false}>
                <IconButton
                    size="small"
                    aria-label={`increase ${title}`}
                    onClick={() => {
                        const next = Math.min(10, Number((value + 0.5).toFixed(2)));
                        onChange(null as unknown as Event, next);
                    }}
                    disabled={value >= 10}
                    sx={{ padding: 0.5 }}
                >
                    <span aria-hidden style={{ fontSize: 20, lineHeight: 1 }}>▲</span>
                </IconButton>

                <IconButton
                    size="small"
                    aria-label={`decrease ${title}`}
                    onClick={() => {
                        const prev = Math.max(0, Number((value - 0.5).toFixed(2)));
                        onChange(null as unknown as Event, prev);
                    }}
                    disabled={value <= 0}
                    sx={{ padding: 0.5 }}
                >
                    <span aria-hidden style={{ fontSize: 20, lineHeight: 1 }}>▼</span>
                </IconButton>
            </Box>

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