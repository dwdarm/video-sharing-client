import React from 'react';
import Layout from '../../components/Layout';
import HomeVideos from './HomeVideos';

function HomePage() {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <HomeVideos />
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
