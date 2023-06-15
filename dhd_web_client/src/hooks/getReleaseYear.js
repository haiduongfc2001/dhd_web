const getReleaseYear = (releaseDate) => {
    const releaseYear = new Date(releaseDate);
    return releaseYear.getFullYear();
}

export default getReleaseYear;
