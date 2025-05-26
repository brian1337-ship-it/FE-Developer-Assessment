/**
 * Main application component that sets up the routing and
 * overall layout structure for the e-commerce platform.
 
 */
import Section from "@/components/Section";
import Layout from "@/pages/Layout";
import HomeBanner from "./components/HomeBanner";
import ProductGrid from "./components/ProductGrid";

const App = (): JSX.Element => {
  return (
    <Layout>
      <Section>
        <HomeBanner />
        <ProductGrid />
      </Section>
    </Layout>
  );
};

export default App;
