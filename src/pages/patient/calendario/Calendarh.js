import React from 'react';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { useTheme } from '@mui/material/styles';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';

import { Container } from '@mui/material';
import PopRutina from './PopRutina';
import NewRutina from './NewRutina';

const rutineUrl = 'http://localhost:3000/Rutines?id=';

const Calendarh = () => {
	const theme = useTheme();

	const [rutinasList, setRutinasList] = useState([]);
	const [rutina, setRutina] = useState({});
	const [openEvent, setOpenEvent] = useState(false);
	const [openNewRutina, setOpenNewRutina] = useState(false);
	const [dateNewRutina, setDateNewRutina] = useState(new Date());

	useEffect(() => {
		getMeassures();
	}, []);

	const getMeassures = () => {
		fetch('http://localhost:3000/rutines/')
			.then(res => res.json())
			.then(data => {
				setRutinasList(data);
			})
			.catch(err => console.log('error', err));
	};
	const events = [];
	rutinasList.map(ob =>
		events.push({
			id: ob._id,
			title: ob.name,
			start: ob.day,
			allDay: true,
			editable: true,
		})
	);

	const handleEventClick = id => {
		const rutina = rutinasList.filter(e => e._id === id).pop();
		setRutina(rutina);
		setOpenEvent(true);
	};

	const handleEventClose = () => {
		setOpenEvent(false);
		setRutina({});
	};

	const handleDateClick = date => {
		setDateNewRutina(date);
		setOpenNewRutina(true);
	};

	const handleNewRutinaClose = () => {
		setOpenNewRutina(false);
	};

	function putDropEvent(id, date) {
		return fetch(`${rutineUrl}${id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ day: date }),
		})
			.then(res => res => res.json())
			.then(getMeassures())

			.catch(error => console.log('Error:', error));
	}

	return (
		<Container>
			<FullCalendar
				plugins={[dayGridPlugin, interaction, timeGridPlugin, listPlugin]}
				headerToolbar={{
					start: 'today',
					center: 'title',
					end: 'prev,next',
				}}
				height={'85vh'}
				initialView='dayGridMonth'
				editable='true'
				events={events}
				eventClick={info => handleEventClick(info.event.id)}
				dateClick={info => handleDateClick(info.dateStr)}
				eventDrop={info => putDropEvent(info.event.id, info.event.start)}
			/>
			<PopRutina
				handleEventClose={handleEventClose}
				openEvent={openEvent}
				rutina={rutina}
			/>
			<NewRutina
				handleNewRutinaClose={handleNewRutinaClose}
				openNewRutina={openNewRutina}
				dateNewRutina={dateNewRutina}
			/>
		</Container>
	);
};

export default Calendarh;
