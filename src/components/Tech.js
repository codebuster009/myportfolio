import React from 'react'
import './Tech.css'
import { SiTailwindcss, SiExpress, SiPostgresql, SiMongodb, SiJavascript, SiDocker, SiRedis, SiAmazonaws } from 'react-icons/si';
import { BsGit } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { AiFillHtml5 } from 'react-icons/ai';
import { DiCss3, DiNodejsSmall } from 'react-icons/di';
import { MdWifiTethering } from 'react-icons/md';

const Tech = () => {
  return (
    <div className='techno' id='tech'>
      <h1>Technologies</h1>

      {/* First Row of Icons */}
      <div className='cards-1'>
        <div className='mini'>
          <div className='carde'>
            <FaReact size='3.75rem' color='white' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <SiJavascript size='3.75rem' color='white' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <AiFillHtml5 size='3.75rem' color='white' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <DiCss3 size='3.75rem' color='white' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <DiNodejsSmall size='3.75rem' color='white' className='react-icon' />
          </div>
        </div>
      </div>

      {/* Second Row of Icons */}
      <div className='cards-2'>
        <div className='mini'>
          <div className='carde'>
            <SiTailwindcss size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <SiExpress size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <BsGit size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <SiPostgresql size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <SiMongodb size='3.75rem' className='react-icon' />
          </div>
        </div>
      </div>

      {/* Third Row of Icons (New Tech) */}
      <div className='cards-2'>
        <div className='mini'>
          <div className='carde'>
            <SiDocker size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <SiRedis size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <MdWifiTethering size='3.75rem' className='react-icon' />
          </div>
        </div>
        <div className='mini'>
          <div className='carde'>
            <SiAmazonaws size='3.75rem' className='react-icon' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tech;
