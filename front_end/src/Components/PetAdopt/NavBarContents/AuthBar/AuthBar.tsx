import { getAllCapsString } from '../../../../Utils/Library/library';
import { AuthBarProps } from './IAuthBarProps';
import '../NavBar/NavBar.css';

function NavBar({ styles, names, onAction }: AuthBarProps) {
    return (
        <div className={styles[0]}>
            {names.map((name, index) => (
                <div
                    key={index}
                    onClick={() => onAction(name)}
                    className={styles[1]}>
                    {getAllCapsString(name)}
                </div>
            ))}
        </div>
    );
}

export default NavBar;