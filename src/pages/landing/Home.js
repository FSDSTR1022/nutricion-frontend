/* eslint-disable no-unused-vars */
import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTAProfessional from './modules/views/ProductCTAProfetional';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import ProductCTAPatient from './modules/views/ProductCTAPatient';

function Index() {
	return (
		<>
			<AppAppBar />
			<ProductHero />
			<ProductHowItWorks />
			<ProductCategories />
			<ProductCTAProfessional />
			<ProductCTAPatient />
			<ProductSmokingHero />
			<AppFooter />
		</>
	);
}

export default withRoot(Index);
