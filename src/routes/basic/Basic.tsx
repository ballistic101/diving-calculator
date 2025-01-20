import './Basic.css';
import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function Basic() {

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

    const boxDiveScoreStyle = {
        display: "grid",
        gridTemplateColumns: 'repeat(2, 1fr)',
        m: 2,
        border: 1,
        borderRadius: 2,
        width: "80%"
    } as const;

    function Item(props: BoxProps) {
        const { sx, ...other } = props;
        return (
          <Box
            sx={[
              (theme) => ({
                bgcolor: '#fff',
                color: 'grey.800',
                border: '1px solid',
                borderColor: 'grey.300',
                p: 1,
                m: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...theme.applyStyles('dark', {
                  bgcolor: '#101010',
                  color: 'grey.300',
                  borderColor: 'grey.800',
                }),
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
          />
        );   
    }

    function valuetext(value: number) {
        return `${value}`;
    }

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
        <>
        <div>
            Welcome to the basic version of the app. This is a quick
            calculator that does not depend on a team being defined.
        </div>
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

        <Box sx={boxDiveScoreStyle}>
            <Item>
                <Typography id="dive-score-1" gutterBottom>
                    Dive Score 1
                </Typography>
            </Item>
            <Item>
                <Slider id="dive-score-1"
                    aria-label="Dive Score 1"
                    min={0}
                    max={10}
                    step={0.5}
                    defaultValue={0}
                    valueLabelDisplay="on"
                    slots={{ thumb: BasicThumbComponent }}
                />
            </Item>

            <Item>
                <Typography id="dive-score-2" gutterBottom>
                    Dive Score 2
                </Typography>
            </Item>
            <Item>
                <Slider id="dive-score-2"
                    aria-label="Dive Score 2"
                    min={0}
                    max={10}
                    step={0.5}
                    defaultValue={0}
                    valueLabelDisplay="on"
                    slots={{ thumb: BasicThumbComponent }}
                />
            </Item>

            <Item>
                <Typography id="dive-score-3" gutterBottom>
                    Dive Score 3
                </Typography>
            </Item>
            <Item>
                <Slider id="dive-score-3"
                    aria-label="Dive Score 3"
                    min={0}
                    max={10}
                    step={0.5}
                    defaultValue={0}
                    valueLabelDisplay="on"
                    slots={{ thumb: BasicThumbComponent }}
                />
            </Item>
        </Box>
        </>
    );
}

export default Basic;