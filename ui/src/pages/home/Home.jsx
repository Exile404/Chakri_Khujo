import React from 'react'
import "./Home.scss"


import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/slide/Slide';
import CatCard from '../../components/catCard/CatCard';
import { cards, projects } from '../../data';
import Feature from '../../components/feature/Feature';
import ChakriBusiness from '../../components/chakriBusiness/ChakriBusiness';
import ProjectCard from '../../components/projectCard/ProjectCard';


const Home = () => {
  return (
    <div>
    <Featured />
    <TrustedBy />
    <Slide slidesToShow={4} arrowsScroll={3}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
    <Feature />
    <ChakriBusiness />
    <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  )
}

export default Home