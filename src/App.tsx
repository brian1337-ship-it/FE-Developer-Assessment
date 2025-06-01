import Section from "@/components/Section";
import Layout from "@/components/Layout";
import HomeBanner from "@/components/HomeBanner";
import HomeProducts from "@/components/HomeProducts";

const App = () => {
  return (
    <Layout>
      <Section>
        <HomeBanner />
        <HomeProducts />
      </Section>
    </Layout>
  );
};

export default App;
