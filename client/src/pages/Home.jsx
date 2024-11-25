import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="container mx-auto p-6 flex flex-col gap-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-slate-700 text-4xl lg:text-6xl font-bold">
          Find your next <span className="text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <p className="text-gray-500 text-sm lg:text-base">
          SAnkar Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </p>
        <Link
          to={'/search'}
          className="text-blue-800 font-bold text-sm hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation className="w-full h-[500px] rounded-lg shadow-lg">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  backgroundImage: `url(${listing.imageUrls[0]})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                className="w-full h-full rounded-lg"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing Results */}
      <div className="space-y-16">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent Offers
              </h2>
              <Link
                className="text-blue-800 text-sm hover:underline"
                to={'/search?offer=true'}
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-slate-700">
                Places for Rent
              </h2>
              <Link
                className="text-blue-800 text-sm hover:underline"
                to={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-slate-700">
                Places for Sale
              </h2>
              <Link
                className="text-blue-800 text-sm hover:underline"
                to={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
