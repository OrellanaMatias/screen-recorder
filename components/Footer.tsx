import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className="flex flex-wrap flex-col mt-5  px-5 gap-2 justify-center items-center   md:flex-row md:justify-between">
			<h3>Screen recorder</h3>

			<a href="https://orellanamatias.com.ar/" target="_blank">
				Hecho por{' '}
				<span className="text-congress-blue-500 underline">Matias Orellana</span>
			</a>
		</footer>
	);
};

export default Footer;
