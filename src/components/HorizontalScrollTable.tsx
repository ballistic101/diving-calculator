import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useRef, useState } from 'react';
import './HorizontalScrollTable.css';

interface HorizontalScrollTableProps {
    ariaLabel: string;
    className: string;
    children: React.ReactNode;
}

function HorizontalScrollTable({ ariaLabel, className, children }: HorizontalScrollTableProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollHint = () => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) {
            return;
        }

        setCanScrollRight(
            scrollElement.scrollWidth > scrollElement.clientWidth + 1
            && scrollElement.scrollLeft + scrollElement.clientWidth < scrollElement.scrollWidth - 1,
        );
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) {
            return;
        }

        updateScrollHint();
        const resizeObserver = new ResizeObserver(updateScrollHint);
        resizeObserver.observe(scrollElement);
        if (scrollElement.firstElementChild) {
            resizeObserver.observe(scrollElement.firstElementChild);
        }

        return () => resizeObserver.disconnect();
    }, [children]);

    return (
        <div className="horizontal-scroll-table">
            <div
                aria-label={`${ariaLabel}. Scroll horizontally to see all columns.`}
                className={className}
                onScroll={updateScrollHint}
                ref={scrollRef}
                role="region"
                tabIndex={0}
            >
                {children}
            </div>
            {canScrollRight && (
                <span aria-hidden="true" className="horizontal-scroll-table__hint">
                    <KeyboardArrowRight />
                </span>
            )}
        </div>
    );
}

export default HorizontalScrollTable;
