import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Rec from '@/public/svg/rec1.svg';

export default function Home() {
	return (
		<>
			<main className="min-h-screen">
				<header className="flex justify-around items-center flex-wrap gap-11 lg:gap-2">
					<div className="text-3xl font-bold">
						<h1 className="text-balance text-congress-blue-50 ">
							Grabar pantalla
						</h1>
						<p className="uppercase text-congress-blue-400 text-5xl mb-5">
							fácil y rápido.
						</p>
						<Link
							href={'/recorder'}
							className="mx-auto  text-center text-lg bg-congress-blue-600 p-2 rounded-md hover:bg-congress-blue-700 focus:bg-congress-blue-800 focus:text-congress-blue-100"
						>
							Empezar a grabar
						</Link>
					</div>
					<div className="flex justify-center items-center h-96 w-96">
						<Image src={Rec} alt="image" priority />
					</div>
				</header>
				<section className="flex flex-wrap justify-center  gap-4 mt-2">
					<article className="w-72 bg-congress-blue-950 p-5 rounded-md border border-transparent hover:border-congress-blue-800 transition-all ">
						<h2 className="text-xl  font-bold">¿Es seguro?</h2>
						<p className="text-congress-blue-300">
							Si, la web es segura, es de código abierto, puedes encontrar más informacion en mi <a
								href="https://github.com/OrellanaMatias/screen-recorder"
								target="_blank"
								className="text-congress-blue-50 underline"
							>
								repositorio
							</a>{' '} 
						</p>
					</article>
					<article className="w-72 bg-congress-blue-950 p-5 rounded-md border border-transparent hover:border-congress-blue-800 transition-all ">
						<h2 className="text-xl  font-bold">¿Es totalmente gratis?</h2>
						<p className="text-congress-blue-300">Si, el uso el 100% gratuito, lo hice para grabar algo rápido sin descargar aplicaciones de terceros con anuncios y planes de pago.</p>
					</article>
					<article className="w-72 bg-congress-blue-950 p-5 rounded-md border border-transparent hover:border-congress-blue-800 transition-all ">
						<h2 className="text-xl  font-bold">¿Cómo aporto?</h2>
						<p className="text-congress-blue-300">
							Puedes apoyar este proyecto aportando en el{' '}
							<a
								href="https://github.com/OrellanaMatias/screen-recorder"
								target="_blank"
								className="text-congress-blue-50 underline"
							>
								repositorio
							</a>{' '}
							de este proyecto.
						</p>
					</article>
				</section>
			</main>
		</>
	);
}