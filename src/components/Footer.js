import React from "react";
import './Footer.css';
import {AiFillGithub} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';
import {BsLinkedin} from 'react-icons/bs';


const Footer = () => {
  return (
    <div className="final">
      <div className="last">
            <div className="free"> Feel Free to contact me</div>
            <div className="last-two">
            
            <a target="_blank"
                className="email"
                href="mailto:apalagupta769@gmail.com?
        &subject=Feedback from Simplilearn Support Team
        &body=Add what you want to suggest"
            >
                kartavyasharmajs@gmail.com
            </a>
            </div>

            <div className="my">
            <a href="https://github.com/codebuster009" target='_blank'><AiFillGithub size='1.5rem' color='white' /></a>
        
        <a href="https://twitter.com/codebuster09" target='_blank' ><BsTwitter size='1.5rem' color='white' /></a>
        <a href="https://www.linkedin.com/in/kartavya-sharma-a17035230" target='_blank' ><BsLinkedin size='1.5rem' color='white' /></a>
            </div>

      </div>
      <section>
        <div className="curve" ></div>
        </section>
      
    </div>
  );
};

export default Footer;
