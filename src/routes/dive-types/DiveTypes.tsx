import './DiveTypes.css';
import { DiveTypes as DiveTypesByNumber } from "../../constants/DiveTypes";
import { DiveType } from "../../constants/DiveTypes";

function DiveTypes() {

    // group by DiveGroup
    const divesByGroup = Object.entries(DiveTypesByNumber).reduce((acc, [key, diveType]) => {
        const groupKey = String(diveType.group);
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push([key, diveType] as [string, DiveType]);
        return acc;
    }, {} as Record<string, [string, DiveType][]>);

    // sort each group's items by numeric dive number then by key
    Object.values(divesByGroup).forEach(list =>
        list.sort((a, b) => {
            if (a[1].number !== b[1].number) return a[1].number - b[1].number;
            return a[0].localeCompare(b[0]);
        })
    );

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <>
        <div className="dive-types">
            <h2>Dive Types</h2>
                 {Object.entries(divesByGroup).map(([group, items]) => (
                <section key={group} className={`dive-group-section dive-group-${group.toLowerCase()}`}>
                    <h3>{capitalize(group)} Dives</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Dive Number</th>
                                <th>Description</th>
                                <th>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(([key, diveType]) => (
                                <tr key={key} className={`dive-group-row-${String(diveType.group).toLowerCase()}`}>
                                    <td>{key.toUpperCase()}</td>
                                    <td className="dive-description">{diveType.name}, {String(diveType.style)}</td>
                                    <td>{diveType.difficulty.toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ))}
        </div>
        </>
    );
}

export default DiveTypes;