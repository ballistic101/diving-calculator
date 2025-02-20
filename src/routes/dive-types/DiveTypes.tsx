import './DiveTypes.css';
import { DiveTypes as AllDiveTypes } from "../../constants/DiveTypes";
import { DiveType } from "../../models/DiveType";

function DiveTypes() {

    return (
        <>
        <div className="dive-types">
            <table>
                <thead>
                    <tr>
                        <th>Dive Number</th>
                        <th>Description</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(AllDiveTypes)
                      .map(([key, diveType]: [string, DiveType]) => (
                         <tr className={`dive-type-row-${diveType.group}`}>
                            <td>{key}</td>
                            <td>{diveType.name}, {diveType.style}</td>
                            <td>{diveType.difficulty}</td>
                        </tr>
                      ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default DiveTypes;