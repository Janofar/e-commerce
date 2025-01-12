
import FeaturedProducts from './components/FeaturedProducts';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';

const Home = () => {
  return (
    <div className="space-y-12">
      <HeroBanner />
      <FeaturedProducts />
      <Categories />
    </div>
  );
};

export default Home;