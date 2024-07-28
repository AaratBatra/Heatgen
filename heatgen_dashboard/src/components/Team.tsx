import React from "react";
import Image from "next/image";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";

type ProfileType = {
	imgUrl: string;
	name: string;
	description: string;
	linkedin: string;
	instagram: string;
	github: string;
};
const TeamContent: ProfileType[] = [
	{
		imgUrl: "https://media.licdn.com/dms/image/D5603AQHnIXQRdGJA6Q/profile-displayphoto-shrink_800_800/0/1690437508127?e=1727308800&v=beta&t=--nRyf1Z0vruQ9e2nLmf7-yGlJQVpSCBGyJeTzLTy8w",
		name: "Aarat Batra",
		description: "Full Stack & Lead Dev",
		linkedin: "https://www.linkedin.com/in/aaratbatra/",
		instagram: "https://www.instagram.com/aarat_batra/",
		github: "https://github.com/AaratBatra",
	},
	{
		imgUrl: "https://media.licdn.com/dms/image/D5603AQEsonmS0mfnig/profile-displayphoto-shrink_800_800/0/1711868632908?e=1727308800&v=beta&t=DiIQ2NhQ3O1Y2YEwGIRt0Kk0xCGDLtoP5IY767WhIp4",
		name: "Aditya Choudhary",
		description: "AI & Python Dev",
		linkedin: "https://www.linkedin.com/in/aditya-choudhary-6328591a0/",
		instagram:
			"https://www.instagram.com/adityachoudhary_25?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
		github: "https://github.com/adityac2542",
	},
	{
		imgUrl: "https://media.licdn.com/dms/image/D4D03AQHnlO5BgAM0Tg/profile-displayphoto-shrink_800_800/0/1694959219502?e=1727308800&v=beta&t=bpU2Xb-9kD2tpQyCLiNmppkCOHJB157N3E8bUp_JZsw",
		name: "Agrim Kulshreshtha",
		description: "Python Dev",
		linkedin: "https://www.linkedin.com/in/agrim-kulshreshtha/",
		instagram: "https://www.instagram.com/agrimk25/",
		github: "https://github.com/FINESTMOSAIC",
	},
];
export const Team = () => {
	return (
		<Card className="bg-gray-50/10 backdrop-blur-sm mt-4 w-full">
			<CardHeader className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
				<CardTitle className="mb-4 text-4xl tracking-tight font-extrabold underline">
					Our Team
				</CardTitle>
				<CardDescription className="font-light sm:text-xl text-gray-50">
					We have put hours of dedication into this project. We can
					even sell our souls to the devil for quality.
				</CardDescription>
				<CardContent className="grid mx-auto gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 pt-4">
					{TeamContent.map(
						({
							imgUrl,
							name,
							description,
							linkedin,
							instagram,
							github,
						}) => {
							return (
								<Profile
									imgUrl={imgUrl}
									name={name}
									description={description}
									linkedin={linkedin}
									instagram={instagram}
									github={github}
								/>
							);
						}
					)}
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export const Profile = ({
	imgUrl,
	name,
	description,
	linkedin,
	instagram,
	github,
}: ProfileType) => {
	return (
		<div className="text-center text-gray-500 dark:text-gray-400 bg-rose-900/90 p-4 backdrop:blur-lg border shadow-lg border-border rounded-lg">
			<Image
				className="mx-auto mb-4 w-36 h-36 rounded-full"
				src={imgUrl}
				alt={`${name} avatar`}
				width={1000}
				height={1000}
			/>
			<h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				<a href="#">{name}</a>
			</h3>
			<p className="text-gray-100">{description}</p>
			<ul className="flex justify-center mt-4 space-x-4">
				<li>
					<a
						href={linkedin}
                        target="_blank"
						className="text-[#39569c] hover:text-gray-900 dark:hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="100"
							height="100"
							viewBox="0 0 48 48"
							className="w-8 h-8"
						>
							<path
								fill="#0288D1"
								d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
							></path>
							<path
								fill="#FFF"
								d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
							></path>
						</svg>
					</a>
				</li>
				<li>
					<a
						href={instagram}
                        target="_blank"
						className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="100"
							height="100"
							viewBox="0 0 48 48"
							className="w-8 h-8"
						>
							<radialGradient
								id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
								cx="19.38"
								cy="42.035"
								r="44.899"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0" stop-color="#fd5"></stop>
								<stop offset=".328" stop-color="#ff543f"></stop>
								<stop offset=".348" stop-color="#fc5245"></stop>
								<stop offset=".504" stop-color="#e64771"></stop>
								<stop offset=".643" stop-color="#d53e91"></stop>
								<stop offset=".761" stop-color="#cc39a4"></stop>
								<stop offset=".841" stop-color="#c837ab"></stop>
							</radialGradient>
							<path
								fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
								d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
							></path>
							<radialGradient
								id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
								cx="11.786"
								cy="5.54"
								r="29.813"
								gradientTransform="matrix(1 0 0 .6663 0 1.849)"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0" stop-color="#4168c9"></stop>
								<stop
									offset=".999"
									stop-color="#4168c9"
									stop-opacity="0"
								></stop>
							</radialGradient>
							<path
								fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
								d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
							></path>
							<path
								fill="#fff"
								d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
							></path>
							<circle
								cx="31.5"
								cy="16.5"
								r="1.5"
								fill="#fff"
							></circle>
							<path
								fill="#fff"
								d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
							></path>
						</svg>
					</a>
				</li>
				<li>
					<a href={github} target="_blank" className="text-[#FFF] hover:text-gray-900 dark:hover:text-white">
						<svg
							className="w-8 h-8"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</li>
			</ul>
		</div>
	);
};
