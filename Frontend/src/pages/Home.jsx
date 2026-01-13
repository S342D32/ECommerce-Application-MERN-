import  axios  from 'axios';
import  { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for specific collections
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Top Wear",
      limit: 8,
    }));
    // Fetch best seller products
    const fetchBestSellerProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };  
    fetchBestSellerProducts();

  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Sellers */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl text-center font-bold mb-8">Best Sellers</h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top wear for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error}/>
        <FeaturedCollection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Home;
