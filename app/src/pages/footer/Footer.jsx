import React from 'react';
import { useSpring, animated } from 'react-spring';

const Footer = () => {
  const fadeInAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.footer style={fadeInAnimation} className=" pt-60  bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <hr />
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 pt-8">
        {/* Left column */}
        <div className="col-span-2 lg:flex lg:mx-8">
          <div className="mb-8 lg:mx-4 lg:mr-20">
            <h2 className="text-2xl font-bold mb-2">IIITG Attendance System</h2>
            <p><strong>Guide:</strong> Dr. Angshuman Jana</p>
            <p><strong>MailID:</strong> angshuman@iiitg.ac.in</p>
            <p><strong>Developed By:</strong> @Prabhat</p>
          </div>
          <div className="mb-8 lg:mx-4">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <p><strong>Website:</strong> www.iiitg.ac.in</p>
            <p><strong>Phone:</strong> +91-08242474000</p>
            <p><strong>Email:</strong> feedback.ug@iiitg.ac.in</p>
            <p>
              <strong>Address:</strong> Indian Institute of <br />
              Information Technology Guwahati<br />
              Bongora, Assam<br />
              Guwahati - 781015<br />
              India
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className='lg:flex-col'>

          <div>
            <h2 className="text-2xl font-bold mb-8">Social Links</h2>
          </div>
          <div className='lg:flex'>


            <div >
              <a href="https://www.facebook.com/iiitghy/"><img src="/images/facebook-logo.png" alt=""
                className='flex ml-2 w-14 h-14  mt-4'
              /></a>
            </div>
            <div >
              <a href="https://www.instagram.com/iiit.guwahati/"><img src="/images/instagram.webp" alt=""
                className='flex w-20 h-20 lg:mb-8'
              /></a>
            </div>
            <div >
              <a href="https://twitter.com/iiitghy?lang=en"><img src="/images/twitter.webp" alt=""
                className='flex w-20 h-20 rounded-full '
              /></a>
            </div>
            <div >
              <a href="https://www.iiitg.ac.in/"><img src="/images/iiitg.png" alt=""
                className='flex w-14 h-14 ml-2 rounded-full bg-white lg:mt-3'
              /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <p className="text-sm">
          &copy; 2024 IIITG-Attendance-System. All rights reserved. | Designed by prabhat.kumar21b
        </p>
        <hr />
      </div>
      <p className="text-xs mt-3 text-center">The project is under development.</p>
    </animated.footer>
  );
};

export default Footer;
