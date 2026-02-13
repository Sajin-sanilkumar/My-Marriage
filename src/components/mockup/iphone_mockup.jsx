import { PhoneMockup } from 'phone-mockup-react';
import 'phone-mockup-react/dist/styles.css';

export default function IphoneMockup({source}) {
  return (
    <PhoneMockup
      model="pixel"
      orientation="portrait"
      withShadow
    >
      <img className='h-[470px]   max-lg:h-[360px] ' src={source} alt='mockup-img'/>
    </PhoneMockup>
  );
}