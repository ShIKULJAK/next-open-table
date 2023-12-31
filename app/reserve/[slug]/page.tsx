import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Form from './components/Form';
import Header from './components/Header';
import Navbar from './components/Navbar';

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return restaurant;
};

export default async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <Header
        image={restaurant.main_image}
        name={restaurant.name}
        date={searchParams.date}
        partySize={searchParams.partySize}
      />
      <Form
        partySize={searchParams.partySize}
        slug={params.slug}
        date={searchParams.date}
      />
    </>
  );
}
