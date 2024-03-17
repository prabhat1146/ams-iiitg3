
import FingerprintJS from '@fingerprintjs/fingerprintjs';


// const generateDeviceFingerprint = async () => {
//   const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
//     .then(FingerprintJS => FingerprintJS.load())

//   // Get the visitor identifier when you need it.
//   fpPromise
//     .then(fp => fp.get())
//     .then(result => {
//       // This is the visitor identifier:
//       const visitorId = result.visitorId
//       console.log('deviceid',visitorId)
//       // alert(visitorId)

//       return visitorId;
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
// };

// import FingerprintJS from 'https://openfpcdn.io/fingerprintjs/v4';

const generateDeviceFingerprint = async () => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    // console.log('Device ID:', visitorId);
    return visitorId;
  } catch (error) {
    console.error('Error generating device fingerprint:', error);
    throw error; // Re-throw the error if needed
  }
};

// export default generateDeviceFingerprint;


function isMobileDevice() {
  const userAgent = navigator.userAgent;
  const mobileKeywords = ['Android', 'iPhone', 'iPad', 'Windows Phone'];

  // Check if the user agent contains any mobile keywords
  if (mobileKeywords.some(keyword => userAgent.includes(keyword))) {
    return true;
  }

  // Check screen size
  const screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // You can adjust the threshold based on your needs
  const mobileScreenThreshold = 500; // Example threshold for considering devices as mobile

  return screenSize < mobileScreenThreshold;
}

// Example usage

if (isMobileDevice()) {
  // console.log('This is a mobile device.');
} else {
  // console.log('This is not a mobile device (laptop or desktop).');
}



const YourComponent = () => {
  

  return (
    <div></div>
  );
};

export default YourComponent;
export {generateDeviceFingerprint,isMobileDevice}
