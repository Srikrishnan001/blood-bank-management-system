import React from 'react';
import '../Css/Home.css';
 
const Home = () => {
  const images = [
    'one.jpg',
    'two.jpg',
    'three.jpg',
    'four.png',
    'five.jpg',
    'six.jpg',
    'seven.jpg',
  ];
 
  const [currentImage, setCurrentImage] = React.useState(0);
 
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // 4 seconds interval
    return () => clearInterval(interval);
  }, [images.length]);
 
  return (
    <div>
       <marquee behavior="scroll" direction="left" scrollamount="8"> Regularly donating blood helps makes in particular to reduce the amount of iron in the blood. This can reduce the chance of heart attack by 88%.
      When you donate blood, you give up a pint of fluid that represents about 10 percent of your total blood volume. About one-third of that volume is red blood cells and the rest is mostly water.</marquee>
    <div className="home-container">
     
      <div className="text-container">
     
      <br/><br/>
     
        <h1>Welcome to Life Source BloodBank Ltd</h1>
        <p>If you are a blood donor, you are a hero to someone, somewhere, who received your gracious gift of life.<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>
        {/* <button >Get Started</button> */}
      </div>
      <div className="image-container">
        <img id='animatedImage'
          src={process.env.PUBLIC_URL + '/Images/' + images[currentImage]}
          alt="Blood Donation"
          className="rotating-image"
        /><br/><br/><br/>
      </div>
      <br/><br/>
    </div>
    </div>
  );
};
 
export default Home;