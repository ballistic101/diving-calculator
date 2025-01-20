import { SliderThumb } from '@mui/material/Slider';

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

export default BasicThumbComponent;