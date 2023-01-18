import { useEffect, useState } from 'react';

import { getDisciplines } from '../../services/disciplinesServices';

import styles from './Disciplines.module.css';

const Discipline = () => {
	const [disciplines, setDisciplines] = useState([]);

	useEffect(function () {
		getDisciplines().then(data => setDisciplines(data));
	}, []);

	const tblColumns = [
		{
			name: 'discipline',
			class: 'col1',
		},
		{
			name: 'Actions',
			class: 'col12',
		},
	];

	return (
		<>
			<table>
				<tbody className={styles.tbluser}>
					<tr key={'row1'}>
						{tblColumns.map(colums => {
							return (
								<td
									key={`${colums.class}`}
									className={styles[`${colums.class}`]}
								>
									{colums.name}
								</td>
							);
						})}
					</tr>
					{disciplines.map(element => {
						return (
							<tr key={`${element.dni}`}>
								<td className={styles.col1}>{element.name}</td>
								<td className={styles.col12}>Buttons</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Discipline;
