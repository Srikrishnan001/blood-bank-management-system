import React from 'react';
import BackgroundVideo from './BackgroundVideo';
import '../Css/About.css';
 
const About = () => {
  return (
    <div className='about'>
      {/* <BackgroundVideo/> */}
       <br/><br/>
      <h2 className='h2x'>This application is developed to connect donors and people who need blood </h2>
      <h2 className='h2x'>Benefits of Donating Blood</h2>
      <p className='pp'>Donating blood is beneficial in many ways. It helps save lives, improves cardiovascular health,<br/> and can even enhance mental well-being. Regularly donating blood helps makes in particular to<br/> reduce the amount of iron in the blood. This can reduce the chance of heart attack by 88%.
      <br/>When you donate blood, you give up a pint of fluid that represents about 10 percent<br></br> of your total blood volume. About one-third of that volume is red blood cells and the rest is mostly water.<br/><br/><br/><br/><br/></p>
    </div>
  );
};
 
export default About;