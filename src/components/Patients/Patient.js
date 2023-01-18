import { useEffect, useState } from 'react';

import { getPatients } from '../../services/patientsServices';

import styles from './Patients.module.css';

const Patient = () => {
	const [patients, setPatients] = useState([]);

	useEffect(function () {
		getPatients().then(data => setPatients(data));
	}, []);

	const tblColumns = [
		{
			name: 'dni',
			class: 'col1',
		},
		{
			name: 'Patient',
			class: 'col2',
		},
		{
			name: 'Admission Date',
			class: 'col3',
		},
		{
			name: 'Dropout Date',
			class: 'col4',
		},
		{
			name: 'Discipline',
			class: 'col5',
		},
		{
			name: 'Email',
			class: 'col6',
		},
		{
			name: 'Phone',
			class: 'col7',
		},
		{
			name: 'User',
			class: 'col8',
		},
		{
			name: 'Password',
			class: 'col9',
		},
		{
			name: 'Active',
			class: 'col10',
		},
		{
			name: 'Image',
			class: 'col11',
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
					{patients.map(element => {
						let active = '';
						element.dropoutDate === null ? (active = 'Si') : (active = 'No');
						let dropoutDate = '';
						element.dropoutDate !== null
							? (dropoutDate = new Date(
									element.dropoutDate
							  ).toLocaleDateString())
							: (dropoutDate = ' ');
						return (
							<tr key={`${element.dni}`}>
								<td className={styles.col1}>{element.dni}</td>
								<td className={styles.col2}>{element.name}</td>
								<td className={styles.col3}>
									{new Date(element.admissionDate).toLocaleDateString()}
								</td>
								<td className={styles.col4}>{dropoutDate}</td>
								<td className={styles.col5}>
									{element.discipline.map(element => {
										return <>{element.name}</>;
									})}
								</td>
								<td className={styles.col6}>{element.email}</td>
								<td className={styles.col7}>{element.phone}</td>
								<td className={styles.col8}>{element.user}</td>
								<td className={styles.col9}>{element.password}</td>
								<td className={styles.col10}>{active}</td>
								<td className={styles.col11}>{element.imgUrl}</td>
								<td className={styles.col12}>Buttons</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Patient;
