import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider, { SliderThumb } from '@mui/material/Slider';

interface Props {
    title: string;
    id: string;
}

function DiveScore({title, id}: Props) {

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
        <Item>
            <Typography id={id} gutterBottom>
                {title}
            </Typography>
        </Item>
        <Item>
            <Slider id={id}
                aria-label={title}
                min={0}
                max={10}
                step={0.5}
                defaultValue={0}
                valueLabelDisplay="on"
                slots={{ thumb: BasicThumbComponent }}
            />
        </Item>
        </>
    );
}

export default DiveScore;