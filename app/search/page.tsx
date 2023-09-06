import { PRICE, PrismaClient } from '@prisma/client';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import SearchSidebar from './components/SearchSidear';

const prisma = new PrismaClient();

interface SearchParamsType {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantsByCity = (searchParamsType: SearchParamsType) => {
  const where: any = {};
  if (searchParamsType.city) {
    const location = {
      name: {
        equals: searchParamsType.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParamsType.cuisine) {
    const cuisine = {
      name: {
        equals: searchParamsType.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParamsType.price) {
    const price = {
      equals: searchParamsType.price,
    };
    where.price = price;
  }

  // prisma.restaurant.findMany({
  //   where: {
  //     location: {
  //       name: {
  //         equals: 'toronto',
  //       },
  //     },
  //     cuisine: {
  //       name: {
  //         equals: 'mexican',
  //       },
  //     },
  //     price: {
  //       equals: PRICE.CHEAP,
  //     },
  //   },
  // });
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  // if (!city) return prisma.restaurant.findMany({ select });
  return prisma.restaurant.findMany({
    // where: {
    //   location: {
    //     name: {
    //       equals: city.toLowerCase(),
    //     },
    //   },
    // },
    where,
    select,
  });
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};
const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const location = await fetchLocations();
  const cuisine = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar
          locations={location}
          cuisines={cuisine}
          searchParams={searchParams}
        />

        <div className="w-5/6">
          {restaurants.length > 1 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area.</p>
          )}
        </div>
      </div>
    </>
  );
}
