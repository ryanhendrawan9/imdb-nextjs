import Image from "next/image";

export default async function MoviePage({ params }) {
  const movieId = params.id;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );

  if (!res.ok) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-bold text-red-500">Movie not found.</h1>
      </div>
    );
  }

  const movie = await res.json();

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        {movie.backdrop_path || movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path || movie.poster_path
            }`}
            width={500}
            height={300}
            className="rounded-lg"
            style={{ maxWidth: "100%", height: "100%" }}
            alt={movie.title || "Movie Image"}
            loading="lazy"
          />
        ) : (
          <div className="w-[500px] h-[300px] flex items-center justify-center bg-gray-200 rounded-lg">
            <p className="text-gray-600">No Image Available</p>
          </div>
        )}

        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name || "Unknown Title"}
          </h2>
          <p className="text-lg mb-3">
            {movie.overview || "No overview available."}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date || "Unknown"}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count !== undefined ? movie.vote_count : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
