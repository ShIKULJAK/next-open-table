import { Inter } from '@next/font/google';
import Header from './components/Header';
import Card from './components/Card';
import { Cuisine, Location, PRICE, PrismaClient, Review } from '@prisma/client';

export interface CardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  price: PRICE;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<CardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurants;
};

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const restaurants = await fetchRestaurants();
  // console.log({ restaurants });

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
