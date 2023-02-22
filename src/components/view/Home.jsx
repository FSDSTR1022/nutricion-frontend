import ImgMediaCard from '../ImgMediaCard';

const nutricionista = {
	title: 'Nutricionistas',
	image: 'https://www.unir.net/wp-content/uploads/2017/06/NOTEC.jpg',
	description: [
		'Consulte el más completo listado de alimentos y sus propiedades nutricionales.',
		'Elabores dietas personalizadas para sus pacientes.Realice el seguimiento y control nutricional de los pacientes.',
		'Visualice los planes de entrenamiento de cada persona para poder ajustar la dieta a cada necesidad.Comuníquese de manera fácil y ágil con los pacientes.',
	],
	buttonText: 'Registrarse como Nutricionista',
	buttonUrl: 'register',
};

const entrenadores = {
	title: 'Entrenadores físicos',
	image:
		'https://www.boomfit.com/img/leoblog/b/1/33/lg-b-artigo%20pts%20-%20website%20v2.jpg',
	description: [
		'Consulte el más completo listado de ejercicios según parte del cuerpo, intensidad, elementos entre otras muchas otras maneras de buscar.',
		'Elabore planes de entrenamiento personalizados para cada persona.',
		'Consulte las dietas y planes nutricionales de cada persona a fin de elaborar el plan de ejercicios.',
		'Realice la comunicación con cada paciente de manera rápida, ágil y segura.',
	],
	buttonText: 'Registrarse como Entrenador',
	buttonUrl: 'register',
};

const pacientes = {
	title: 'Pacientes',
	image: 'https://www.maximuscle.com/Images/Article/large/Circuit-Training.jpg',
	description: [
		'Reciba los planes nutricionales y deportivos de los profesionales.',
		'Vea el listado de recetas y entrenamientos de cada día.',
	],
	buttonText: 'Soy paciente',
	buttonUrl: 'login',
};

const Home = () => (
	<section>
		<ImgMediaCard
			title={nutricionista.title}
			image={nutricionista.image}
			description={nutricionista.description}
			buttonText={nutricionista.buttonText}
			buttonUrl={nutricionista.buttonUrl}
		/>
		<ImgMediaCard
			title={entrenadores.title}
			image={entrenadores.image}
			description={entrenadores.description}
			buttonText={entrenadores.buttonText}
			buttonUrl={entrenadores.buttonUrl}
		/>
		<ImgMediaCard
			title={pacientes.title}
			image={pacientes.image}
			description={pacientes.description}
			buttonText={pacientes.buttonText}
			buttonUrl={pacientes.buttonUrl}
		/>
	</section>
);

export default Home;
