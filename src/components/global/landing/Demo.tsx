import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { PlayCircle } from "lucide-react";
import "swiper/swiper-bundle.css";

interface Video {
	url: string;
	title: string;
	description: string;
}

interface DemoProps {
	videos: Video[];
}

function Demo({ videos = [] }: DemoProps) {
	const extractVideoId = (url: string): string | null => {
		try {
			const regex =
				/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
			const match = url.match(regex);
			return match ? match[1] : null;
		} catch {
			return null;
		}
	};

	return (
		<section className="py-20 bg-white" id="demo">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
						See AIWebBuilder in Action
					</h2>
					<p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
						Watch how easy it is to create stunning websites with our AI-powered
						platform.
					</p>
				</div>

				{videos.length === 0 ? (
					<div className="text-center text-gray-600">
						No videos available to display.
					</div>
				) : (
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						breakpoints={{
							640: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 30,
							},
						}}
						pagination={{ clickable: true }}
						autoplay={{ delay: 5000, disableOnInteraction: false }}
						className="pb-12"
					>
						{videos.map((video, index) => {
							const videoId = extractVideoId(video.url);
							if (!videoId) {
								console.warn(`Invalid YouTube URL: ${video.url}`);
								return null;
							}

							return (
								<SwiperSlide key={`${videoId}-${index}`}>
									<div className="group relative cursor-pointer">
										<div className="relative aspect-video rounded-lg overflow-hidden">
											<img
												src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
												alt={video.title}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
												<PlayCircle
													className="text-white w-12 h-12 opacity-75 group-hover:opacity-100 transition-opacity duration-300"
													aria-hidden="true"
												/>
											</div>
										</div>
										<h3 className="mt-4 text-lg font-semibold text-gray-900">
											{video.title}
										</h3>
										<p className="mt-1 text-sm text-gray-600">
											{video.description}
										</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}
			</div>
		</section>
	);
}

export default Demo;
