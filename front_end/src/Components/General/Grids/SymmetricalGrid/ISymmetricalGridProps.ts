export interface GridProps {
    numOfColumns: number,
    styles?: string,
    onAction?: Function;
    children: JSX.Element | JSX.Element[],
}