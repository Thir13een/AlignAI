import {Link} from "react-router";

export default function ResumeCard() {
    return (
        <Link to={`/resume/${resume.id}`}>Resume Card</Link>
    )
}