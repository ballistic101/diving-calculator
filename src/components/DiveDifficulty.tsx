import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider, { SliderThumb } from '@mui/material/Slider';

function DiveDifficulty() {

    function valuetext(value: number) {
        return `${value}`;
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

    interface BasicSliderThumbComponentProps extends React.HTMLAttributes<unknown> {}

    function BasicThumbComponent(props: BasicSliderThumbComponentProps) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
            {children}
            <span className="slider-bar" />
            <span className="slider-bar" />
            <span className="slider-bar" />
            </SliderThumb>
        );
    }

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
                defaultValue={1.5}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                slots={{ thumb: BasicThumbComponent }}
            />
        </Box>
    );
}

export default DiveDifficulty;