const _apiBase = "https://api.punkapi.com/v2/";

async function getBeers(currentPage, cardsPerPage) {
  const url = `beers?page=${currentPage}&per_page=${cardsPerPage}`;
  const res = await fetch(_apiBase + url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  const beersJSON = await res.json();
  const beers = beersJSON.map(_transformBeers);
  return beers;
}

function _transformBeers(beer) {
  return {
    img: beer.image_url,
    name: beer.name,
    tagline: beer.tagline,
    abv: beer.abv,
    brewed: beer.first_brewed,
    description: beer.description
  };
}

export default getBeers;