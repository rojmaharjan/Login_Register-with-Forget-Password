import { Github, Twitter, Facebook } from 'lucide-react';
import { BsTiktok } from 'react-icons/bs';

const SocialIcon = () => {
  return (
    <div className="social-container mt-4 mb-2   flex gap-[8px]  ">
      <a href="#" className="border border-gray-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 hover:bg-gray-50 transition-colors " title='Facebook'>
        <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 hover:border-blue-500" />
      </a>
      <a href="#" className="border border-gray-200 rounded-full inline-flex justify-center items-center m-0 mx-1.5 h-10 w-10 hover:bg-gray-50 transition-colors" title='TikTok'>
        <BsTiktok className="w-5 h-5 text-gray-600 hover:text-black hover:border-gray-500" />
      </a>
      <a href="#" className="border border-gray-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 hover:bg-gray-50 transition-colors" title='Twitter'>
        <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 hover:border-blue-500" />
      </a>
    </div>
  );
};

export default SocialIcon;