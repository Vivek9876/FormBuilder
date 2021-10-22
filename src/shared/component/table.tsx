import React from 'react';

interface Props extends React.DetailedHTMLProps<React.TdHTMLAttributes<any>, any>,
    React.DetailedHTMLProps<React.ThHTMLAttributes<any>, any> {
    colSpan?: number;
}

export const Table: React.FC<Props> = props => (
    <div className={`table-wrapper ${props.className ? props.className : ''}`}>
        <table cellPadding='0' cellSpacing='0'>
            {props.children}
        </table>
    </div>
);

export const TableHead: React.FC<Props> = props => (
    <thead className={props.className}>
        {props.children}
    </thead>
);

export const TableRow: React.FC<Props> = props => (
    <tr className={props.className}>
        {props.children}
    </tr>
);

export const TableHeadingCell: React.FC<Props> = props => (
    <th className={props.className} onClick={props.onClick} style={props.style}>
        {props.children}
    </th>
);

export const TableBody: React.FC<Props> = props => (
    <tbody className={props.className}>
        {props.children}
    </tbody>
);

export const TableCell: React.FC<Props> = props => (
    <td className={`text--center ${props.className ? props.className : ''}`} colSpan={props.colSpan} style={props.style}>
        {props.children}
    </td>
);

export const TableCellNotCentered: React.FC<Props> = props => (
    <td className={`${props.className ? props.className : ''}`} colSpan={props.colSpan} style={props.style}>
        {props.children}
    </td>
);
export const TableLeftAlignCell: React.FC<Props> = props => (
    <td className={`${props.className ? props.className : ''}`} colSpan={props.colSpan} style={props.style}>
        {props.children}
    </td>
);